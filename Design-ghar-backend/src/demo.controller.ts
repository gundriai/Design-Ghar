import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Demo } from './demo.schema';

@Controller('demo')
export class DemoController {
  constructor(@InjectModel(Demo.name) private demoModel: Model<Demo>) {}

  @Get()
  async getDemo() {
    // Create a demo document if none exists
    let doc = await this.demoModel.findOne();
    if (!doc) {
      doc = await this.demoModel.create({ name: 'MongoDB Connected!' });
    }
    return doc;
  }
}
