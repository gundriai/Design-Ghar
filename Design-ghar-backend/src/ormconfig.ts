import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('📡 Connecting with URI:', process.env.MONGO_URI);  // Debug log

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URI,
  synchronize: true,
  entities: [User],
  ssl: true, // Use SSL for secure connection
};
