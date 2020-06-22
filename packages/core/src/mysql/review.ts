import { Review } from './entity/Review'
import { getClient } from './init'

const client = getClient()

export async function createReview (
  productId: number,
  avg_review_score: number,
  num_of_reviews: number,
  ) {
  const review = new Review()
  review.product_id = productId
  review.avg_review_score = avg_review_score
  review.num_of_reviews = num_of_reviews

  return await client.manager.save(review)
}

export async function getReviewByProductId (
  productId: number,
) {
  const reviewRepository = client.getRepository(Review);
  const review = await reviewRepository.findOne({ product_id: productId })
  return review
}

export async function updateReviewByProductId (
  productId: number,
  avg_review_score: number,
  num_of_reviews: number,
) {
  const reviewRepository = client.getRepository(Review)
  const reviewToUpdate = await reviewRepository.findOne({ product_id: productId })
  if (reviewToUpdate) {
    reviewToUpdate.avg_review_score = avg_review_score
    reviewToUpdate.num_of_reviews = num_of_reviews
    await reviewRepository.save(reviewToUpdate)
    return await reviewRepository.findOne({ product_id: productId })
  } else {
    return null
  }
}

export async function deleteReview (
  productId: number,
) {
  const reviewRepository = client.getRepository(Review)
  const reviewToRemove = await reviewRepository.findOne({ product_id: productId })
  if (reviewToRemove) {
    await reviewRepository.remove(reviewToRemove)
  }
  return null
}
