import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
}

@Entity('user')
export class User {
    @ObjectIdColumn()
    id: Object;

    @Column({ nullable: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(partial?: Partial<User>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}