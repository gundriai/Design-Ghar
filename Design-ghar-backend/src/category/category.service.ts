import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Category } from './category.entity';
import { ObjectId } from 'mongodb';
import { CloudinaryService } from '../common/cloudinary.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: MongoRepository<Category>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloud(image: Express.Multer.File): Promise<string> {
    // Upload image to cloudinary and return the URL
    return this.cloudinary.uploadImage(image);
  }

  async create(data: Partial<Category>) {
    const category = this.categoryRepo.create(data);
    return this.categoryRepo.save(category);
  }

  async findAll() {
    return this.categoryRepo.find();
  }

  async findById(id: string) {
    const category = await this.categoryRepo.findOne({ where: { _id: new ObjectId(id) } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, data: Partial<Category>) {
    console.log('id passed to update:', id);
    const category = await this.categoryRepo.findOne({ where: { _id: new ObjectId(id) } });
    if (!category) throw new NotFoundException('Category not found');
    this.categoryRepo.merge(category, data);
    return this.categoryRepo.save(category);
  }

  async remove(id: string) {
    const result = await this.categoryRepo.delete({ id: new ObjectId(id) });
    if (!result.affected) throw new NotFoundException('Category not found');
    return { deleted: true };
  }
}
