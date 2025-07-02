import {
  IsArray, ArrayNotEmpty, IsMongoId, IsBoolean, IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BulkStatusDto {
  @ApiProperty({ type: [String], description: 'Product IDs' })
  @IsArray() @ArrayNotEmpty() @IsMongoId({ each: true })
  ids!: string[];

  @ApiPropertyOptional({ description: 'Set active status' })
  @IsOptional() @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Set featured status' })
  @IsOptional() @IsBoolean()
  isFeatured?: boolean;
}
