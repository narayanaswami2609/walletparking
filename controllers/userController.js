import User from "../models/userModel.js"



export const register=async(request, response)=>{
    try {
        const { name, age, gender, phoneNumber } = request.body
       if(!name){
        return response.status(400).send("name must be needed")
       }
       if(!age){
        return response.status(400).send("age must be needed")
       }
       if(!gender){
        return response.status(400).send("gender must be needed")
       }
       if(!phoneNumber){
        return response.status(400).send("phoneNumber must be needed")
       }
       
      await User.create({ name, age, gender, phoneNumber })
        response.status(202).send("user registered successfully")
    } catch (error) {
     response.status(500).send(error.message)   
    }
    
}