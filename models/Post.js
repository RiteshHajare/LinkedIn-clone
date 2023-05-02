import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    body:String,
    media:String,
    type:String,
    like:[{
        type:String,
        default:null
    }],
    time:String
},{
    timestamps:true
})

export default mongoose.models.Post || mongoose.model("Post",postSchema)

