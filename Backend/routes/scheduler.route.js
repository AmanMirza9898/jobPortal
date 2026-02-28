import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAuthUrl,
  googleCallback,
  setAvailability,
  getAvailability,
  scheduleInterview,
} from "../controllers/scheduler.controller.js";

const router = express.Router();

router.route("/auth-url").get(isAuthenticated, getAuthUrl);
router.route("/google/callback").get(googleCallback);
router.route("/availability").post(isAuthenticated, setAvailability);
router.route("/availability/:recruiterId").get(getAvailability);
router.route("/schedule").post(isAuthenticated, scheduleInterview);

export default router;
