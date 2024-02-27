import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Sign-Up api for registering new User

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json("all fields are required");
        }
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json("user already exists");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        user = new userModel({ name, email, password: hashedPassword });

        user = await user.save();
        if (!user) {
            return res.status(400).json({ message: "error in creating user" })
        } else {
            const { password, ...otherDetails } = user._doc;
            return res.status(201).json({ message: "user created succesfully", otherDetails });
        }
    } catch (error) {
        console.log(error);
    }
}

//Sign-In api for logging in for the regisitered User

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json("all fields are required");
        }
        let user;
        user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json("email not found");
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Password Incorrect");
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1d'
            });
            const { password, ...otherDetails } = user._doc;
            return res.cookie('access', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            }).status(200).json({ otherDetails });
        }
    } catch (error) {
        console.log(error);
    }
}

//Fetching Logged-User after verifiaction of token 

export const getLoggedUser = async (req, res, next) => {
    try {
        const loggedUser = await userModel.findById({ _id: req.user.id }).select('-password');
        return res.status(200).json(loggedUser);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

// Sign-Out api for logged-User

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access');
        return res.status(200).json({ message: "Logout Successful" })
    } catch (error) {
        return res.status(500).json("unable to logout");
    }

}