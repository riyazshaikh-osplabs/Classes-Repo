const router = require("express").Router();

const { Signin, AddLocation, CreateCourse, AssignTeacherToCourse, EntrollStudentToCourse } = require("../controllers/admin");

const { ValidateUserData, ValidateCourseName, ValidateTeacherExistence } = require("../migrates/models/dbHelper/helper");

const { ValidateTokenForAdmin, ValidateCourseDuration, ValidateStudentId, ValidateCourseId } = require("../middlewares/auth");

const { ValidateSigninFields, ValidateErrors, ValidateLocationFields, ValidateCreateCourseFields,
    ValidateTeacherFields, ValidateStudentEnrollment } = require("../middlewares/validator");


router.post("/signin", ValidateSigninFields, ValidateErrors, ValidateUserData, Signin);
router.post("/locations", ValidateLocationFields, ValidateErrors, ValidateTokenForAdmin, AddLocation);
router.post("/create-course", ValidateCreateCourseFields, ValidateErrors, ValidateTokenForAdmin, ValidateCourseName, ValidateCourseDuration, CreateCourse);
router.post("/enroll-student", ValidateStudentEnrollment, ValidateErrors, ValidateTokenForAdmin, ValidateCourseId, ValidateStudentId, EntrollStudentToCourse);


router.put("/assign-teacher", ValidateTeacherFields, ValidateErrors, ValidateTokenForAdmin, ValidateTeacherExistence, AssignTeacherToCourse);

module.exports = router;