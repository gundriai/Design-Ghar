import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './ormconfig';
import { User } from './user/user.entity';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService,SeederService],
})
export class AppModule {}
