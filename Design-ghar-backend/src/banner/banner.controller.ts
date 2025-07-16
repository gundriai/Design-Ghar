import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateBannerDto, UpdateBannerDto } from './dto/banner.dto';

@ApiTags('Banners')
@Controller('banners')
export class BannerController {
    constructor(private readonly service: BannerService) { }

    @Get()
    @ApiOperation({ summary: 'Get all banners' })
    @ApiResponse({ status: 200, description: 'List of banners.' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get banner by id' })
    @ApiResponse({ status: 200, description: 'Banner found.' })
    findById(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Create a new banner with image upload' })
    @ApiResponse({ status: 201, description: 'Banner created.' })
    async create(@UploadedFile() image: Express.Multer.File, @Body() dto: CreateBannerDto) {
        let imageUrl = dto.imageUrl || '';
        if (image) {
            imageUrl = await this.service.uploadImageToCloud(image);
        }
        // Convert string dates to Date objects
        const startDate = dto.startDate ? new Date(dto.startDate) : new Date();
        const endDate = dto.endDate ? new Date(dto.endDate) : undefined;
        // isActive type conversion
        let isActive = true;
        if (dto.isActive !== undefined) {
            if (typeof dto.isActive === 'string') {
                if (dto.isActive === 'true') isActive = true;
                else if (dto.isActive === 'false') isActive = false;
                else isActive = true;
            } else {
                isActive = Boolean(dto.isActive);
            }
        }
        return this.service.create({
            ...dto,
            imageUrl,
            startDate,
            endDate,
            isActive
        });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Update a banner, optionally with new image' })
    @ApiResponse({ status: 200, description: 'Banner updated.' })
    async update(@Param('id') id: string, @UploadedFile() image: Express.Multer.File, @Body() dto: UpdateBannerDto) {
        const updateData: any = { ...dto };
        if (image) {
            updateData.imageUrl = await this.service.uploadImageToCloud(image);
        }
        // Convert string dates to Date objects if present
        if (dto.startDate) updateData.startDate = new Date(dto.startDate);
        if (dto.endDate) updateData.endDate = new Date(dto.endDate);
        // isActive type conversion
        if (dto.isActive !== undefined) {
            if (typeof dto.isActive === 'string') {
                if (dto.isActive === 'true') updateData.isActive = true;
                else if (dto.isActive === 'false') updateData.isActive = false;
                else updateData.isActive = true;
            } else {
                updateData.isActive = Boolean(dto.isActive);
            }
        }
        return this.service.update(id, updateData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete a banner' })
    @ApiResponse({ status: 204, description: 'Banner deleted.' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
