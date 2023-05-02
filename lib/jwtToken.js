import jwt from 'jsonwebtoken';


export default async function jwtToken(user){
    const token = jwt.sign({
        id:user._id
      }, process.env.JWT_SECRET, { expiresIn: '3d' });
      return token;
}