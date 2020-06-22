import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    product_id: number

    @Column()
    avg_review_score: number

    @Column()
    num_of_reviews: number
}
