import {
  IsOptional, IsString, IsBooleanString, IsArray,
  IsMongoId, IsNumber,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QueryProductDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by category' })
  @IsOptional() @IsMongoId()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Filter by tags', type: [String] })
  @IsOptional() @IsArray() @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Full-text search' })
  @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Sort string e.g. price:ASC' })
  @IsOptional() @IsString()
  sort?: string;

  @ApiPropertyOptional({ description: 'Minimum price' })
  @IsOptional() @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price' })
  @IsOptional() @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Featured filter (true/false)' })
  @IsOptional() @IsBooleanString()
  isFeatured?: string;

  @ApiPropertyOptional({ description: 'Active filter (true/false)' })
  @IsOptional() @IsBooleanString()
  isActive?: string;
}
