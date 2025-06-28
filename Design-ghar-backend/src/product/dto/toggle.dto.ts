import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Generic body for /activate and /feature routes.
 * Client sends just the flag it wants to modify.
 */
export class ToggleDto {
  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  isFeatured?: boolean;
}
