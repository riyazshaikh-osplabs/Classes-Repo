const { SendResponse } = require("../utils/utils");
const { CreateLocation, RegisterCourse, FetchTeacherById, CheckIfCourseExists, AssignTeacher, CheckStudentExistingEnrollment, TeacherEnrollment, EnrollStudent } = require("../migrates/models/dbHelper/helper")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "240s" });

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

        const existingEnrollment = await CheckStudentExistingEnrollment(CourseId, StudentId);
        if (existingEnrollment) {
            return SendResponse(res, 409, "Student is already enrolled in this course", [], [], false);
        };

        const validateTeacherEnrollment = await TeacherEnrollment(CourseId);
        if (!validateTeacherEnrollment) {
            return SendResponse(res, 409, "Teacher is not enrolled in this course", [], [], false);
        }

        const enrollment = await EnrollStudent(CourseId, StudentId, EnrolledOn);

        return SendResponse(res, 200, "Student enrolled to the course successfully", enrollment, [], true);
    } catch (error) {
        next(error);
    }
};

module.exports = { Signin, AddLocation, CreateCourse, AssignTeacherToCourse, EntrollStudentToCourse };