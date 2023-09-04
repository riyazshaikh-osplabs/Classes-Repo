const { logger } = require("../setup/logger");
const jwt = require("jsonwebtoken");
const { SendResponse } = require("../utils/utils");
const { Course, Student, Person, State, City, Location, Schedule } = require("../models");
const { CheckIfCourseExists, FetchTeacherById } = require("../models/dbHelper/helper");
const { Op } = require("sequelize");
const { isDateTimeFormat } = require("./validator");

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

const ValidateStudentDetails = async (req, res, next) => {
    const { CourseId, StudentId } = req.body;
    try {

        const course = await Course.findOne({ where: { Id: CourseId } });
        if (!course) {
            return SendResponse(res, 409, "Course Not found", [], [], false);
        }
        logger.log("course", course);

        logger.log("riyaz", StudentId);
        if (Array.isArray(StudentId)) {
            debugger
            const studentBulk = [];
            StudentId.forEach(async sid => {
                const studentsExists = await Student.findByPk(sid);
                logger.log("studentexists", studentsExists);
                if (!studentsExists) {
                    return SendResponse(res, 409, `Student of id ${user} not found`, [], [], false);
                }
                studentBulk.push(studentsExists)
            })
            // const studentBulk = StudentId.map(async (user) => {
            //     const studentsExists = await Student.findByPk(user);
            //     logger.log("studentexists", studentsExists);
            //     if (!studentsExists) {
            //         return SendResponse(res, 409, `Student of id ${user} not found`, [], [], false);
            //     }
            //     return studentsExists;
            // });

            logger.debug("studentBulk", studentBulk);
            req.Students = studentBulk;

        } else {
            debugger
            const studentOne = await Student.findByPk(StudentId);
            if (!studentOne) {
                return SendResponse(res, 409, "Student Not found", [], [], false);
            };

            logger.log("studentOne", studentOne);
            req.Students = studentOne;

        }
        next();
    } catch (error) {
        next(error);
    }
};

const ValidateCourseName = async (req, res, next) => {
    const { Name } = req.body;
    try {
        const courseNameExists = await CheckIfCourseExists(Name);
        if (courseNameExists) {
            return SendResponse(res, 400, "Course name already exists", [], [], false);
        };
        next();
    } catch (error) {
        next(error);
    }
};

const ValidateTeacherExistence = async (req, res, next) => {
    const { TeacherId } = req.body;
    try {
        const teacherExists = await FetchTeacherById(TeacherId);
        if (!teacherExists || teacherExists === null) {
            return SendResponse(res, 400, "Teacher not found", [], [], false);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const ValidateCityIdAndStateId = async (req, res, next) => {
    const { CityId, StateId } = req.body;
    try {

        const cityIdExists = await State.findOne({
            where: { Id: StateId }
        });

        if (!cityIdExists) {
            return SendResponse(res, 409, "City Id Does not exists", [], [], false);
        };

        const cityIdWithStateExists = await City.findOne({
            where: { Id: CityId },
            include: [
                {
                    model: State,
                    where: { Id: StateId }
                }
            ]
        });

        if (!cityIdWithStateExists) {
            return SendResponse(res, 409, "City Id Does not exists with the state");
        };

        const stateIdExists = await State.findOne({
            where: { Id: StateId }
        });

        if (!stateIdExists) {
            return SendResponse(res, 409, "State Id Does not exists");
        };

        next();
    } catch (error) {
        next(error);
    }
};

const ValidateUserExists = async (req, res, next) => {
    try {
        const { Email } = req.body;

        const existingUser = await Person.findOne({
            where: { Email }
        });

        if (existingUser) {
            return SendResponse(res, 409, "User Already Exists");
        };

        req.User = existingUser;
        next();
    } catch (error) {
        next(error);
    }
};

const ValidateUserData = async (req, res, next) => {
    try {
        const { Email } = req.body;

        const existingUser = await Person.findOne({
            where: { Email }
        });

        if (!existingUser) {
            return SendResponse(res, 409, "User Not Found");
        };

        req.User = existingUser;
        next();
    } catch (error) {
        next(error);
    }
};


const ValidateScheduleTime = async (req, res, next) => {
    const { StartTime, EndTime } = req.body;
    try {
        const startTime = new Date(StartTime);
        const endTime = new Date(EndTime);
        const timeDifference = endTime.getTime() - startTime.getTime();

        const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
        if (timeDifferenceInHours > 4) {
            return SendResponse(res, 400, "The schedule should not exceed 4 hours", [], [], false);
        }

        next();
    } catch (error) {
        next(error);
    }
};

const ValidateLocation = async (req, res, next) => {
    const { LocationId } = req.body;

    try {
        const locationExists = await Location.findByPk(LocationId);
        if (!locationExists) {
            return SendResponse(res, 409, "Location Does not Exists", [], [], false);
        }
        req.Location = locationExists;
        next();
    } catch (error) {
        next(error);
    }
};

const CheckForMaxStudents = async (LocationId, StartTime, EndTime) => {
    const countOfStudents = await Schedule.count({
        where: {
            LocationId,
            [Op.and]: [
                { StartTime: { [Op.lte]: StartTime } },
                { EndTime: { [Op.gte]: EndTime } },
            ],
        },
    });

    return countOfStudents;
};

module.exports = {
    ValidateTokenForStudent,
    ValidateTokenForTeacher,
    ValidateTokenForAdmin,
    ValidateStudentDetails,
    ValidateUserExists,
    ValidateCourseName,
    ValidateTeacherExistence,
    ValidateCourseDuration,
    ValidateCityIdAndStateId,
    ValidateScheduleTime,
    ValidateLocation,
    CheckForMaxStudents,
    ValidateUserData
};