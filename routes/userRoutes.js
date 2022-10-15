import  express  from "express";
import { register } from "../controllers/userController.js";

const routes = express.Router()

routes.route("/register").post(register)

export default routes