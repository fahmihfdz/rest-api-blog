# REST API BLOG

REST API sederhana untuk sistem blog menggunakan Node.js, Express, dan MongoDB Atlas dengan fitur Authentication JWT.
API ini memungkinkan pengguna untuk melakukan register, login, membuat post, melihat post, update post, dan delete post.
Project ini dibuat sebagai latihan Backend Development dan digunakan sebagai project portfolio.

## Tech Stack
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
Postman (untuk testing API)

## Features
User Authentication (Register & Login)
JWT Token Authorization
Create Post
Get All Posts
Get Post by ID
Update Post
Delete Post
MongoDB Atlas Database 

## Project Structure
rest-api-blog
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   └── postController.js
│
├── middleware
│   └── authMiddleware.js
│
├── models
│   ├── User.js
│   └── Post.js
│
├── routes
│   ├── authRoutes.js
│   └── postRoutes.js
│
├── .env
├── server.js
└── package.json

## Installation
1. Clone Repository : git clone https://github.com/username/rest-api-blog.git
2. Masuk ke folder project : cd rest-api-blog
3. Install dependencies : npm install

## Environment Variables
Buat file .env 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## Run Server
npm run dev
api berjalan di "http://localhost:5000"

## API Endpoints
- Authentication
  Register : POST /api/auth/register
  Body :
  {
  "name": "Fahmi",
  "email": "fahmi@email.com",
  "password": "123456"
  }

  Login : POST /api/auth/login
  Body :
  {
  "email": "fahmi@email.com",
  "password": "123456"
  }

  Posts: POST /api/posts
  Headers : Authorization: Bearer <token>
  Body :
  {
  "title": "Belajar REST API",
  "content": "Ini adalah contoh post dari REST API."
  }

  Get All : GET /api/posts
  Get posts by ID : GET /api/posts/:id
  Update Post : PUT /api/posts/:id
  Delete post : DELETE /api/posts/:id

  ## API Testing
  API dapat diuji menggunakan:
  - Postman
  Contoh testing:
  - Register user
  - Login user
  - Copy token JWT
  - Gunakan token untuk membuat post
 
  ## Database
  Project ini menggunakan:
  - MongoDB Atlas
  Database disimpan di cloud dan dihubungkan menggunakan connection string.

## API Example
Create Post Response :
{
  "_id": "66123abc123",
  "title": "Belajar REST API",
  "content": "Ini adalah contoh post",
  "author": "Fahmi",
  "createdAt": "2026-04-29"
}

## Author
M.Fahmi Hafidz B
Portfolio:
GitHub: https://github.com/fahmihfdz

## License
Project ini dibuat untuk keperluan pembelajaran dan portfolio.
