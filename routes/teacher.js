const router = require("express").Router();

const { Signup, Signin } = require("../controllers/teacher");

const { ValidateUserExists, ValidateCityIdAndStateId, ValidateUserData } = require("../migrates/models/dbHelper/helper");

const { ValidateSignupFields, ValidateSigninFields, ValidateErrors } = require("../middlewares/validator");

router.post("/signup", ValidateSignupFields, ValidateErrors, ValidateUserExists, ValidateCityIdAndStateId, Signup);
router.post("/signin", ValidateSigninFields, ValidateErrors, ValidateUserData, Signin);

module.exports = router;