import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('category')
@Index(['isActive', 'sortOrder'])
@Index(['sku'], { unique: true })
export class Category {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    sku: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'int', nullable: false })
    sequence: number;

    @Column({ type: 'simple-array', nullable: true })
    tags?: string[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(partial?: Partial<Category>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}
