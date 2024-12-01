import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const projectSchema=new Schema(
    {
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        guidelines:{
            type:String,

        },
        gitlink:{
            type: String,//Git url    
        },
    },{
        timestamps:true
    }
)
projectSchema.plugin(mongooseAggregatePaginate)
export const Project = mongoose.model("Project", projectSchema) 