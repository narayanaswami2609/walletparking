import  express  from "express";
import { login, register } from "../controllers/userController.js";

const routes = express.Router()

routes.route("/register").post(register)
routes.route("/login").get(login)

export default routes