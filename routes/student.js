const router = require("express").Router();

const { Signup, Signin, Student } = require("../controllers/student");

const { ValidateSignupFields, ValidateSigninFields, ValidateErrors } = require("../middlewares/validator");
const { ValidateCityIdAndStateId, ValidateUserData, ValidateUserExists } = require("../middlewares/auth");

router.post("/signup", ValidateSignupFields, ValidateErrors, ValidateUserExists, ValidateCityIdAndStateId, Signup);
router.post("/signin", ValidateSigninFields, ValidateErrors, ValidateUserData, Signin);

router.get('/', Student);

module.exports = router;