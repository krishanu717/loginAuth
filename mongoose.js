
const mongoose = require ('mongoose');
require('dotenv').config();
 const connectDB =async () =>{ 
    try{
    await mongoose.connect(process.env.MONGO_URL);
}
catch (err){
    console.log("Not able to connect",err.message);
    process.exit(1);

}}
module.exports = connectDB;

