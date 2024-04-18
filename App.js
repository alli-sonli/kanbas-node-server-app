import express from 'express';
import session from "express-session";
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import UserRoutes from "./Users/routes.js";
import mongoose from "mongoose";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import "dotenv/config";

const app = express();
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect('mongodb://127.0.0.1:27017/kanbas');
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
// if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         domain: process.env.HTTP_SERVER_DOMAIN,
//     };
// }
// app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app)
Hello(app)
app.listen(process.env.PORT || 4000);