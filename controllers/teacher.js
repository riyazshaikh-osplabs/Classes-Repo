const { SignupTeacher } = require("../migrates/models/dbHelper/helper");
const { SendResponse } = require("../utils/utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Signup = async (req, res, next) => {
    const { FirstName, LastName, Mobile, Email, Password, Address, CityId, StateId } = req.body;
    try {

        const user = await SignupTeacher(FirstName, LastName, Mobile, Email, Password, Address, CityId, StateId);

        return SendResponse(res, 200, "student signup successfull", user);
    } catch (error) {
        next(error);
    }
};

const Signin = async (req, res, next) => {
    const { Password } = req.body;
    try {
        const teacher = req.User;

        const isValidPassword = await bcrypt.compare(Password, teacher.Password);

        if (!isValidPassword) {
            return SendResponse(res, 400, "Invalid Password", null, false);
        }

        const payload = {
            UserId: teacher.Id,
            FirstName: teacher.FirstName,
            LastName: teacher.LastName,
            Email: teacher.Email,
            Role: "Teacher"
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "240s" });

        const user = { token };

        return SendResponse(res, 200, "Signin Successful", user);
    } catch (error) {
        next(error);
    }
};

module.exports = { Signup, Signin }