const router = require("express").Router();

const { Signup, Signin } = require("../controllers/teacher");
const { ValidateUserExists, ValidateCityIdAndStateId, ValidateUserData } = require("../middlewares/auth");

const { ValidateSignupFields, ValidateSigninFields, ValidateErrors } = require("../middlewares/validator");

router.post("/signup", ValidateSignupFields, ValidateErrors, ValidateUserExists, ValidateCityIdAndStateId, Signup);
router.post("/signin", ValidateSigninFields, ValidateErrors, ValidateUserData, Signin);

module.exports = router;