import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('banner')
@Index(['isActive', 'startDate', 'endDate', 'sequence'])
export class Banner {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    imageUrl: string;

    @Column({ nullable: true })
    mobileImageUrl?: string;

    @Column({ nullable: false })
    altText: string;

    @Column({ type: 'datetime', nullable: false })
    startDate: Date;

    @Column({ type: 'datetime', nullable: true })
    endDate?: Date;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'int', nullable: false })
    sequence: number;

    @Column({ type: 'bigint', default: 0 })
    viewCount: number;

    @Column({ type: 'bigint', default: 0 })
    clickCount: number;

    @Column({ nullable: true })
    redirectUrl: string;

    @Column({ nullable: true })
    category: string; // Reference to Category (ObjectId as string)

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor(partial?: Partial<Banner>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}
