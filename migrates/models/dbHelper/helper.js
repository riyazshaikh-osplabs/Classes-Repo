const bcrypt = require("bcryptjs");
const { Student, Person, City, State, Teacher, Location, Course, CourseStudent } = require("../index");
const { SendResponse } = require("../../../utils/utils");
const { logger } = require("../../../setup/logger");
const { Op } = require("sequelize");

const GenerateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const SignupStudent = async (FirstName, LastName, Mobile, Email, Password, Address, CityId, StateId) => {
    const hashedPassword = await GenerateHashPassword(Password);

    const person = await Person.create({
        FirstName, LastName, Mobile, Email, Password: hashedPassword, Address, CityId, StateId
    });

    await Student.create({
        PersonId: person.Id
    });

    return { ...person };
};

const SignupTeacher = async (FirstName, LastName, Mobile, Email, Password, Address, CityId, StateId) => {
    const hashedPassword = await GenerateHashPassword(Password);

    const person = await Person.create({
        FirstName, LastName, Mobile, Email, Password: hashedPassword, Address, CityId, StateId
    });

    await Teacher.create({
        PersonId: person.Id
    });

    return { ...person };
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

const ValidateCityIdAndStateId = async (req, res, next) => {
    const { CityId, StateId } = req.body;
    try {

        const cityIdExists = await State.findOne({
            where: { Id: StateId }
        });

        if (!cityIdExists) {
            return SendResponse(res, 409, "City Id Does not exists");
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

const CreateLocation = async (Name, Address, MaxStudents) => {
    const location = await Location.create({
        Name, Address, MaxStudents
    });

    return location;
};

const FetchTeacherById = async (TeacherId) => {
    try {
        const teacher = await Teacher.findByPk(TeacherId);

        return teacher ? teacher : null;
    } catch (error) {
        logger.log("error while fetching teacher", error.toString());
        throw new Error(error);
    }
};

const RegisterCourse = async (Name, Description, Duration, TeacherId) => {
    try {
        const course = await Course.create({
            Name, Description, Duration, TeacherId: TeacherId ? TeacherId : null
        });

        return course;
    } catch (error) {
        logger.log("error while registering course", error.toString());
        throw new Error(error);
    }
};

const CheckIfCourseExists = async (Name) => {
    return Course.findOne({ where: { Name: Name } });
}

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

const AssignTeacher = async (course, TeacherId) => {

    try {
        logger.log(course, TeacherId);
        const [data] = await Course.update(
            { TeacherId: TeacherId },
            {
                where: {
                    Name: course.Name
                }
            }
        );

        return data;
    } catch (error) {
        throw new Error("Error while assigning teacher to course", error);
    }
};

const CheckStudentExistingEnrollment = async (Id, StudentId) => {
    const existingEnrollment = await CourseStudent.findOne({
        where: {
            CourseId: Id,
            StudentId: StudentId
        }
    });
    return existingEnrollment;
};

const EnrollStudent = async (CourseId, StudentId, EnrolledOn) => {
    const courseStudent = CourseStudent.create({
        CourseId: CourseId,
        StudentId: StudentId,
        EnrolledOn: EnrolledOn,
    });
    return courseStudent;
};

const ValidateTeacherEnrollment = async (CourseId) => {

    const teacher = await Course.findOne({
        where: {
            Id: CourseId,
            TeacherId: { [Op.not]: null }
        }
    });
    logger.log(teacher);
    return teacher;

};

module.exports = {
    SignupStudent, SignupTeacher, ValidateUserExists, ValidateUserData, ValidateCourseName, ValidateTeacherExistence, EnrollStudent, ValidateTeacherEnrollment,
    ValidateCityIdAndStateId, FetchTeacherById, RegisterCourse, CreateLocation, CheckIfCourseExists, AssignTeacher, CheckStudentExistingEnrollment
};

