import { OmitType } from '@nestjs/mapped-types';
import { ProductDto } from './product.dto';

/**
 * Payload for POST /products
 * – server will compute `finalPrice`, `viewCount`, timestamps, etc.
 */
export class CreateProductDto extends OmitType(ProductDto, [
  'id',
  'viewCount',
  'createdAt',
  'updatedAt',
] as const) {}
