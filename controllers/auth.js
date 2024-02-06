import dotenv from "dotenv";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import * as utils from "../utils/utils.js";

dotenv.config();

export function login(req, res) {
    res.render("login", {port : process.env.PORT});
}

export function signup(req, res) {
    res.render("signup", {port : process.env.PORT});
}

export function logout(req, res) {
    res.render("logout", {port : process.env.PORT});
}

export function profile(req, res) {
    res.render("profile");
}

export async function postLogin(req, res) {
    const {username, password} = req.body;

    // check if user exists
    const found_user = await User.findOne({ where :{ username }});

    // console.log(found_user);

    if (!found_user) {
        // return res.json({message: "User does not exist!"});
        return res.render("login", { message: "User does not exist!" });
    }

    // compare passwords
    const validPassword = await utils.comparePassword(password, found_user.password);

    if (!validPassword) {
        // return res.json({message: "Invalid Credentials!"});
        return res.render("login", { message: "Invalid Credentials!" });
    }

    const { email } = found_user;

    // return res.json({message: "Logged in successfully", user: found_user});
    return res.render("profile", { message: "Logged in successfully", username, email });
}

export async function postSignup(req, res) {
    try {
        const { username, email, password } = req.body;

        // check if user already exists
    
        const found_user = await User.findOne({ where :{ username }});
    
        if (found_user) {
            // return res.json({message: "User already exists!"});
            return res.render("signup", { message: "User already exists" });
        }
    
        // hash password
        const hashedPassword = await utils.hashPassword(password);
    
        // create new user
        const newUser = User.create({
            username,
            email,
            password: hashedPassword,
        });

        // return res.json({ message: "User created successfully"});
        res.render("login", { message: "User created successfully" });
    } catch (error) {
        // return res.send({ message: "Failed to create user" });
        return res.render("signup", { message: "Failed to create user, please try again!" });
    }
}

