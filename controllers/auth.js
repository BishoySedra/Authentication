import dotenv from "dotenv";
import User from "../models/user.js";
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

export function postLogin(req, res) {
    const username = req.body.username;
    // Use the username value as needed
    console.log(username);
    res.send(username);

}

export async function postSignup(req, res) {
    const {username, email, password} = req.body;
    
    // // check if the user already exists
    // const existed_user = await User.findOne({ where: { email } });

    // if(existed_user !== null){
    //     console.log("This user is already registered!");
    //     return res.render("signup", { message: "This user is already registered!" });
    // }

    // const hashedPassword = await utils.hashPassword(password);
    const new_user = await User.create({ username, email, password });

    if(new_user !== null){
        console.log("User registered successfully!");
        return res.render("login", { message: "User registered successfully!" });
    }

    console.log("Failed to register user, please try again!");
    res.render("signup", { message: "Failed to register user, please try again!" });
}

