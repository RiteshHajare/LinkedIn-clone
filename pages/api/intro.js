import loggedIn from "@/middleware/loggedIn";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import nextConnect from 'next-connect';

const handler=nextConnect()
    
handler.use(loggedIn).get(async(req,res)=>{
    const user =  await User.findById(req.userId);
    res.json({firstname:user.firstName,lastname:user.lastName,headline:user.headline,city:user.city,image:user.image,bgimg:user.bgimg});
}).post(async(req,res)=>{
    // console.log(req.body,req.userId);
    const user = await User.findById(req.userId);
    user.headline=req.body.headline;
    user.firstName=req.body.firstname;
    user.lastName=req.body.lastname;
    user.city=req.body.city;
    user.save().then(()=>{
        res.json({success:true,message:"Saved in DB successfully"});
    })
    
    
})

export default handler;