import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide fullname, email and password"
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).send("Error registering user");
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 }).json({
            success: true,
            message: "User logged in successfully",
            token
        });
    } catch (error) {
        res.status(500).send("Error logging in user");
    }

}

export const logout = async (req, res) => {
    try {
        return res.status(200).clearCookie("token", { maxAge: 0 }).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).send("Error logging out user");
    }
}