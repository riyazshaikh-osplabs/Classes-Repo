const bcrypt = require("bcryptjs");
const { Student, Person, City, State, Teacher, Location, Course, CourseStudent } = require("../index");
const { logger } = require("../../setup/logger");

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
    const existingEnrollmentOfStudents = [StudentId].map(async (studentId) => {
        const existingEnrollment = await CourseStudent.findOne({
            where: {
                CourseId: Id,
                StudentId: studentId
            }
        });
        logger.log("123", existingEnrollment);
        return existingEnrollment;
    });
    logger.log("kalim", existingEnrollmentOfStudents);
    return Promise.all(existingEnrollmentOfStudents);
};

const EnrollStudent = async (CourseId, Students, EnrolledOn) => {
    logger.log("data is here", Students, Students.Id);
    let studenIds = Array.isArray(Students) ? Students.map(s => s.Id) : [Students.Id];
    logger.log("hello", studenIds);
    const courseStudentArray = studenIds.map((student) => {
        console.log(student);
        const courseStudent = CourseStudent.create({
            CourseId: CourseId,
            StudentId: student,
            EnrolledOn: EnrolledOn,
        });
        return courseStudent;
    });
    const courseStudentPromises = Promise.all(courseStudentArray);
    return courseStudentPromises.then(() => courseStudentPromises);
};

// const ValidateTeacherEnrollment = async (CourseId) => {

//     const teacher = await Course.findOne({
//         where: {
//             Id: CourseId,
//             TeacherId: { [Op.not]: null }
//         }
//     });
//     logger.log(teacher);
//     return teacher;

// };

module.exports = {
    SignupStudent, SignupTeacher, EnrollStudent, FetchTeacherById, RegisterCourse, CreateLocation, CheckIfCourseExists,
    AssignTeacher, CheckStudentExistingEnrollment
};

