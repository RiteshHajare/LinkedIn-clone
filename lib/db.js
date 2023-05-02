import User from '@/models/User';
import crypto from 'crypto';

export async function createUser( { username, password }) {
    // Here you should create the user and save the salt and hashed password (some dbs may have
    // authentication methods that will do it for you so you don't have to worry about it):
    const salt = await crypto.randomBytes(16).toString('hex');
    const hash = await crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    const user = new User({
      username,
      hash,
      salt,
    });

    await user.save();
    return user;
    // Here you should insert the user into the database
    // await db.createUser(user)
  }

export async function findUserByUsername( username) {
    // Here you find the user based on id/username in the database
    try {
        const user = await User.findOne({username});
    
        if(user) return user;
    } catch (error) {
        return false;
    }
    
    
   
    //  User.findOne({username},(user)=>{
    //     console.log("user",user);
    //     if(user) return true;
    //     else return false;
    // });
}

export function validatePassword(user, inputPassword) {
    const inputHash = crypto
      .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
      .toString('hex');
    const passwordsMatch = user.hash === inputHash;
    return passwordsMatch;
  }
  