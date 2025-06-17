const mongoose = require("mongoose")
mongoose.connect("mongodb://192.168.1.101:27017/comp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


const NewsSchem = new mongoose.Schema(
    {
        title : String ,
        content : String,
        short : String 
    }
);


const LoginSchem = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true


    },
    password: {
      type: String,
      required: true

    }

  },
  {
    timestamps: true
  }
)

const Composer = mongoose.model("Composer" ,NewsSchem );
const User = mongoose.model("User",LoginSchem ) ;
module.exports = {Composer , User};