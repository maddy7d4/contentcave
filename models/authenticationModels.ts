import mongoose, { model, models } from "mongoose";

export const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const userModel = models.User || model('User',userSchema);

export default userModel