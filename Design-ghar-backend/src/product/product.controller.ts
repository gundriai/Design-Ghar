import {
    Controller,
    Get,
    Patch,
    Post,
    Put,
    Delete,
    HttpCode,
    Param,
    Body,
    Query,
    UseGuards,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { ProductService } from './product.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ToggleDto } from './dto/toggle.dto';
import { BulkStatusDto } from './dto/bulk-status.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongoId.pipe';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ObjectId } from 'mongodb';
import { CloudinaryService } from '../common/cloudinary.service';


@ApiTags("Products")
@Controller({ path: 'products' })
export class ProductController {
    constructor(
        private readonly service: ProductService,
        private readonly cloudinary: CloudinaryService,
    ) { }

    @Get()
    list(@Query() q: QueryProductDto) {
        return this.service.list(q);
    }

    @Get('sku/:sku')
    getBySku(@Param('sku') sku: string) {
        return this.service.getBySku(sku);
    }

    @Get('featured')
    featured(@Query() q: PaginationDto) {
        return this.service.featured(q);
    }

    @Get(':id')
    getById(@Param('id', ParseMongoIdPipe) id: ObjectId) {
        return this.service.getById(id);
    }

    @Patch(':id/view')
    @HttpCode(204)
    incrementView(@Param('id', ParseMongoIdPipe) id: ObjectId) {
        return this.service.incrementView(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    @ApiConsumes('multipart/form-data')
    async create(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() dto: CreateProductDto
    ) {
        console.log('Uploaded files:', files);
        console.log('DTO:', dto);

        let mediaURLs: string[] = [];
        if (files && files.length) {
            dto.mediaURLs = await Promise.all(files.map(file => this.cloudinary.uploadImage(file)));
        } 
        return this.service.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Put(':id')
    replace(
        @Param('id', ParseMongoIdPipe) id: ObjectId,
        @Body() dto: CreateProductDto,
    ) {
        return this.service.replace(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Patch(':id')
    @UseInterceptors(FilesInterceptor('files'))
    @ApiConsumes('multipart/form-data')
    update(
        @Param('id', ParseMongoIdPipe) id: ObjectId,
        @Body() dto: UpdateProductDto,
    ) {
        return this.service.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id', ParseMongoIdPipe) id: ObjectId) {
        console.log('Removing product with ID:', id);
        return this.service.remove(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Patch(':id/activate')
    toggleActive(
        @Param('id', ParseMongoIdPipe) id: ObjectId,
        @Body() { isActive }: ToggleDto,
    ) {
        console.log(id, isActive);
        return this.service.toggleActive(id, isActive);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Patch(':id/feature')
    toggleFeature(
        @Param('id', ParseMongoIdPipe) id: ObjectId,
        @Body() { isFeatured }: ToggleDto,
    ) {
        return this.service.toggleFeature(id, isFeatured);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth('JWT')
    @Post('bulk-status')
    bulkStatus(@Body() dto: BulkStatusDto) {
        return this.service.bulkStatus(dto);
    }
}
