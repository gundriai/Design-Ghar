import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Banner } from './banner.entity';
import { ObjectId } from 'mongodb';
import { CloudinaryService } from '../common/cloudinary.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepo: MongoRepository<Banner>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloud(image: Express.Multer.File): Promise<string> {
    return this.cloudinary.uploadImage(image);
  }

  async create(data: Partial<Banner>) {
    const banner = this.bannerRepo.create(data);
    return this.bannerRepo.save(banner);
  }

  async findAll() {
    return this.bannerRepo.find();
  }

  async findById(id: string) {
    const banner = await this.bannerRepo.findOne({ where: { _id: new ObjectId(id) } });
    if (!banner) throw new NotFoundException('Banner not found');
    return banner;
  }

  async update(id: string, data: Partial<Banner>) {
    const banner = await this.bannerRepo.findOne({ where: { _id: new ObjectId(id) } });
    if (!banner) throw new NotFoundException('Banner not found');
    this.bannerRepo.merge(banner, data);
    return this.bannerRepo.save(banner);
  }

  async remove(id: string) {
    const result = await this.bannerRepo.delete({ id: new ObjectId(id) });
    if (!result.affected) throw new NotFoundException('Banner not found');
    return { deleted: true };
  }
}
