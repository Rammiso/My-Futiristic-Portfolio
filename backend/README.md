# 🚀 Musab Portfolio Backend - Production-Ready MERN API

Complete production-grade backend for a futuristic MERN portfolio with admin system, contact form, and project management.

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

### 🔐 Admin Authentication System

- **One-time registration** (disabled after first use)
- JWT-based authentication with **access tokens** (30min) and **refresh tokens** (7 days)
- Secure login with bcrypt password hashing
- Rate limiting to prevent brute force attacks
- Logout functionality with token invalidation

### 📬 Contact Form System

- Public contact form submission
- **Automatic email notifications** to admin
- MongoDB storage with IP tracking
- Admin dashboard to view/delete messages
- Rate limiting to prevent spam (5 submissions per hour)

### 📁 Project Management (CRUD)

- Create, Read, Update, Delete projects
- **Automatic SEO-friendly slug generation** from titles
- Filter by featured status and category
- Public API for frontend consumption
- Admin-protected create/update/delete operations

### 🛡️ Enterprise-Grade Security

- **Helmet.js** - Security HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **MongoDB Injection Protection** - express-mongo-sanitize
- **XSS Protection** - xss-clean
- **Rate Limiting** - Prevent abuse and DDoS
- **Input Sanitization** - Custom middleware
- **Trust Proxy** - For deployment behind proxies

---

## 🛠️ Tech Stack

| Category             | Technology                                      |
| -------------------- | ----------------------------------------------- |
| **Runtime**          | Node.js                                         |
| **Framework**        | Express.js                                      |
| **Database**         | MongoDB (Mongoose ODM)                          |
| **Authentication**   | JWT (jsonwebtoken)                              |
| **Password Hashing** | bcryptjs                                        |
| **Email**            | Nodemailer (Gmail SMTP)                         |
| **Security**         | Helmet, CORS, express-mongo-sanitize, xss-clean |
| **Rate Limiting**    | express-rate-limit                              |
| **Validation**       | express-validator                               |
| **Logging**          | Morgan                                          |

---

## 📂 Project Structure

```
backend/
├── config/
│   ├── db.js                 # MongoDB connection
│   ├── email.js              # Nodemailer configuration
│   └── jwtHelper.js          # JWT token utilities
├── controllers/
│   ├── authController.js     # Admin auth logic
│   ├── contactController.js  # Contact form logic
│   └── projectController.js  # Project CRUD logic
├── middleware/
│   ├── auth.js               # JWT authentication
│   ├── errorHandler.js       # Global error handler
│   ├── rateLimiter.js        # Rate limiting configs
│   └── sanitize.js           # Input sanitization
├── models/
│   ├── User.js               # Admin user model
│   ├── Contact.js            # Contact message model
│   └── Project.js            # Project model
├── routes/
│   ├── auth.js               # Admin routes
│   ├── contact.js            # Contact routes
│   └── projects.js           # Project routes
├── .env.example              # Environment variables template
├── server.js                 # Express app + server
├── package.json              # Dependencies
├── POSTMAN_TESTING.md        # API testing guide
├── DISABLE_REGISTRATION.md   # Security instructions
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Gmail account (for email notifications)

### 1. Clone & Install

```bash
cd backend
npm install
```

### 2. Environment Setup

Create `.env` file from template:

```bash
cp .env.example .env
```

Edit `.env` with your credentials (see [Environment Variables](#-environment-variables))

### 3. Start Server

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server runs on `http://localhost:5000`

### 4. Create Admin Account

Use Postman to register admin (see `POSTMAN_TESTING.md`):

```http
POST http://localhost:5000/api/admin/register
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your-email@example.com",
  "password": "YourSecurePassword123"
}
```

### 5. Disable Registration

After creating admin, follow instructions in `DISABLE_REGISTRATION.md`

---

## 🔧 Environment Variables

Complete list of required environment variables:

### Server Configuration

```env
PORT=5000
NODE_ENV=development
```

### Database

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### JWT Authentication

```env
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
JWT_ACCESS_EXPIRE=30m
JWT_REFRESH_EXPIRE=7d
```

