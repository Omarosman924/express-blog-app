# 📝 Express Blog App

A simple blog application built with **Node.js**, **Express**, and **MongoDB**, allowing users to register, log in, and create/manage blog posts with ease.

---

## 🚀 Features

- 🧾 User registration and login system  
- 🔐 Secure password hashing with `bcrypt`  
- ✍️ Create, edit, delete, and view blog posts  
- 💾 MongoDB database for users and posts  
- 🖥️ Dynamic pages rendered with EJS templates  
- 🔐 Session management using `express-session`

---

## 🛠️ Tech Stack

| Technology          | Purpose                            |
|---------------------|-------------------------------------|
| Node.js + Express   | Backend server and routing          |
| MongoDB + Mongoose  | Database and schema modeling        |
| bcrypt              | Password encryption                 |
| express-session     | Session management                  |
| EJS                 | Templating engine                   |
| Bootstrap (optional)| UI styling                          |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Omarosman924/express-blog-app-.git
cd express-blog-app-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MongoDB Connection

> 🔧 You **must update the MongoDB connection URI** in `mongoschema.js` or use environment variables.

Example in `mongoschema.js`:
```js
mongoose.connect("mongodb://localhost:27017/blogApp");
```

Replace with your own MongoDB URI if needed (local or Atlas).

### 4. Run the App

```bash
node app.js
# or with nodemon
nodemon app.js
```

Then open your browser and visit:

```
http://localhost:3000
```

---

## 📁 Project Structure

```
express-blog-app-/
├── app.js
├── mongoschema.js
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── ...
├── public/
│   └── css/
├── package.json
```

---

## 👤 Developer

- **Omar Osman**
- 🌐 [GitHub Profile](https://github.com/Omarosman924)

---

## 📜 License

This project is open source and free to use for learning and development purposes.
