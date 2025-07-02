import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * Payload for PATCH /products/:id
 * – any subset of fields is allowed.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
