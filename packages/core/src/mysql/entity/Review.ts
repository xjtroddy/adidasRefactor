import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number = 1

    @Column()
    product_id: string = ''

    @Column()
    avg_review_score: number = 0

    @Column()
    num_of_reviews: number = 0
}
