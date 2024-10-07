import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from './app.js'

dotenv.config({
    path: "./env"
})

const port=3000;

connectDB()
.then(() => {
    app.listen(port,()=>{
        console.log("server running at port",port);
    })
})
.catch((err) => {
    console.log("Mongodb connection failed");
})