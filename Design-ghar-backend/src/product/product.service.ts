import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { BulkStatusDto } from './dto/bulk-status.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  // ─────────────── PUBLIC ───────────────

  async list(q: QueryProductDto): Promise<Paginated<Product>> {
    const {
      page = 1,
      limit = 20,
      sort,
      search,
      categoryId,
      tags,
      minPrice,
      maxPrice,
      isFeatured,
      isActive = 'true',
    } = q;

    const where: Record<string, any> = {};
    if (categoryId) where.categoryId = categoryId;
    if (isFeatured !== undefined) where.isFeatured = isFeatured === 'true';
    if (isActive !== undefined) where.isActive = isActive === 'true';
    if (tags?.length) where.tags = { $all: tags };
    if (minPrice || maxPrice) {
      where.finalPrice = {
        ...(minPrice ? { $gte: minPrice } : {}),
        ...(maxPrice ? { $lte: maxPrice } : {}),
      };
    }
    if (search) where.$text = { $search: search };

    const order: Record<string, 1 | -1> = {};
    if (sort) {
      sort.split(',').forEach((pair) => {
        const [field, dir = 'ASC'] = pair.split(':');
        order[field.trim()] = dir.toUpperCase() === 'DESC' ? -1 : 1;
      });
    } else {
      order.updatedAt = -1;
    }

    const [data, total] = await Promise.all([
      this.repo.find({
        where,
        order,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.repo.count({ where }),
    ]);

    return { data, page, limit, total };
  }

  async featured(p: PaginationDto): Promise<Paginated<Product>> {
    return this.list({ ...p, isFeatured: 'true' } as unknown as QueryProductDto);
  }

  async getById(id: ObjectId): Promise<Product> {
    const product = await this.repo.findOneBy({
      _id: id,
    } as any);
    if (!product || !product.isActive)
      throw new NotFoundException('Product not found');
    return product;
  }

  async getBySku(sku: string): Promise<Product> {
    const product = await this.repo.findOneBy({ sku, isActive: true });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async incrementView(id: ObjectId): Promise<void> {
    await this.repo.increment({ _id: new ObjectId(id) } as any, 'viewCount', 1);
  }

  // ─────────────── MANAGEMENT ───────────────

  async create(dto: CreateProductDto): Promise<Product> {
    await this.ensureUniqueSku(dto.sku);

    const entity = this.repo.create({
      ...dto,
      viewCount: 0,
      finalPrice: this.computeFinalPrice(
        dto.basePrice,
        dto.discountPercentage,
      ),
    });

    return this.repo.save(entity);
  }

  async replace(id: ObjectId, dto: CreateProductDto): Promise<Product> {
    await this.ensureUniqueSku(dto.sku, id);

    const existing = await this.repo.findOneBy({
      _id: new ObjectId(id),
    } as any);
    if (!existing) throw new NotFoundException('Product not found');

    const entity = this.repo.merge(existing, {
      ...dto,
      finalPrice: this.computeFinalPrice(
        dto.basePrice,
        dto.discountPercentage,
      ),
      updatedAt: new Date(),
    });

    return this.repo.save(entity);
  }

  async update(id: ObjectId, dto: UpdateProductDto): Promise<Product> {
    if (dto.sku) await this.ensureUniqueSku(dto.sku, id);

    const product = await this.repo.findOneBy({
      _id: new ObjectId(id),
    } as any);
    if (!product) throw new NotFoundException('Product not found');

    const entity = this.repo.merge(product, dto, {
      finalPrice: this.computeFinalPrice(
        dto.basePrice ?? product.basePrice,
        dto.discountPercentage ?? product.discountPercentage,
      ),
      updatedAt: new Date(),
    });

    return this.repo.save(entity);
  }

  async softDelete(id: ObjectId): Promise<Product> {
     return this.toggleActive(id, false);
  }

  async toggleActive(id: ObjectId, isActive: boolean): Promise<Product> {
    await this.existsOrThrow(id);
    return await this.repo.save(
        {
            id,
            isActive,
            updatedAt: new Date(),
        }
    );
  }

  async toggleFeature(id: ObjectId, isFeatured: boolean): Promise<Product> {
    await this.existsOrThrow(id);
    return await this.repo.save(
      {
        id,
        isFeatured,
        updatedAt: new Date(),
      }
    );
  }

  async bulkStatus(dto: BulkStatusDto): Promise<{ modified: number; products: Product[] }> {
    if (
      dto.isActive === undefined &&
      dto.isFeatured === undefined
    ) {
      throw new BadRequestException('Nothing to update');
    }
    const objectIds = dto.ids.map((i) => new ObjectId(i));
    let modified = 0;
    const updatedProducts: Product[] = [];
    for (const objectId of objectIds) {
      const product = await this.repo.findOneBy({ _id: objectId } as any);
      if (!product) continue;
      const updateProperties: any = {};
      if (dto.isActive !== undefined) updateProperties.isActive = dto.isActive;
      if (dto.isFeatured !== undefined) updateProperties.isFeatured = dto.isFeatured;
      updateProperties.updatedAt = new Date();
      this.repo.merge(product, updateProperties);
      await this.repo.save(product);
      updatedProducts.push(product);
      modified++;
    }
    return { modified, products: updatedProducts };
  }


  // ─────────────── HELPERS ───────────────

  private computeFinalPrice(base: number, discount?: number): number {
    return discount ? +(base * (1 - discount / 100)).toFixed(2) : base;
  }

  private async ensureUniqueSku(sku: string, selfId?: ObjectId) {
    const where: any = { sku };
    if (selfId) where._id = { $ne: new ObjectId(selfId) };
    const exists = await this.repo.findOneBy(where);
    if (exists) throw new BadRequestException('SKU must be unique');
  }

  private async existsOrThrow(id: ObjectId): Promise<void> {
    const product = await this.repo.findOneBy({
      _id: id,
    } as any);
    if (!product) throw new NotFoundException('Product not found');
}
}
