import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { User, UserRole } from 'src/user/user.entity';


dotenv.config();

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

    ) { }

    async onModuleInit() {
        await this.seedRootAdmin();
    }

    /**
     * Seeds the root admin user in the system.
     * If the root admin already exists, it logs a message and returns.
     * If the ROOT_ADMIN_EMAIL or ROOT_ADMIN_PASSWORD is missing in the environment variables, it logs a warning and returns.
     * If the root admin does not exist, it creates a customer with the provided email if it doesn't exist.
     * Then, it creates a new user with the provided email and password, and assigns the role of ROOT_ADMIN to the user.
     * The user is associated with the created customer.
     * Finally, it saves the user in the database.
     * @returns {Promise<void>}
     */
    async seedRootAdmin() {
        const email = process.env.ROOT_ADMIN_EMAIL;
        const password = process.env.ROOT_ADMIN_PASSWORD;

        if (!email || !password) {
            console.warn('❗ ROOT_ADMIN_EMAIL or ROOT_ADMIN_PASSWORD missing in .env');
            return;
        }

        const existingAdmin = await this.userRepo.findOne({ where: { email, role: UserRole.ADMIN } });

        if (existingAdmin) {
            console.log(`✅ Root admin already exists with email: ${email}`);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = this.userRepo.create({
            
            name: 'Root Admin',
            email: email,
            password: hashedPassword,
            role: UserRole.ADMIN,
        });

        await this.userRepo.save(admin);
        console.log(`Root admin seeded, email: ${email}, password: ${password}`);
    }
}
