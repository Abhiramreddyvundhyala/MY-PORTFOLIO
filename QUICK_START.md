# 🚀 QUICK START - 3 Simple Steps

You're almost ready! Just configure Gmail and start the server.

---

## ✅ What's Already Done:

- ✅ MongoDB is installed and running
- ✅ All files are created
- ✅ Dependencies are installed (npm packages)
- ✅ MongoDB connection is ready

---

## ⚡ Only 3 Steps Left:

### Step 1: Get Gmail App Password (5 minutes)

1. **Go to:** https://myaccount.google.com/apppasswords
   
2. **Select:** Mail → Windows Computer

3. **Click "Generate"**

4. **Copy the 16-character password**
   (Example: `abcd efgh ijkl mnop`)

> **Need help?** See detailed guide: `GMAIL_SETUP.md`

---

### Step 2: Edit .env File (1 minute)

1. **Open** `.env` file in this folder

2. **Change these two lines:**
   ```env
   EMAIL_USER=your-email@gmail.com           ← Change this
   EMAIL_PASSWORD=your-16-character-password  ← Change this
   ```

3. **Example:**
   ```env
   EMAIL_USER=abhiabhiramreddy32@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   ```

4. **Save** the file (Ctrl+S)

---

### Step 3: Start the Server (10 seconds)

**Run this command:**
```powershell
npm start
```

**You should see:**
```
✅ MongoDB Connected Successfully
🚀 Server is running on port 3000
📧 Email configured with: your-email@gmail.com
```

---

## 🎉 That's It! Now Test:

### Quick Test:
1. **Open:** `test-backend.html` in your browser
2. **Click:** "Test Connection" (should be green ✅)
3. **Submit:** test form
4. **Check:** your Gmail - you got an email! 📧

### Real Test:
1. **Open:** `index.html` in browser
2. **Scroll to:** Contact section
3. **Fill and submit** the form
4. **Success!** ✅

---

## 📁 Useful Commands

```powershell
# Start server
npm start

# Check setup status
.\check-setup.ps1

# Test MongoDB
mongosh

# Stop server (in terminal)
Ctrl+C
```

---

## 📚 Documentation Files

- **Quick Start:** `QUICK_START.md` ← You are here
- **Gmail Setup:** `GMAIL_SETUP.md` (Detailed Gmail guide)
- **MongoDB Setup:** `MONGODB_SETUP_GUIDE.md` (Complete MongoDB guide)
- **Full Docs:** `README.md` (Everything in detail)
- **Checklist:** `CHECKLIST.md` (Track your progress)

---

## ❌ Common Issues

### Issue: Can't start server
**Solution:** Check if `.env` is configured correctly

### Issue: Emails not sending
**Solution:** 
1. Verify 2-Step Verification is ON
2. Generate NEW App Password
3. Update `.env` with new password

### Issue: Port 3000 in use
**Solution:** Change `PORT=3001` in `.env`

---

## 🎯 Current Status

Run this to check your setup:
```powershell
.\check-setup.ps1
```

---

## 🆘 Need Help?

1. Check error messages in terminal
2. Read `GMAIL_SETUP.md` for Gmail help
3. Read `MONGODB_SETUP_GUIDE.md` for MongoDB help
4. Check your `.env` file for typos

---

## 🎊 Success Criteria

Your setup is complete when:
- ✅ `npm start` runs without errors
- ✅ Browser shows success at: http://localhost:3000/api/health
- ✅ Test form sends emails
- ✅ Contact form on portfolio works

---

**Ready?** Start with Step 1 above! 🚀
