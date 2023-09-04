
const router = require("express").Router();

const { AddLocation, CreateCourse, AssignTeacherToCourse, EntrollStudentToCourse, CreateSchedule } = require("../../controllers/admin");
const { ValidateCourseName, ValidateCourseDuration, ValidateStudentDetails, ValidateTeacherExistence, ValidateScheduleTime, ValidateLocation } = require("../../middlewares/auth");
const { ValidateLocationFields, ValidateErrors, ValidateCreateCourseFields, ValidateStudentEnrollment, ValidateTeacherFields, ValidateScheduleDetails } = require("../../middlewares/validator");

router.post("/locations", ValidateLocationFields, ValidateErrors, AddLocation);
router.post("/create-course", ValidateCreateCourseFields, ValidateErrors, ValidateCourseName, ValidateCourseDuration, CreateCourse);
router.post("/enroll-student", ValidateStudentEnrollment, ValidateErrors, ValidateStudentDetails, EntrollStudentToCourse);
router.post("/create-schedule", ValidateScheduleDetails, ValidateErrors, ValidateScheduleTime, ValidateLocation, CreateSchedule);

router.put("/assign-teacher", ValidateTeacherFields, ValidateErrors, ValidateTeacherExistence, AssignTeacherToCourse);

module.exports = router;