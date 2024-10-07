import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import  userRouter from  "./routes/user.routes.js"

const app = express();

app.use(cors({origin:'http://localhost:5173',credentials:true}));

app.use(express.json({}));
app.use(express.urlencoded({}));
app.use(cookieParser());

app.use("/api", userRouter);

export {app};