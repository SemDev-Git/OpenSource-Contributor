import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const taskSchema = new Schema(
  {
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    projectID: {
      type: Number,
      default: 0,
    },
    detail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Assigned"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(mongooseAggregatePaginate);
const Task = mongoose.model("Task", taskSchema);
export default Task;