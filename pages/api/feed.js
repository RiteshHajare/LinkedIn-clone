import Post from "@/models/Post";
import User from "@/models/User";
import loggedIn from "@/middleware/loggedIn";
import nextConnect from 'next-connect';

const handler=nextConnect()

handler.use(loggedIn).get(async(req,res)=>{
    const reqFields=["firstName","lastName","headline","image","bgimg","username"];
   const posts = await Post.find({}).populate("userID");
   const self = await User.findById(req.userId,reqFields);
   res.json({posts,self});
});
export default handler;