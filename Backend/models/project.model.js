import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const projectSchema = new Schema(
    {
        username:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        projectID: {
            type: Number,
            default: 0,
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
            type: String,   
        },
    },{
        timestamps:true
    }
)
projectSchema.plugin(mongooseAggregatePaginate)
const Project = mongoose.model("Project", projectSchema) 
export default Project