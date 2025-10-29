# Portfolio Backend - Contact Form with MongoDB & Email

Complete backend system for portfolio contact form with MongoDB database and email notifications.

---

## 🚀 Quick Start

### 1. Install Dependencies
```powershell
npm install
```

### 2. Configure `.env` File
Update with your credentials:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
PORT=3000
```

### 3. Start Server
```powershell
npm start
```

Server runs on: http://localhost:3000

---

## 📧 Gmail App Password Setup

1. **Enable 2-Step Verification:**
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" → Generate
   - Copy the 16-character password
   - Add to `.env` file

---

## 💾 View MongoDB Data

### Option 1: Browser (Easiest)
Open: http://localhost:3000/api/contacts

### Option 2: MongoDB Compass (Visual)
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Browse: `portfolio` → `contacts`

### Option 3: Command Line
```powershell
mongosh
use portfolio
db.contacts.find()
```

---

## ✨ Features

When someone submits the contact form:
- ✅ Message saved to MongoDB
- ✅ Email notification sent to you
- ✅ Auto-reply sent to user
- ✅ Success confirmation shown

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | View all contacts |
| GET | `/api/health` | Server health check |

---

## 🛠️ Troubleshooting

**MongoDB not connecting?**
- Check if MongoDB service is running: `Get-Service MongoDB`
- Start service: `net start MongoDB`

**Emails not sending?**
- Verify 2-Step Verification is enabled
- Generate new App Password
- Check `.env` file for typos

**Port 3000 in use?**
- Change `PORT=3001` in `.env` file

---

## 📂 Project Structure

```
├── index.html          # Portfolio with contact form
├── server.js           # Backend server
├── package.json        # Dependencies
├── .env               # Configuration (your credentials)
├── .gitignore         # Excludes sensitive files
└── README.md          # This file
```

---

## 🔐 Security

- ✅ `.env` is in `.gitignore` (not uploaded to Git)
- ✅ Using Gmail App Password (not real password)
- ✅ Form validation on backend
- ✅ MongoDB connection secured

---

## 🌐 Deployment (For 24/7 Availability)

### Why Deploy?
- ✅ Contact form works even when your computer is off
- ✅ Anyone can contact you anytime
- ✅ Professional setup
- ✅ No need to run `npm start` manually

### Best Free Hosting Options:

#### Option 1: Render.com (Recommended - Easiest)

1. **Create Account:** https://render.com
2. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repo (or upload files)
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Add Environment Variables:**
   - Go to "Environment" tab
   - Add:
     ```
     MONGODB_URI = your_mongodb_atlas_connection_string
     EMAIL_USER = abhiabhiramreddy32@gmail.com
     EMAIL_PASSWORD = your_app_password
     PORT = 3000
     ```
4. **Deploy:** Click "Create Web Service"
5. **Get URL:** You'll get: `https://your-app.onrender.com`

**Note:** Free tier sleeps after 15 minutes of inactivity (wakes up when accessed)

---

#### Option 2: Railway.app (Fast & Easy)

1. **Create Account:** https://railway.app
2. **New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub" or "Empty Project"
3. **Add MongoDB:**
   - Click "New" → "Database" → "MongoDB"
   - Copy connection string
4. **Deploy Backend:**
   - Upload your code or connect GitHub
   - Add environment variables
5. **Get URL:** `https://your-app.up.railway.app`

**Note:** $5 free credit monthly

---

#### Option 3: Cyclic.sh (Simple)

1. **Create Account:** https://cyclic.sh
2. **Connect GitHub:** Link your repository
3. **Add Environment Variables:** In settings
4. **Deploy:** Automatic
5. **Get URL:** `https://your-app.cyclic.app`

---

### Using MongoDB Atlas (Cloud Database - Required for Deployment)

Since hosting platforms don't have MongoDB installed, use MongoDB Atlas:

1. **Create Account:** https://www.mongodb.com/cloud/atlas
2. **Create Cluster:** Choose Free M0 tier
3. **Create Database User:**
   - Username: `portfolio_user`
   - Password: `create_strong_password`
4. **Whitelist IP:** 
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (`0.0.0.0/0`)
5. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio`
6. **Update `.env` for Deployment:**
   ```env
   MONGODB_URI=mongodb+srv://portfolio_user:your_password@cluster0.xxxxx.mongodb.net/portfolio
   ```

---

### Update Your Frontend After Deployment

Once deployed, update `index.html` to use your deployed URL:

**Find this line in index.html:**
```javascript
const response = await fetch('http://localhost:3000/api/contact', {
```

**Replace with your deployed URL:**
```javascript
const response = await fetch('https://your-app.onrender.com/api/contact', {
```

---

### Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Backend deployed to hosting platform
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Test health endpoint: `https://your-app.onrender.com/api/health`
- [ ] Update frontend URL in `index.html`
- [ ] Test contact form submission
- [ ] Verify emails are received

---

### Quick Deployment Steps

1. **Setup MongoDB Atlas** (cloud database)
2. **Deploy to Render.com** (backend hosting)
3. **Update index.html** with deployed URL
4. **Upload index.html** to GitHub Pages or Netlify (frontend hosting)

**Result:** Fully working portfolio with contact form accessible 24/7! 🚀

---

## 📱 Contact Form Testing

1. Open `index.html` in browser
2. Fill contact form
3. Submit
4. Check your Gmail for notification
5. Check MongoDB for stored data

---

## 🎯 Quick Commands

```powershell
# Start server
npm start

# Check MongoDB service
Get-Service MongoDB

# Open MongoDB shell
mongosh

# View contacts
mongosh --eval "use portfolio; db.contacts.find().pretty()"
```

---

## 💡 Tips

- Keep server running while using contact form
- Check MongoDB Compass for visual data view
- View all contacts at: http://localhost:3000/api/contacts
- Server logs show real-time activity

---

## 📞 Need Help?

Check terminal logs where you ran `npm start` for error messages.

---

**Created by AbhiRam Reddy Vundhyala**
