import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { genrateToken } from '../lib/utils.js';
//Signup contoller
export const signup = async (req, res) => {
    try {
        const { username, email, password, profilepic } = req.body;
        if (!username || !email || !password) {
            res.status(401).json({ message: "Please Enter All The Credentials" });
            return;
        }
        if (password.length < 6) {
            res.status(401).json({ message: "Please Enter A Password with more than 6 digit" });
            return;
        }
        //checking user exists or not
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        if (user) {
            res.status(401).json({ message: "User already exists" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const newuser = await prisma.users.create({
            data: {
                username,
                email,
                password: hashedpassword,
                profilepic
            }
        });
        if (newuser) {
            res.status(201).json({
                message: "User created successfully"
            });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Internal Server Error"
        });
        return;
    }
};
//Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({ message: "Enter All The Credentials" });
            return;
        }
        //Checking User exists or not
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            res.status(401).json({ message: "Invalid email" });
            return;
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            res.status(401).json({ message: "Invalid Password" });
        }
        genrateToken(user.id, res);
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            profilepic: user.profilepic,
            createdat: user.created_at,
            updatedat: user.updated_at
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Internal Server Error"
        });
        return;
    }
};
//Logout controller
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(201).json({ message: "Logout successfull" });
    }
    catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Internal Server Error"
        });
        return;
    }
};
//# sourceMappingURL=auth.controller.js.map