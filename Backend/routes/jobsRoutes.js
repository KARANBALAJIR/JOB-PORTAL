const express = require("express");
const router = express.Router();
const { createJob } = require("../controllers/jobsController");
const { isAuthenticated } = require("../middleware/auth");



//jobs routes

// /api/job/create
router.post('/job/create', isAuthenticated, createJob);


module.exports = router;