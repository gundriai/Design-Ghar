import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './ormconfig';
import { User } from './user/user.entity';
import { SeederService } from './seeder/seeder.service';
import { Product } from './product/product.entity';
import { Category } from './category/category.entity';
import { Banner } from './banner/banner.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User,Product,Category,Banner]),
    AuthModule,
    UserModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService,SeederService],
})
export class AppModule {}
