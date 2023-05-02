import Post from "@/models/Post";
import jwt from 'jsonwebtoken';

const { default: initDB } = require("@/helpers/InitDB");

initDB();


export default async (req,res)=>{
    const{body,type,link,date}=req.body;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
           
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            console.log(e);
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
   
        const post = new Post({
            body,
            type,
            media:link,
            userID:userId,
            time:date.toString()
        })
        post.save().then(()=>{
            res.json({success:true})
        },()=>{
            res.json({success:false})
        })
    }

   
}