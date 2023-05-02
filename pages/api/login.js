import User from '@/models/User'
import initDB from '@/helpers/InitDB'
import crypto from 'crypto';
import jwtToken from '@/lib/jwtToken';

initDB();


export default async (req,res)=>{


   await User.findOne({username:req.body.username}).then( async(user)=>{
    try {
      const inputHash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex');
      if(user.hash==inputHash){
        const token =  await jwtToken(user);
        res.json({success:true,token})
      }else res.json({success:false})
   
    } catch (error) {
      res.json({success:false})
    }
   })

}