### Email Configuration

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=Musab Portfolio <your-email@gmail.com>
ADMIN_EMAIL=your-email@gmail.com
```

### Frontend

```env
CLIENT_URL=http://localhost:5173
```

### Security

```env
ALLOW_REGISTRATION=true
```

> **Note**: See `.env.example` for detailed comments and instructions

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication Routes

| Method | Endpoint          | Auth      | Description               |
| ------ | ----------------- | --------- | ------------------------- |
| POST   | `/admin/register` | Public    | Register admin (one-time) |
| POST   | `/admin/login`    | Public    | Admin login               |
| POST   | `/admin/refresh`  | Public    | Refresh access token      |
| POST   | `/admin/logout`   | Protected | Logout admin              |
| GET    | `/admin/me`       | Protected | Get admin profile         |

### Contact Routes

| Method | Endpoint       | Auth      | Description         |
| ------ | -------------- | --------- | ------------------- |
| POST   | `/contact`     | Public    | Submit contact form |
| GET    | `/contact`     | Protected | Get all messages    |
| DELETE | `/contact/:id` | Protected | Delete message      |

### Project Routes

| Method | Endpoint          | Auth      | Description         |
| ------ | ----------------- | --------- | ------------------- |
| GET    | `/projects`       | Public    | Get all projects    |
| GET    | `/projects/:slug` | Public    | Get project by slug |
| POST   | `/projects`       | Protected | Create project      |
| PUT    | `/projects/:id`   | Protected | Update project      |
| DELETE | `/projects/:id`   | Protected | Delete project      |

### Example Requests

**Login:**

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

**Create Project:**

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "My Project",
    "description": "Amazing project",
    "technologies": ["React", "Node.js"]
  }'
```

> **Full API documentation**: See `POSTMAN_TESTING.md`

---

## 🔒 Security

### Implemented Security Measures

✅ **Helmet.js** - Sets security HTTP headers  
✅ **CORS** - Configured for specific origins  
✅ **Rate Limiting** - Prevents brute force and spam  
✅ **MongoDB Injection Protection** - Sanitizes queries  
✅ **XSS Protection** - Cleans user input  
✅ **Input Validation** - Validates all user data  
✅ **Password Hashing** - bcrypt with salt rounds  
✅ **JWT Tokens** - Secure authentication  
✅ **HTTPS** - Enforced in production  
✅ **Environment Variables** - Sensitive data protected

### Rate Limits

| Endpoint           | Limit                     |
| ------------------ | ------------------------- |
| Admin Registration | 2 attempts / 24 hours     |
| Admin Login        | 5 attempts / 15 minutes   |
| Contact Form       | 5 submissions / hour      |
| General API        | 100 requests / 15 minutes |

---

## 🧪 Testing

### Using Postman

Complete testing guide available in `POSTMAN_TESTING.md`

Quick test:

1. **Health Check:**

   ```
   GET http://localhost:5000/api/health
   ```

2. **Register Admin:**

   ```
   POST /api/admin/register
   ```

3. **Login:**

   ```
   POST /api/admin/login
   ```

4. **Create Project:**
   ```
   POST /api/projects (with Bearer token)
   ```

See `POSTMAN_TESTING.md` for all 13 test cases with expected responses.

---

## 🌐 Deployment

### Platforms Supported

- ✅ **Render** (Recommended)
- ✅ **Railway**
- ✅ **Heroku**
- ✅ **Vercel** (Serverless)

### Quick Deploy to Render

1. Push code to GitHub
2. Create account at [render.com](https://render.com)
3. New Web Service → Connect repo
4. Add environment variables
5. Deploy

**Full deployment guide**: See `DEPLOYMENT.md`

### Post-Deployment Checklist

- [ ] Backend URL accessible
- [ ] Health endpoint returns 200
- [ ] Admin login works
- [ ] Contact form sends email
- [ ] CORS allows frontend
- [ ] HTTPS enabled
- [ ] Registration disabled

---

## 🎯 Scripts

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start

# Install dependencies
npm install
```

---

## 📁 Important Files

| File                      | Purpose                        |
| ------------------------- | ------------------------------ |
| `POSTMAN_TESTING.md`      | Complete API testing guide     |
| `DISABLE_REGISTRATION.md` | Security instructions          |
| `DEPLOYMENT.md`           | Production deployment guide    |
| `.env.example`            | Environment variables template |

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

- Check `MONGODB_URI` is correct
- Whitelist IP `0.0.0.0/0` in MongoDB Atlas
- Verify database user credentials

### Email Not Sending

- Use Gmail **App Password**, not regular password
- Enable 2-Factor Authentication on Gmail
- Check `EMAIL_USER` and `EMAIL_PASSWORD`

### CORS Errors

- Add frontend URL to `CLIENT_URL` in `.env`
- Restart server after changes
- Check browser console for exact origin

### Rate Limit Blocking

- Wait for window to reset
- Reduce test frequency
- Adjust limits in `middleware/rateLimiter.js`

---

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

---

## 📄 License

MIT License - feel free to use for your own portfolio

---

## 🎉 Acknowledgments

Built with ❤️ using the MERN stack

---

## 📞 Contact

For issues or questions, submit via the contact form when deployed!

---

**Backend Status**: ✅ Production Ready

**Version**: 1.0.0

**Last Updated**: December 2025
