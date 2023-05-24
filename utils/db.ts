import mongoose from "mongoose";

let isConnected = false // track the connection status
const mongoDbURI = (process.env.MONGODB_URI) as string

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(mongoDbURI, {
            dbName : "share_prompt",
            // @ts-ignore
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })

        isConnected = true
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error)
    }
}