const { SendResponse } = require("../utils/utils");
const { CreateLocation, RegisterCourse, FetchTeacherById, CheckIfCourseExists, AssignTeacher,
    CheckStudentExistingEnrollment, EnrollStudent, CreateNewSchedule } = require("../models/dbHelper/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { logger } = require("../setup/logger");
const { sequelize } = require("../setup/db");
const { CheckForMaxStudents } = require("../middlewares/auth");

const Signin = async (req, res, next) => {
    const { Password } = req.body;
    try {
        const student = req.User;

        const isValidPassword = await bcrypt.compare(Password, student.Password);

        if (!isValidPassword) {
            return SendResponse(res, 400, "Invalid Password", null, false);
        }

        const payload = {
            UserId: student.Id,
            FirstName: student.FirstName,
            LastName: student.LastName,
            Email: student.Email,
            Role: "Admin"
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "24hrs" });

        const user = { token };

        return SendResponse(res, 200, "Signin Successful", user);
    } catch (error) {
        next(error);
    }
};

const AddLocation = async (req, res, next) => {

    const { Name, Address, MaxStudents } = req.body;

    try {
        const location = await CreateLocation(Name, Address, MaxStudents);

        return SendResponse(res, 200, "Location Added Successfully", location);
    } catch (error) {
        next(error);
    }
};

const CreateCourse = async (req, res, next) => {
    const { Name, Description, Duration, TeacherId } = req.body;
    try {

        if (TeacherId) {
            const teacherExists = await FetchTeacherById(TeacherId);

            if (!teacherExists) {
                SendResponse(res, 400, "Teacher not found", null, null, false);
            }
        };

        const course = await RegisterCourse(Name, Description, Duration, TeacherId);

        return SendResponse(res, 200, "Couse Created Successfully", course);
    } catch (error) {
        next(error);
    }
};

const AssignTeacherToCourse = async (req, res, next) => {
    const { CourseName, TeacherId } = req.body;
    try {
        const course = await CheckIfCourseExists(CourseName);
        if (!course) {
            return SendResponse(res, 409, "Course not found", [], [], false);
        }

        const response = await AssignTeacher(course, TeacherId);
        return SendResponse(res, 200, "Teacher assigned successfully", response);
    } catch (error) {
        next(error);
    }
};

const EntrollStudentToCourse = async (req, res, next) => {
    const { CourseId, StudentId, EnrolledOn } = req.body;
    try {

        const existingEnrollments = await CheckStudentExistingEnrollment(CourseId, StudentId);
        logger.debug(existingEnrollments, "kya bolte bhai ");
        console.log(existingEnrollments, "kya bolte bhai ");

        if (existingEnrollments.some((enrolledStudent) => enrolledStudent)) {
            return SendResponse(res, 409, "Student is already enrolled in this course", [], [], false);
        };

        // const validateTeacherEnrollment = await ValidateTeacherEnrollment(CourseId);
        // if (!validateTeacherEnrollment) {
        //     return SendResponse(res, 409, "Teacher is not enrolled in this course", [], [], false);
        // }
        logger.log("req obj", req.Students);


        const Students = req.Students;
        const enrollment = await EnrollStudent(CourseId, Students, EnrolledOn);

        return SendResponse(res, 200, "Student enrolled to the course successfully", enrollment, [], true);
    } catch (error) {
        next(error);
    }
};

const CreateSchedule = async (req, res, next) => {
    const { CourseId, LocationId, StartTime, EndTime } = req.body;
    const transaction = await sequelize.transaction();
    try {
        const location = req.Location;

        const scheduledStudents = await CheckForMaxStudents(LocationId, StartTime, EndTime);
        if (scheduledStudents >= location.MaxStudents) {
            return SendResponse(res, 409, "'Location has reached its maximum capacity of students.", [], [], false);
        }

        const schedule = await CreateNewSchedule(CourseId, LocationId, StartTime, EndTime, transaction);

        await transaction.commit();
        return SendResponse(res, 200, "Schedule created successfully", schedule, [], true);

    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

module.exports = {
    Signin,
    AddLocation,
    CreateCourse,
    AssignTeacherToCourse,
    EntrollStudentToCourse,
    CreateSchedule
};