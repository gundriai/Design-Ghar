// src/common/pipes/parse-mongo-id.pipe.ts
import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, ObjectId> {
  transform(value: string): ObjectId {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException(`Invalid MongoDB ID: ${value}`);
    }

    return new ObjectId(value);
  }
}
