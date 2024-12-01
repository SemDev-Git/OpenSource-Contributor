import mongoose,{Schema} from "mongoose";
const userSchema = new Schema(
    {
        username:{
            type: String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true,
            index:true //used to make field searchable in an optimize way
        },
        fullname:{
            type: String,
            required:true,
            trim: true,
            index:true
        },
        avatar:{
            type: String,//API AVATOR url
            required:true
        },
        like:{
            type: String
        },
        dislike:{
            type:String
        },
        progLang:{
            type:String
        },
        coreInterest:{
            type:String
        },
        hobbies:{
            type:String
        },
        projectAssign:{
            type:String
        },
        contributionsTotal:{
            type:Number,
            default:0

        },
        taskAssign: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Task',
            },
        ],

    },
    {
        timestamps:true //for created at and updated at
    }
)
export const User = mongoose.model("User", userSchema) 