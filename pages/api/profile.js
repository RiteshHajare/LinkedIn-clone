import loggedIn from "@/middleware/loggedIn";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import nextConnect from 'next-connect';

const handler = nextConnect();
    
handler.use(loggedIn).get(async(req,res)=>{
    // const fieldsToRetrieve = [ "firstName", "lastName", "image","headline"];
    // const user =  await User.findById(req.userId);
    // console.log(req.userId );
    
    const fieldsToRetrieveAll = ["username", "firstName", "lastName", "image","headline"];
    const users = await User.find({ _id: { $ne: req.userId } },fieldsToRetrieveAll);

    res.json(users);
}).post(async (req, res) => {
  const { link, type } = req.body;
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (type === "myimg") {
    user.image = link;
  } else {
    user.bgimg = link;
  }

  user.save()
    .then(() => {
      res.json({ success: true, message: `${type} saved successfully` });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to save image" });
    });
})

export default handler;