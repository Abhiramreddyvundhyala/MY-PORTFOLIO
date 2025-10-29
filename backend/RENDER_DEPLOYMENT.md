# 🚀 Deploy to Render - Step by Step

## Why Render?
- ✅ Free tier with 750 hours/month
- ✅ Better for long-running servers (MongoDB connections)
- ✅ Automatic SSL
- ✅ Easy deployment
- ✅ No sleep on free tier initially

---

## 📋 Prerequisites

1. **GitHub Account** - To push code
2. **Render Account** - Sign up at render.com
3. **MongoDB Atlas** - Cloud database (we'll set up together)

---

## Step 1: Push Backend to GitHub (5 minutes)

### Create GitHub Repository (if not exists)
1. Go to: https://github.com/new
2. Name: `portfolio-backend`
3. Keep it **Public** or **Private**
4. Don't initialize with README
5. Click "Create repository"

### Push Backend Code

```powershell
# Navigate to backend folder
cd "c:\Users\ASUS\Desktop\PROJECTS\MY PORTOFILIO\backend"

# Initialize git
git init

# Add files (will not include .env due to .gitignore)
git add .

# Check what will be committed (should NOT show .env)
git status

# Commit
git commit -m "Portfolio backend for Render deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git

# Push
git push -u origin main
```

---

## Step 2: Deploy to Render (10 minutes)

### A. Sign Up / Login to Render
1. Go to: https://render.com
2. Click "Get Started"
3. Sign up with GitHub (easiest)

### B. Create New Web Service
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub account (if not already)
4. Find and select `portfolio-backend` repository
5. Click "Connect"

### C. Configure Web Service

**Basic Settings:**
- **Name:** `portfolio-backend` (or any name you want)
- **Region:** Choose closest to you (e.g., Singapore, Oregon)
- **Branch:** `main`
- **Root Directory:** Leave blank
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select: **Free** (750 hours/month)

**Advanced Settings - Environment Variables:**
Click "Add Environment Variable" for each:

1. **MONGODB_URI**
   - Value: `YOUR_MONGODB_ATLAS_CONNECTION_STRING`
   - (We'll get this in Step 3)

2. **EMAIL_USER**
   - Value: `abhiabhiramreddy32@gmail.com`

3. **EMAIL_PASSWORD**
   - Value: `btrm clpc prkb hdxx`

4. **NODE_ENV**
   - Value: `production`

### D. Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. Your service will be live at: `https://portfolio-backend-xxxx.onrender.com`

---

## Step 3: Setup MongoDB Atlas (5 minutes)

### A. Create Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Verify email

### B. Create Cluster
1. Click "Build a Database"
2. Choose **FREE** M0 tier
3. Select Cloud Provider: AWS (or any)
4. Region: Choose closest to your Render region
5. Cluster Name: `portfolio-cluster`
6. Click "Create"

### C. Create Database User
1. Choose "Username and Password"
2. Username: `portfolio_user`
3. Password: Click "Autogenerate Secure Password" (SAVE IT!)
4. Click "Create User"

### D. Whitelist IP
1. Click "Add IP Address"
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

### E. Get Connection String
1. Click "Connect"
2. Choose "Connect your application"
3. Driver: Node.js, Version: 4.1 or later
4. Copy the connection string:
   ```
   mongodb+srv://portfolio_user:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>`** with your actual password
6. Add database name at the end: `/portfolio`
   ```
   mongodb+srv://portfolio_user:yourpassword@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### F. Update Render Environment Variable
1. Go back to Render dashboard
2. Your web service → Environment
3. Edit `MONGODB_URI`
4. Paste your MongoDB Atlas connection string
5. Click "Save Changes"
6. Service will automatically redeploy

---

## Step 4: Update Frontend (2 minutes)

### Get Your Render URL
After deployment, you'll get: `https://portfolio-backend-xxxx.onrender.com`

### Update index.html
Find this line in your index.html:
```javascript
const response = await fetch('https://backend-xxxx.vercel.app/api/contact', {
```

Replace with your Render URL:
```javascript
const response = await fetch('https://portfolio-backend-xxxx.onrender.com/api/contact', {
```

---

## Step 5: Test Everything (5 minutes)

### Test 1: Health Check
Open in browser:
```
https://your-service.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

### Test 2: Root Endpoint
```
https://your-service.onrender.com/
```

Should show API info.

### Test 3: Contact Form
1. Open your portfolio (index.html)
2. Fill contact form
3. Submit
4. Check your Gmail - you should receive an email! 📧

### Test 4: MongoDB Data
1. Open MongoDB Compass
2. Connect using Atlas connection string
3. Check `portfolio` database → `contacts` collection
4. You should see the submitted data!

---

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Backend code pushed to GitHub
- [ ] Render account created
- [ ] Web service created on Render
- [ ] Build and start commands configured
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Environment variables added to Render:
  - [ ] MONGODB_URI
  - [ ] EMAIL_USER
  - [ ] EMAIL_PASSWORD
  - [ ] NODE_ENV
- [ ] Service deployed successfully
- [ ] Health endpoint tested
- [ ] Frontend updated with Render URL
- [ ] Contact form tested
- [ ] Email received
- [ ] Data saved to MongoDB

---

## 🎯 Your URLs After Deployment

**Backend API:** `https://your-service.onrender.com`
**Health Check:** `https://your-service.onrender.com/api/health`
**MongoDB:** Access via MongoDB Compass with Atlas connection string

---

## 🔧 Troubleshooting

### Service won't start
- Check Render logs (Logs tab in dashboard)
- Verify environment variables are set correctly
- Check MongoDB connection string has password

### MongoDB connection error
- Verify IP whitelist includes 0.0.0.0/0
- Check connection string format
- Verify database user credentials

### Emails not sending
- Check EMAIL_PASSWORD in Render environment
- Verify Gmail App Password is correct
- Check Render logs for error messages

### CORS errors
- CORS is already configured in server.js
- If issues persist, check Render logs

---

## 💰 Free Tier Limits

**Render Free:**
- 750 hours/month
- Spins down after 15 minutes of inactivity
- Takes ~30 seconds to spin up

**MongoDB Atlas Free:**
- 512 MB storage
- Shared RAM
- Perfect for portfolio projects

---

## 🚀 Keep Service Alive (Optional)

Use **UptimeRobot** (https://uptimerobot.com):
1. Create free account
2. Add your Render URL
3. Check every 5 minutes
4. Keeps service awake!

---

## 📝 Quick Commands Reference

```powershell
# Push to GitHub
git add .
git commit -m "Update backend"
git push

# Auto-deploys on Render!

# View logs
# Go to Render dashboard → Logs tab
```

---

**Follow these steps and your backend will be live on Render!** 🎉
