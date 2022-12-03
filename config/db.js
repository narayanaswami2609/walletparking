import mongoose from "mongoose";

const configDb = async (uri) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
            retryWrites: false
        })
        console.log(`MongoDB connected successfully...`)
    } catch (error) {
        console.log(error.message);
        

    }
}

export default configDb;