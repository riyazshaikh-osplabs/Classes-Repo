
const router = require("express").Router();

const { AddLocation, CreateCourse, AssignTeacherToCourse, EntrollStudentToCourse } = require("../../controllers/admin");
const { ValidateCourseName, ValidateCourseDuration, ValidateStudentDetails, ValidateTeacherExistence } = require("../../middlewares/auth");
const { ValidateLocationFields, ValidateErrors, ValidateCreateCourseFields, ValidateStudentEnrollment, ValidateTeacherFields } = require("../../middlewares/validator");

router.post("/locations", ValidateLocationFields, ValidateErrors, AddLocation);
router.post("/create-course", ValidateCreateCourseFields, ValidateErrors, ValidateCourseName, ValidateCourseDuration, CreateCourse);
router.post("/enroll-student", ValidateStudentEnrollment, ValidateErrors, ValidateStudentDetails, EntrollStudentToCourse);


router.put("/assign-teacher", ValidateTeacherFields, ValidateErrors, ValidateTeacherExistence, AssignTeacherToCourse);

module.exports = router;