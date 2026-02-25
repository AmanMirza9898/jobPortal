import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyJob, getAppliedJobs, getApplicants, getRecruiterApplicants, updateStatus } from "../controllers/application.controller.js"


const router = express.Router();

router.route('/apply/:id').get(isAuthenticated, applyJob);
router.route('/get').get(isAuthenticated,getAppliedJobs);
router.route('/recruiter/applicants').get(isAuthenticated, getRecruiterApplicants);
router.route('/:id/applicants').get(isAuthenticated, getApplicants);
router.route('/status/:id/update').post(isAuthenticated,updateStatus);

export default router;