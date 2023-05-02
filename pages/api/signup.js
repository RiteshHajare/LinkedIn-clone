import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { getAllUsers, createUser, findUserByUsername } from '../../lib/db'
import initDB from '@/helpers/InitDB'
import jwtToken from '@/lib/jwtToken';

initDB();	
const handler = nextConnect()

handler
  .use(auth)
  // .get((req, res) => {
  //      For demo purpose only. You will never have an endpoint which returns all users.
  //      Remove this in production
  //   res.json({ users: getAllUsers(req) })
  // })
  .post(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password ) {
      return res.status(400).json({error:'username or password not given'})
    }


   
    const usernameExisted = await findUserByUsername(username);
    
    if (usernameExisted) {
      return res.json({error:'The username has already been used'})
    }
    const user = { username, password}
  
    const userInDB = await createUser(user)
    try {
      
      await req.logIn(user, async(err) => {
        if (err) res.status(201).json({err,success:false});
        const token = await jwtToken(userInDB);
        
        await res.status(201).json({
          user:user.username,success:true,token
        })
      })
    } catch (error) {
      console.log(error);
    }
  })

export default handler
