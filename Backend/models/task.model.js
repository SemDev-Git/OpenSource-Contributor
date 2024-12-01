import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const taskSchema=new Schema(
    {
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        taskId:{
            type: Schema.Types.ObjectId,
            ref:"Project"
        },
        detail:{
            type:String,
            required:true
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Assigned'],
            default: 'Pending',
          },
    },{
        timestamps:true
    }
)
taskSchema.plugin(mongooseAggregatePaginate)
export const Task = mongoose.model("Task", taskSchema) 