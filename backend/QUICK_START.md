# 🎯 Quick Start Guide

## Prerequisites Checklist

Before running the backend, ensure you have:

- [ ] Node.js 16+ installed
- [ ] MongoDB Atlas account created
- [ ] Gmail account with 2FA enabled
- [ ] Gmail App Password generated

---

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (Already Done ✅)

```bash
cd backend
npm install
```

### Step 2: Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

### Step 3: Edit .env File

**REQUIRED** - Update these values in `.env`:

```env
# MongoDB Connection (from MongoDB Atlas)
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/portfolio

# JWT Secrets (generate with: PORT=5000
JWT_SECRET=)
JWT_SECRET=paste_generated_secret_here
JWT_REFRESH_SECRET=paste_different_secret_here

# Gmail Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password

# Admin Email (where contact form notifications go)
ADMIN_EMAIL=your_email@gmail.com

# Frontend URL (update after deploying frontend)
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Don't have these yet?** See detailed setup in [`DEPLOYMENT.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/DEPLOYMENT.md)

### Step 4: Start the Server

```bash
npm run dev
```

You should see:

```
✅ MongoDB Connected: cluster.mongodb.net
🚀 Server running on port 5000 in development mode
```

### Step 5: Test Health Check

Open browser or Postman:

```
http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running!",
  "timestamp": "2025-12-01T12:00:00.000Z",
  "environment": "development"
}
```

---

## 🎬 First Steps After Server Starts

### 1. Create Admin Account

Open Postman and send:

```http
POST http://localhost:5000/api/admin/register
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your-email@example.com",
  "password": "YourSecurePassword123"
}
```

**Save the tokens returned!**

### 2. Disable Registration

Immediately after registration, follow:
[`DISABLE_REGISTRATION.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/DISABLE_REGISTRATION.md)

### 3. Test All Endpoints

Follow complete testing guide:
[`POSTMAN_TESTING.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/POSTMAN_TESTING.md)

---

## 📁 Project Files

| File                                                                                                 | Purpose                |
| ---------------------------------------------------------------------------------------------------- | ---------------------- |
| [`README.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/README.md)                             | Complete documentation |
| [`POSTMAN_TESTING.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/POSTMAN_TESTING.md)           | API testing guide      |
| [`DISABLE_REGISTRATION.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/DISABLE_REGISTRATION.md) | Security instructions  |
| [`DEPLOYMENT.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/DEPLOYMENT.md)                     | Production deployment  |
| [`.env.example`](file:///c:/MERN%20Stack/musab-portfolio/backend/.env.example)                       | Environment template   |

---

## 🐛 Common Issues

### "Cannot connect to MongoDB"

**Cause**: Invalid MONGODB_URI or IP not whitelisted

**Solution**:

1. Check MongoDB Atlas connection string is correct
2. Whitelist `0.0.0.0/0` in Network Access
3. Verify username/password in connection string

### "EMAIL_USER is not defined"

**Cause**: Missing .env file or variables

**Solution**:

1. Make sure `.env` exists in `backend/` directory
2. Check all required variables are set
3. Restart server after editing `.env`

### "Gmail authentication failed"

**Cause**: Using regular password instead of App Password

**Solution**:

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password (16 characters)
3. Use App Password in `EMAIL_PASSWORD`, not regular password

### "CORS error from frontend"

**Cause**: Frontend URL not in CLIENT_URL

**Solution**:

1. Add frontend URL to `CLIENT_URL` in `.env`
2. Multiple origins: `CLIENT_URL=http://localhost:5173,http://localhost:3000`
3. Restart server

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Server starts without errors
- [ ] Health endpoint returns 200
- [ ] MongoDB connection successful
- [ ] Admin registration works
- [ ] Login returns tokens
- [ ] Contact form sends email
- [ ] Projects API accessible
- [ ] Documentation reviewed

---

## 🚀 Ready to Deploy?

See complete deployment guide:
[`DEPLOYMENT.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/DEPLOYMENT.md)

Supports:

- ✅ Render (Recommended)
- ✅ Railway
- ✅ Heroku

---

## 📞 Need Help?

1. Check [`README.md`](file:///c:/MERN%20Stack/musab-portfolio/backend/README.md) troubleshooting section
2. Review error logs in terminal
3. Verify all environment variables are set correctly
4. Check MongoDB Atlas is running

---

**Backend Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: December 2025
