import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
// import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import { adminRouter } from "./Routes/AdminRouter.js";
import Jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from 'url';
import dbConnect from "./utilis/db.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "build")));
 app.use('/auth', adminRouter);
// app.use('/employee', EmployeeRouter);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
dbConnect();