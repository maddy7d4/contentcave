import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    title: String,
    description: String,
    image: String,
},{toJSON: {virtuals: true}});

postSchema.virtual("short_desc").get(function() {
  return this.description ? this.description.substring(0, 50) + "..." : "";
});


const postModel = models.Post || model("Post", postSchema);

export default postModel;