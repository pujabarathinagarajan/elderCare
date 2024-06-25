import Review from "../models/reviewModel.js";
import DoctorUser from "../models/DoctorUser.js";

// Get all reviews for a doctor from doctor id and populate the reviews field
const getDoctorReview = async (req, res) => {
    try {
        const reviews = await DoctorUser.findById(req.params.id).populate(
            "reviews"
        );
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const postDoctorReview = async (req, res) => {
    try {
        // req body will contain both the doctor id and the review
        const userId = req.user._id;
        let { docId, title, description, rating } = req.body;
        const doctor = await findDoctorById(docId);
        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        const newReview = new Review({
            title,
            description,
            rating,
            user: userId,
        });
        await newReview.save();
        doctor.reviews.push(newReview);
        // update the company's average rating
        let totalRating = 0;
        doctor.reviews.forEach((review) => {
            totalRating += review.rating || 0;
        });
        doctor.rating = totalRating / doctor.reviews.length;
        doctor.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};


// get top 5 popular reviews by rating
const getPopularReviewsController = async (req, res) => {
    try {
        const reviews = await Review.sort({ rating: -1 })
            .limit(5)
            .populate("user", "name");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export {
    getDoctorReview,
    postDoctorReview,
    getPopularReviewsController,
};