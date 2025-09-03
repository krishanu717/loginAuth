const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//cors errors
const cors = require("cors"); 

const { signup,  signin } = require("./AuthController");


dotenv.config();
const app = express();

// middleware
app.use(express.json());

//cors calls
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"], 
    methods: ["GET", "POST"],
    credentials: true 
}));
// connect to MongoDB
const connect = async ()=> {
  try {
    await  mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB ready!")
    
  } catch (error) {
    console.error("Falied connection", error.message);
  } 
}


// direct controller calls without routes
app.post("/signup", signup);
app.post("/signin", signin);

app.get("/", (req, res) => {
  res.send(" running!!!");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () =>{ console.log(`Server running on port ${PORT}`)
await connect();});
