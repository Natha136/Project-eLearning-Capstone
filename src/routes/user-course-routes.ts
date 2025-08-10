const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middlewares/authentication-middleware');
const onlyStudentMiddleware = require('../middlewares/only-student-middleware');
const userCourseController = require('../controllers/user-course-controller');

// POST api/user_courses
router.post('/', authenticationMiddleware, onlyStudentMiddleware, userCourseController.enroll);

module.exports = router;