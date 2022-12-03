import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

export const register = async (request, response) => {
  try {
    const { name, age, gender, phoneNumber, email, password } = request.body
    if (!name) {
      return response.status(400).send("name must be needed")
    }
    if (!age) {
      return response.status(400).send("age must be needed")
    }
    if (!gender) {
      return response.status(400).send("gender must be needed")
    }
    if (!phoneNumber) {
      return response.status(400).send("phoneNumber must be needed")
    }

    // check user already axist
    const user = await User.findOne({ email })
    if (user)
      return response.status(400).send( {msg:  "email already exist"})

      const hashedPassword = await bcrypt.hash(password, 12)
    await User.create({ name, age, email, gender, phoneNumber, password:hashedPassword })
    response.status(202).json( {msg:  "user registered successfully"})

  } catch (error) {
    response.status(500).send(error.message)
  }
}

export const login = async(req, res) => {
  try {
    const { email, password } = req.query

    // email valication 
    if (!email) return res.status(400).json({ success: false, msg: "email must be provided" })

    // password valication 
    if (!password) return res.status(400).json({ success: false, msg: "password must be provided" })

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ success: false, msg: "email not registred" })

    // const user = await User.findOne({ email })
    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword) return res.status(404).json({ msg: "invalid password" })

    const loginToken = jwt.sign({ email }, "shdiauyiafvyabfy%^&%^#&!%E^@#%^iyfi_aydbcfiuyabfaasfru", {
      expiresIn: '10min'
    })

    res.status(200).json( { msg: "login successful", token: loginToken } )
  } catch (error) {
    res.status(500).send(error.message)
  }
}