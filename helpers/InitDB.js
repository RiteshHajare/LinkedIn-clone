import mongoose  from "mongoose";

function initDB(){
    if(mongoose.connections[0].readyState){
        console.log('already connected');
        return;
    }
    // 'mongodb://localhost:27017/linkedin'
    mongoose.set("strictQuery", false);
    mongoose. connect(process.env.MONGOURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on("connected",()=>{
        console.log("mongoose connected");
    })

    mongoose.connection.on("error",(err)=>{
        console.log("error in connecting to mongoose",err);
    })

}

export default initDB;