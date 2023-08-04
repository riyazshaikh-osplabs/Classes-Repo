const { body, validationResult } = require("express-validator");
const { SendResponse } = require("../utils/utils");

const ValidateSignupFields = [

    body("FirstName").trim().notEmpty().withMessage("FirstName field is required").bail()
        .isLength({ min: 3, max: 20 }).withMessage("FirstName length should be more than 3 and less than 21 characters!").bail()
        .isAlpha().withMessage('FirstName must contain only alphabetic characters'),

    body("LastName").trim().notEmpty().withMessage("LastName field is required").bail()
        .isAlpha().withMessage('LastName must contain only alphabetic characters').bail()
        .isLength({ min: 3, max: 20 }).withMessage("LastName length should be more than 3 and less than 21 characters!").bail()
        .custom((value, { req, }) => {
            if (value == req.body.FirstName) {
                throw new Error("LastName should not be equals to FirstName!");
            } else {
                return value;
            }
        }),

    body("Mobile").trim().notEmpty().withMessage("Mobile field is required").bail()
        .isMobilePhone().withMessage("Mobile phone number should be valid").bail()
        .isLength({ min: 10, max: 10 }).withMessage("Mobile number should consists of 10 numbers")
        .isNumeric().withMessage("Mobile number should only be positive integers"),

    body("Email").trim().notEmpty().withMessage("Email field is required").bail()
        .isEmail().withMessage("Email is not a valid email address"),

    body("Password").trim().notEmpty().withMessage("Password field is required").bail()
        .isStrongPassword().withMessage("'Password must contain 6 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 symbol'"),


    body("Address").trim().notEmpty().withMessage("Address field is required").bail()
        .isLength({ min: 10, max: 100 }).withMessage("Address length should be more than 8 and less than 21 characters!"),

    body("CityId").trim().notEmpty().withMessage("CityId field is required").bail()
        .isInt({ min: 1 }).withMessage('CityId must be a positive integer').bail()
        .custom((value) => {
            if (isNaN(value)) {
                throw new Error("CityId must be a positive integer");
            }
            return value;
        }),

    body("StateId").trim().notEmpty().withMessage("StateId field is required").bail()
        .isInt({ min: 1 }).withMessage('StateId must be a positive integer').bail()
        .custom((value) => {
            if (isNaN(value)) {
                throw new Error("StateId must be a positive integer");
            }
            return value;
        })
];


const ValidateSigninFields = [
    body("Email").trim()
        .notEmpty()
        .withMessage("Email is required!").bail()
        .isEmail()
        .withMessage("Email is not a valid email address"),

    body("Password").trim()
        .notEmpty().withMessage("password is required!").bail()
        .isStrongPassword().withMessage("'the password must contain 6 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 symbol'"),
];

const ValidateLocationFields = [

    body('Name').trim().notEmpty().withMessage('Name field is required').bail()
        .isLength({ min: 3, max: 40 }).withMessage("Location Name should be more than 2 and less than 41 characters").bail()
        .isString().withMessage("Location Name should only be of string values"),

    body('Address').trim().notEmpty().withMessage('Address field is required').bail()
        .isLength({ min: 3, max: 40 }).withMessage("Address should be more than 2 and less than 41 characters").bail(),

    body('MaxStudents').trim().notEmpty().withMessage('MaxStudents field is required').bail()
        .isInt({ min: 0 }).withMessage('MaxStudents must be a non-negative integer'),
];

const ValidateCreateCourseFields = [

    body('Name').trim()
        .notEmpty().withMessage('Name field is required.').bail()
        .isLength({ min: 3 }).withMessage("Name should be of 3 or more than 3 characters"),

    body('Description').trim()
        .optional()
        .notEmpty().withMessage('Description field is required.').bail()
        .isLength({ min: 3 }).withMessage("Description should be of 3 or more than 3 characters"),

    body('Duration').trim()
        .notEmpty().withMessage('Duration field is required.').bail()
        .isInt({ min: 1 }).withMessage('Duration must be a positive integer.').bail(),

    body('TeacherId').trim()
        .optional().isInt({ min: 1 }).withMessage('TeacherId must be a positive integer.').bail(),
];

const ValidateTeacherFields = [
    body('CourseName').notEmpty().withMessage('Course name is required.').bail().trim()
        .isLength({ min: 3 }).withMessage('Invalid courseName please provide atleast 3 character courseName.'),


    body('TeacherId').trim()
        .notEmpty().withMessage("TeacherId is required").bail()
        .isInt({ min: 1 }).withMessage('Invalid TeacherId. It must be a positive integer.'),
];

const ValidateStudentEnrollment = [

    body('CourseId').trim().notEmpty().withMessage("CourseId is required").bail()
        .isInt().withMessage('Invalid courseId. Must be a positive integer.'),

    body('StudentId').trim().notEmpty().withMessage("StudentId is required").bail()
        .isInt().withMessage('Invalid studentId. Must be a positive integer.'),

    body('EnrolledOn').trim().optional()
        .isISO8601("YYYY-MM-DD").toDate().withMessage('Invalid enrollment date. Must be a valid ISO8601 date.'),
];

const ValidateErrors = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return SendResponse(res, 400, "Error", null, errors, false);
    }
    next();
};

module.exports = {
    ValidateSignupFields, ValidateSigninFields, ValidateLocationFields, ValidateCreateCourseFields,
    ValidateTeacherFields, ValidateStudentEnrollment, ValidateErrors
};