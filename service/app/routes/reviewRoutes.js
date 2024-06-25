import express from "express";
import {
    getDoctorReview,
    postDoctorReview,
    getPopularReviewsController
} from "../controllers/reviewController.js";

const router = express.Router();

router.route('/reviews')
    .get(getDoctorReview)
    .post(postDoctorReview);

router.get('/popularReviews', getPopularReviewsController);

export default router;
