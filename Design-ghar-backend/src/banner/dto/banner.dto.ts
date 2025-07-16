import { IsString, IsOptional, IsBoolean, IsInt, IsDateString } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  mobileImageUrl?: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsInt()
  sequence: number;

  @IsOptional()
  @IsInt()
  viewCount?: number;

  @IsOptional()
  @IsInt()
  clickCount?: number;

  @IsOptional()
  @IsString()
  redirectUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;
}

export class UpdateBannerDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  mobileImageUrl?: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsInt()
  sequence?: number;

  @IsOptional()
  @IsInt()
  viewCount?: number;

  @IsOptional()
  @IsInt()
  clickCount?: number;

  @IsOptional()
  @IsString()
  redirectUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
