import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Demo, DemoSchema } from './demo.schema';
import { DemoController } from './demo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI + '&dbName=DesignGhar'),
    MongooseModule.forFeature([{ name: Demo.name, schema: DemoSchema }]),
  ],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
