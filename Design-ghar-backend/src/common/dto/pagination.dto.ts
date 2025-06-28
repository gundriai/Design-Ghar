import { IsInt, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Transform(({ value }) => {
    const val = Number(value);
    if (isNaN(val)) throw new Error('page must be a number');
    return val;
  })
  @Type(() => Number)
  @IsInt() @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @Transform(({ value }) => {
    const val = Number(value);
    if (isNaN(val)) throw new Error('limit must be a number');
    return val;
  })
  @Type(() => Number)
  @IsInt() @Min(1) @Max(100)
  limit?: number = 20;
}
