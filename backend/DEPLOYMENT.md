# 🚀 Deployment Guide - MERN Portfolio Backend

Complete guide to deploy your backend to production.

## 📋 Pre-Deployment Checklist

- [ ] Admin account created and tested
- [ ] Registration route disabled
- [ ] All environment variables documented
- [ ] MongoDB database created
- [ ] Gmail App Password generated
- [ ] Code tested locally
- [ ] Code pushed to GitHub

---

## 🌐 Option 1: Deploy to Render (Recommended)

Render offers free hosting for Node.js backends with automatic HTTPS.

### Step 1: Create MongoDB Atlas Database (if not done)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster (Free tier)
4. Create database user
5. Whitelist all IPs: `0.0.0.0/0`
6. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### Step 2: Push Code to GitHub

```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio-backend.git
git push -u origin main
```

### Step 3: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**

### Step 4: Connect Repository

1. Select your GitHub repository
2. Click **"Connect"**

### Step 5: Configure Service

**Name**: `musab-portfolio-backend`

**Region**: Choose closest to your users

**Branch**: `main`

**Root Directory**: Leave empty (or `backend` if monorepo)

**Environment**: `Node`

**Build Command**:

```bash
npm install
```

**Start Command**:

```bash
npm start
```

**Instance Type**: `Free`

### Step 6: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add all variables from `.env.example`:

| Key                  | Value                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `NODE_ENV`           | `production`                                                                              |
| `MONGODB_URI`        | Your MongoDB Atlas connection string                                                      |
| `JWT_SECRET`         | Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `JWT_REFRESH_SECRET` | Different secret from JWT_SECRET                                                          |
| `JWT_ACCESS_EXPIRE`  | `30m`                                                                                     |
| `JWT_REFRESH_EXPIRE` | `7d`                                                                                      |
| `EMAIL_HOST`         | `smtp.gmail.com`                                                                          |
| `EMAIL_PORT`         | `587`                                                                                     |
| `EMAIL_USER`         | Your Gmail address                                                                        |
| `EMAIL_PASSWORD`     | Gmail App Password (16 characters)                                                        |
| `EMAIL_FROM`         | `Musab Portfolio <your-email@gmail.com>`                                                  |
| `ADMIN_EMAIL`        | Your email to receive notifications                                                       |
| `CLIENT_URL`         | Your frontend URL (e.g., `https://musab-portfolio.vercel.app`)                            |
| `ALLOW_REGISTRATION` | `false`                                                                                   |

### Step 7: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (2-5 minutes)
3. Get your backend URL: `https://musab-portfolio-backend.onrender.com`

### Step 8: Test Deployment

Open: `https://your-backend.onrender.com/api/health`

Response should be:

```json
{
  "success": true,
  "message": "Server is running!",
  "environment": "production"
}
```

---

## 🚂 Option 2: Deploy to Railway

Railway offers excellent free tier with PostgreSQL and Redis if needed.

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

### Step 3: Initialize Project

```bash
cd backend
railway init
```

Choose:

- **Project name**: `musab-portfolio-backend`
- **Link to existing project**: No (create new)

### Step 4: Add Environment Variables

Create `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Add variables via Railway dashboard or CLI:

```bash
railway variables set NODE_ENV=production
railway variables set MONGODB_URI=your_mongodb_uri
railway variables set JWT_SECRET=your_jwt_secret
# Add all other variables from .env.example
```

### Step 5: Deploy

```bash
railway up
```

Get your URL:

```bash
railway domain
```

---

## ☁️ Option 3: Deploy to Heroku

### Step 1: Install Heroku CLI

Download from [heroku.com/downloads](https://devcenter.heroku.com/articles/heroku-cli)

### Step 2: Login

```bash
heroku login
```

### Step 3: Create App

```bash
cd backend
heroku create musab-portfolio-backend
```

### Step 4: Add Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set JWT_REFRESH_SECRET="your_refresh_secret"
# Add all other variables
```

### Step 5: Deploy

```bash
git push heroku main
```

