import { models, model } from "mongoose";
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
})

const enquiryModel = models.enquiry || model('enquiry',enquirySchema);

export default enquiryModel;