import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './banner.entity';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { CloudinaryService } from '../common/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  controllers: [BannerController],
  providers: [BannerService, CloudinaryService],
  exports: [BannerService],
})
export class BannerModule {}
