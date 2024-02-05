import Express  from "express";
import ejs from "ejs";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./config/connection.js";
import User from "./models/user.js";

dotenv.config();

const app = new Express();

// Set the view engine to EJS
app.set("view engine", "ejs");
// Set the views directory
app.set("views", "./views");

app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(authRouter);

connectDB();

try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}!`);
    });
} catch (error) {
    console.log(error);    
}
