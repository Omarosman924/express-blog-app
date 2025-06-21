# 📝 Express Blog App (Dockerized)

A simple blog application built using Node.js, Express, MongoDB, and EJS – now containerized with Docker & Docker Compose, and integrated with a CI pipeline using GitHub Actions.

---

## 🚀 Features

- ✍️ Create, edit, and delete blog posts  
- 👥 User registration and login with hashed passwords (bcrypt)  
- 🧠 Session-based authentication using `express-session`  
- 📄 Server-side rendering with EJS templates  
- 🐳 Docker & Docker Compose support for easy setup  
- 📦 MongoDB database containerized with persistent volume  
- ✅ Environment variables support via `.env` or `Dockerfile`    
- ⚙️ CI pipeline with GitHub Actions  

---

## 🛠️ Tech Stack

- Node.js + Express  
- MongoDB (Docker container)  
- EJS Templating  
- Docker & Docker Compose  
- bcrypt for password hashing  
- GitHub Actions (CI)

---

## ⚙️ Environment Variables

Ensure these variables are set in `.env` or through your container environment:

```env
PORT=3000
SESSION_SECRET=yourSecretKey
MONGODB_URI=mongodb://mongo:27017/comp
```

---

## 🐳 Docker Compose Setup

```bash
# Clone the repo
git clone https://github.com/Omarosman924/express-blog-app.git
cd express-blog-app

# Build and start containers
docker compose up --build
```

🟢 This will:
- Run the app on `http://localhost:3000`
- Start MongoDB on port `27017` with volume persistence

---

## ⚙️ Continuous Integration (CI Pipeline)

This project includes an automated CI pipeline built using **GitHub Actions**.

On every push or pull request to the `main` branch, the following steps are executed:

1. ✅ Checkout the latest code from GitHub  
2. 🐳 Build the Docker containers using `docker-compose`  
3. 🚀 Start the app and MongoDB containers in the background  
4. ⏱ Wait briefly for the services to initialize  
5. 📡 Send a test HTTP request to the app using `curl`  
6. 🧹 Clean up by stopping and removing containers  

This ensures that any change pushed to the repo is immediately tested in a clean, reproducible Docker environment — helping catch bugs early.

---

## 📁 Folder Structure

```
express-blog-app/
├── views/             # EJS templates
├── public/            # Static assets (CSS, JS)
├── mongoschema.js     # MongoDB schemas
├── app.js             # Express entry point
├── Dockerfile         # App Docker container
├── docker-compose.yml
├── package.json
├── .env               # (optional)
└── README.md
```

---

## 👤 Author

**Omar Osman**  
GitHub: [@Omarosman924](https://github.com/Omarosman924)

---

## 📌 About

A fullstack blog app built with Node.js, Express, MongoDB, and EJS.  
Includes authentication, CRUD for blog posts, containerization with Docker, and a working CI pipeline — ideal for learning fullstack development with DevOps practices.
