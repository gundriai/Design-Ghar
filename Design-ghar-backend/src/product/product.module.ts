import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CloudinaryService } from 'src/common/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, CloudinaryService],
  controllers: [ProductController],
  exports: [ProductService, CloudinaryService],
})
export class ProductModule {}
