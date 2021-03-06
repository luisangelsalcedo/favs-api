import mongoose from "mongoose";
import { errorResponse } from "./../utils/index.js";

const Schema = mongoose.Schema;
const favsSchema = new Schema(
  {
    name: { type: String, trim: true, required: [true, "is required"] },
    list: [
      {
        title: {
          required: [true, "item title is required"],
          type: String,
          minLength: 2,
        },
        description: { type: String },
        link: { type: String },
      },
    ],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
/**
 * * validate
 */
favsSchema.path("name").validate({
  async validator(name) {
    return mongoose
      .model("Favs")
      .findOne({ name })
      .then(favs => !favs);
  },
  message: "is already taken",
});
/**
 * * statics
 */
favsSchema.statics.findAll = async function (req) {
  const { id } = req.auth;
  const arr = await this.find({ owner: id });
  if (!arr.length) throw errorResponse(204);
  return arr;
};
/**
 *
 *
 */
const favsModel = mongoose.model("Favs", favsSchema);
export default favsModel;
