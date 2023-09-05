const { SignupStudent } = require("../models/dbHelper/helper");
const { sequelize } = require("../setup/db");
const { SendResponse } = require("../utils/utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Signup = async (req, res, next) => {
    const { FirstName, LastName, Mobile, Email, Password, Address, CityId, StateId } = req.body;
    const transaction = await sequelize.transaction();
    try {

        const user = await SignupStudent(FirstName, LastName, Mobile, Email, Password, Address, CityId, StateId, transaction);

        await transaction.commit()

        return SendResponse(res, 200, "student signup successfull", user);
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};

const Signin = async (req, res, next) => {
    const { Password } = req.body;
    try {
        const student = req.User;

        const isValidPassword = await bcrypt.compare(Password, student.Password);

        if (!isValidPassword) {
            return SendResponse(res, 400, "Invalid Password", null, false);
        }

        const payload = {
            UserId: student.Id,
            FirstName: student.FirstName,
            LastName: student.LastName,
            Email: student.Email,
            Role: "Student"
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "240s" });

        const user = { token };

        return SendResponse(res, 200, "Signin Successful", user);
    } catch (error) {
        next(error);
    }
};

const Student = async (req, res, next) => {
    try {
        SendResponse(res, 200, "kya bolte", null, null);
    } catch (error) {
        next(error);
    }
};

module.exports = { Signup, Signin, Student };