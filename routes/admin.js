const router = require("express").Router();

const { Signin } = require("../controllers/admin");
const { ValidateUserData, ValidateTokenForAdmin } = require("../middlewares/auth");
const { ValidateSigninFields, ValidateErrors } = require("../middlewares/validator");


const ProtectedAdminRoutes = require("./protected/admin")

router.post("/signin", ValidateSigninFields, ValidateErrors, ValidateUserData, Signin);

router.use("/protected", ValidateTokenForAdmin, ProtectedAdminRoutes);


module.exports = router;