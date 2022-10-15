import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import configServer from "./config/server.js";
import userRoutes from "./routes/userRoutes.js";
import configDb from "./config/db.js";
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config({ path: "./config/.env" });
const port = process.env.PORT
const uri = process.env.MONGO_URI

configDb(uri)



app.use("/user", userRoutes)
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, '/app/build')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "app", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        try {
            res.status(200).json({
                success: true, message: `server connected to the port ${port}`
            })
        } catch (error) {
            res.status(400).json({
                success: false, message: error.message
            })
        }
    })
}
configServer(app, port)
