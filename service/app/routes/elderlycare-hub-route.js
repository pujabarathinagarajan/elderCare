import express from "express";
import * as elderlyCareHubController from "../controllers/elderlycare-hub-controller.js";
import multer from "multer";
import fs from "fs"; // Add import for fs
import DoctorUser from "../models/DoctorUser.js"; // Assuming DoctorUser model path
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  getAppointmentCounts,
  getAppointmentInfo,
  patchAppointmentInfo,
  createCheckoutSession,
} from "../controllers/elderlycare-hub-controller.js";

import { protect } from "../middleware/authMiddleware.js";

import Stripe from "stripe";
const stripe = Stripe(
  "sk_test_51OUVcoDmUxj6ZBojdLoUteV2GFbUxMM7gkSvKTCAtUnCmqOG6Lnbw6fqEUNUZQ5oT6EfnOJ8KBnmFHy6lYzkzOvi006qsKFVFH"
);

const router = express.Router();

router
  .route("/appointments")
  .get(elderlyCareHubController.getAppointment)
  .post(elderlyCareHubController.postAppointment);

router
  .route("/appointments/:id")
  .get(elderlyCareHubController.getAppointmentByAppointmentId)
  .patch(elderlyCareHubController.patchAppointment)
  .delete(elderlyCareHubController.deleteAppointment);

router
  .route("/filterAppointments")
  .get(elderlyCareHubController.getAppointmentsByFilters);

router
  .route("/doctors")
  .get(elderlyCareHubController.getDoctor)
  .post(elderlyCareHubController.postDoctor);

router
  .route("/doctors/:id")
  .get(elderlyCareHubController.getDoctortByDoctorId)
  .patch(elderlyCareHubController.patchDoctor)
  .delete(elderlyCareHubController.deleteDoctor);

router.route("/filterDoctors").get(elderlyCareHubController.getDoctorByFilters);

router
  .route("/filterDoctorAndApoointment")
  .get(elderlyCareHubController.joinDoctorAndAppointmentFilter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router.put("/updateDocProfile/:docId", updateUserProfile); // Changed from route() to direct use
router.get("/getDocProfile/:docId", getUserProfile); // Changed from route() to direct use

const uploadImage = multer({ storage: storage });

router.post(
  "/picUpload/:docId",
  uploadImage.single("image"),
  async (req, res) => {
    console.log("inside pic upload");
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const docId = req.params.docId;
      const existingImage = await DoctorUser.findOne({ docId });

      existingImage.imageData = fs.readFileSync("uploads/" + req.file.filename);
      existingImage.contentType = req.file.mimetype;
      existingImage.name = req.file.filename;

      await existingImage.save();

      res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

router.get("/getPic", async (req, res) => {
  try {
    const allData = await DoctorUser.find();
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//stripe route added
router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Appointment Payment",
            },
            unit_amount: 2000, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3002/paymentsuccess", // Redirect URL after successful payment
      cancel_url: "http://localhost:3002/elderlycare", // Redirect URL after cancelled payment
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating checkout session" });
  }
});
router.route("/getAppointmentCounts").get(getAppointmentCounts);

router
  .route("/getBookingInfo")
  .patch(patchAppointmentInfo)
  .get(getAppointmentInfo);

router.route

export default router;
