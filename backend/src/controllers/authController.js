import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*
    Manages:
        - User registration
        - Login
        - JWT authentication
*/

export const register = async (req, res) => {
    try {
        const {
            firstName,
            LastName,
            email,
            password
        } = req.body;

        const existingUser = awaitUser.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                sucess: false,
                message: "This User already exists"
            });
        }

        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            LastName,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bycrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            success: true,
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
