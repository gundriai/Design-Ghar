import { IsString, IsOptional, IsNotEmpty, IsNumber, IsBoolean, IsArray, IsDate, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDto {
    @ApiPropertyOptional({ description: 'Product ID' })
    @IsOptional()
    @IsMongoId()
    id?: string;

    @ApiProperty({ description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'SKU (unique)' })
    @IsString()
    @IsNotEmpty()
    sku: string;

    @ApiProperty({ description: 'Product description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiPropertyOptional({ description: 'Product features' })
    @IsOptional()
    @IsString()
    features?: string;

    @ApiProperty({ description: 'Category ID' })
    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @ApiPropertyOptional({ description: 'Category name' })
    @IsOptional()
    @IsString()
    categoryName?: string;

    @ApiProperty({ description: 'Media URL' })
    @IsString()
    mediaURL: string;

    @ApiProperty({ description: 'Base price', type: Number })
    @IsNumber()
    basePrice: number;

    @ApiPropertyOptional({ description: 'Discount percentage', type: Number })
    @IsOptional()
    @IsNumber()
    discountPercentage?: number;

    @ApiProperty({ description: 'Final price', type: Number })
    @IsNumber()
    finalPrice: number;

    @ApiProperty({ description: 'Is active?' })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({ description: 'Is featured?' })
    @IsBoolean()
    isFeatured: boolean;

    @ApiPropertyOptional({ description: 'View count', type: Number })
    @IsOptional()
    @IsNumber()
    viewCount?: number;

    @ApiPropertyOptional({ description: 'Tags', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiPropertyOptional({ description: 'Created at', type: Date })
    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @ApiPropertyOptional({ description: 'Updated at', type: Date })
    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}
