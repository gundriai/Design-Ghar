import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('product')
@Index(['isActive', 'isFeatured'])
@Index(['name', 'description'])
@Index(['sku'], { unique: true })
export class Product {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    sku: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'text', nullable: true })
    features?: string;

    @Column({ nullable: false })
    categoryId: string; // Reference to Category (ObjectId as string)
    // If you want to use a relation, you can uncomment the following:

    @Column({ nullable: true })
    categoryName?: string; // optional, for denormalization

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    basePrice: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    discountPercentage?: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    finalPrice: number;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isFeatured: boolean;

    @Column({ type: 'bigint', default: 0 })
    viewCount: number;

    @Column({ type: 'simple-array', nullable: true })
    tags?: string[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(partial?: Partial<Product>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}