### Step 6: Open App

```bash
heroku open
```

---

## 🎨 Frontend Deployment (Vercel/Netlify)

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your frontend repository
3. Framework: **Vite** or **React**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
7. Deploy

### Update Backend CORS

After frontend deployment, update `CLIENT_URL` in backend:

```env
CLIENT_URL=https://your-frontend.vercel.app
```

Redeploy backend.

---

## 📧 Gmail App Password Setup

**CRITICAL**: Don't use your regular Gmail password!

### Step 1: Enable 2-Step Verification

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Click **"2-Step Verification"**
3. Enable it

### Step 2: Generate App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **"Mail"** and **"Other (Custom name)"**
3. Enter: **"Portfolio Backend"**
4. Click **"Generate"**
5. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
6. Remove spaces: `xxxxxxxxxxxxxxxx`
7. Use this as `EMAIL_PASSWORD` in environment variables

---

## 🔒 Security Best Practices

### 1. Environment Variables

✅ **Never** commit `.env` to GitHub

```bash
# Make sure .env is in .gitignore
echo ".env" >> .gitignore
```

### 2. HTTPS Only

All production platforms (Render, Railway, Heroku) provide free HTTPS ✅

### 3. Rate Limiting

Already configured in code ✅

### 4. MongoDB IP Whitelist

For production, whitelist only your backend server IP (or use `0.0.0.0/0` for easier setup)

### 5. Strong Secrets

Generate strong JWT secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧪 Testing Production Deployment

### 1. Health Check

```bash
curl https://your-backend.onrender.com/api/health
```

### 2. Test Login

```bash
curl -X POST https://your-backend.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"YourPassword123"}'
```

### 3. Test CORS

Open your frontend → Submit contact form → Check if request succeeds

---

## 📊 Monitoring & Logs

### Render Logs

1. Go to Render Dashboard
2. Click your service
3. Click **"Logs"** tab
4. Real-time logs appear here

### Railway Logs

```bash
railway logs
```

### Heroku Logs

```bash
heroku logs --tail
```

---

## 🔄 Continuous Deployment

All platforms support auto-deploy from GitHub:

### Enable Auto-Deploy (Render)

1. Go to service settings
2. **"Auto-Deploy"** → **"Yes"**
3. Every push to `main` branch auto-deploys

### Enable Auto-Deploy (Railway)

Enabled by default ✅

### Enable Auto-Deploy (Heroku)

```bash
heroku git:remote -a your-app-name
git push heroku main
```

---

## 🐛 Troubleshooting

### Issue: "Application Error"

**Solution**: Check logs for errors. Usually missing environment variables.

### Issue: "Cannot connect to MongoDB"

**Solution**:

- Check MongoDB URI is correct
- Whitelist IP `0.0.0.0/0` in MongoDB Atlas
- Check username/password are URL-encoded

### Issue: "CORS Error"

**Solution**:

- Add frontend URL to `CLIENT_URL` environment variable
- Restart backend service

### Issue: "Email not sending"

**Solution**:

- Check Gmail App Password (not regular password)
- Enable 2FA on Gmail
- Check `EMAIL_USER` and `EMAIL_PASSWORD` are correct

---

## ✅ Post-Deployment Checklist

- [ ] Backend URL accessible
- [ ] Health check returns 200
- [ ] Admin login works
- [ ] Contact form sends email
- [ ] Projects API returns data
- [ ] CORS allows frontend requests
- [ ] HTTPS enabled (automatic on all platforms)
- [ ] Environment variables set correctly
- [ ] Logs show no errors
- [ ] Frontend connected to backend
- [ ] Registration route disabled

---

## 🎉 You're Live!

Your backend is now deployed and ready for production!

**Next Steps**:

1. Monitor logs for any issues
2. Test all features thoroughly
3. Set up custom domain (optional)
4. Configure email alerts for errors

---

## 📚 Additional Resources

- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Nodemailer Gmail Guide](https://nodemailer.com/usage/using-gmail/)
