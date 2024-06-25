import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
  } from "../controllers/elderlycare-hub-controller.js";

// POST /api/users - Register a user
// POST /api/users/auth - Authenticate a user and get token
// POST /api/users/logout - Logout user and clear cookie
// GET /api/users/profile - Get user profile
// PUT /api/users/profile - Update profile

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/updateDocProfile/:docId")
  //  .get(protect, getUserProfile)
  .put(updateUserProfile);

router.route("/getDocProfile/:docId").get(getUserProfile);
export default router;

