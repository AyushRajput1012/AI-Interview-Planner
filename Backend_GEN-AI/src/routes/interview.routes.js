const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const interviewController = require('../controllers/interview.controller')
const upload = require('../middleware/file.middleware')


const interviewRouter = express.Router();


/**
 * @route POST /api/interview/
 * @description Generate an interview report based on the candidate's resume, 
  self-description, and job description.
* @access Private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController);

/***
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access Private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportController);


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user
 * @access Private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf ont the basis of user self description  resume content and job description
 * @access Private
 */
interviewRouter.post("/resume/pdf/:interviewId", authMiddleware.authUser, interviewController.generateResumePdfController);

/**
 * @route DELETE /api/interview/:interviewId
 * @description delete interview report by interviewId
 * @access Private
 */
interviewRouter.delete("/:interviewId", authMiddleware.authUser, interviewController.deleteInterviewReportController);
 


module.exports = interviewRouter;