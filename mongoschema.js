const mongoose = require("mongoose");
const fs = require("fs");

// تحميل متغيرات البيئة من .env لو موجود
if (fs.existsSync('.env')) {
  require('dotenv').config();
}

// الاتصال بقاعدة البيانات
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/comp";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// سكيم الأخبار
const NewsSchem = new mongoose.Schema({
  title: String,
  content: String,
  short: String
});

// سكيم المستخدمين
const LoginSchem = new mongoose.Schema({
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
}, {
  timestamps: true
});

// النماذج
const Composer = mongoose.model("Composer", NewsSchem);
const User = mongoose.model("User", LoginSchem);

// التصدير
module.exports = { Composer, User };
