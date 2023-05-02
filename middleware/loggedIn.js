import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';

const loggedIn=nextConnect()
    .use((req,res,next)=>{
        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1],
                decoded;
               
            try {
                decoded = jwt.verify(authorization, process.env.JWT_SECRET);
            } catch (e) {
                console.log(e);
                return res.status(401).send('unauthorized');
            }
            req.userId = decoded.id;
            next();
        }else{
            req.userId ="not loggedin";
            next();
        }
    })


export default loggedIn;