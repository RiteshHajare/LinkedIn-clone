import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    },
    hash:{
        type:String,
        required:true
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    headline:{
        type:String
    },
    city:{
        type:String
    },
    image:{
        type:String,
        default:"/user.png"
    },
    bgimg: {
        type: String,
        default: "/defaultBGIMG.jpeg"
    },
    connections:{
        type:Number,
        default:0
    }
    
},{
    timestamps:true
})

export default mongoose.models.User || mongoose.model("User",userSchema)

