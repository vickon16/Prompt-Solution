import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email : {
        type : String,
        unique : [true, "Email already exists!"],
        required : [true, "Email is required!"],
    },
    userName : {
        type : String,
        required : [true, "Username is required!"],
        match : [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image : {
        type : String
    },
})

// use existing model "User" if already exist, else create a new model "User"
const User = models.User || model("User", UserSchema);

export default User;