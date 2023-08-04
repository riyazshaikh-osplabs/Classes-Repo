const { logger } = require("../setup/logger");
const jwt = require("jsonwebtoken");
const { SendResponse } = require("../utils/utils");
const { Course, Student, CourseStudent } = require("../migrates/models");

const ValidateTokenForStudent = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return SendResponse(res, 401, "Token is required", null, false);
        }

        if (!authHeader.startsWith('Bearer ')) {
            return SendResponse(res, 401, "Invalid Token Format", null, false);
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedToken.FirstName || !decodedToken.LastName || !decodedToken.Email) {
            return SendResponse(res, 401, "Invalid Token Data || Unauthorized", null, false);
        }
        logger.log(decodedToken);

        if (decodedToken.Role === "Student") {
            next();
        } else {
            return SendResponse(res, 401, "Unauthorized User!", null, false);
        }

    } catch (error) {
        next(error);
    }
};

const ValidateTokenForTeacher = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return SendResponse(res, 401, "Token is required", null, false);
        }

        if (!authHeader.startsWith('Bearer ')) {
            return SendResponse(res, 401, "Invalid Token Format", null, false);
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedToken.FirstName || !decodedToken.LastName || !decodedToken.Email) {
            return SendResponse(res, 401, "Invalid Token Data || Unauthorized", null, false);
        }

        if (decodedToken.Role === "Teacher") {
            next();
        } else {
            return SendResponse(res, 401, "Unauthorized User!", null, false);
        }

    } catch (error) {
        next(error);
    }
};

const ValidateTokenForAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return SendResponse(res, 401, "Token is required", null, false);
        }

        if (!authHeader.startsWith('Bearer ')) {
            return SendResponse(res, 401, "Invalid Token Format", null, false);
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedToken.FirstName || !decodedToken.LastName || !decodedToken.Email) {
            return SendResponse(res, 401, "Invalid Token Data || Unauthorized", null, false);
        }

        if (decodedToken.Role === "Admin") {
            next();
        } else {
            return SendResponse(res, 401, "Unauthorized User!", null, false);
        }

    } catch (error) {
        next(error);
    }
};

const ValidateCourseDuration = (req, res, next) => {
    const { Duration } = req.body;
    try {

        if (Duration < 0 || Duration > process.env.DURATION_TIME) {
            return SendResponse(res, 200, "Invalid duration. Duration must be greater than or equal to 1 and less than or equal to 4.", [], [], false);
        };
        next();
    } catch (error) {
        next(error);
    }
};

const ValidateCourseId = async (req, res, next) => {
    const { CourseId } = req.body;
    try {

        const course = await Course.findOne({
            where: { Id: CourseId }
        });
        if (!course) {
            return SendResponse(res, 409, "Course Not found", [], [], false);
        }
        logger.log(course);
        next();
    } catch (error) {
        next(error);
    }
};

const ValidateStudentId = async (req, res, next) => {
    const { StudentId } = req.body;
    try {

        const student = await Student.findByPk(StudentId);
        if (!student) {
            return SendResponse(res, 409, "Student Not found", [], [], false);
        };

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { ValidateTokenForStudent, ValidateTokenForTeacher, ValidateTokenForAdmin, ValidateCourseId, ValidateStudentId, ValidateCourseDuration };