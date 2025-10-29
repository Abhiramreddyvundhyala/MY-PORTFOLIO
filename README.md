# Portfolio Backend Setup Guide

## Prerequisites
- Node.js installed (v14 or higher)
- MongoDB installed locally OR MongoDB Atlas account
- Gmail account with App Password enabled

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup MongoDB

#### Option A: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/portfolio`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

### 3. Setup Gmail for Email Notifications

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Step Verification (Security → 2-Step Verification)
3. Generate App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Backend"
   - Copy the 16-character password

### 4. Configure Environment Variables

Edit `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
PORT=3000
```

### 5. Run the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:3000

## Testing the API

### Test Server Health
```bash
curl http://localhost:3000/api/health
```

### Test Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

### View All Contacts (Optional)
```bash
curl http://localhost:3000/api/contacts
```

## What Happens When Someone Contacts You?

1. **Form Submission**: User fills out the contact form on your portfolio
2. **Database Storage**: Message is saved to MongoDB
3. **Email to You**: You receive an email with the contact details
4. **Auto-Reply**: User receives a confirmation email

## Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB service is running
- Verify connection string in `.env`
- Check firewall settings for Atlas

### Email Not Sending
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled
- Try creating a new App Password

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

## Security Notes

- Never commit `.env` file to Git
- Keep your App Password secure
- Use environment variables in production
- Consider adding rate limiting for production

## Deployment (Optional)

For production deployment:
- Deploy to Heroku, Railway, or Render
- Use MongoDB Atlas for database
- Set environment variables in hosting platform
- Enable HTTPS

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/health` | Health check |

## Support

If you encounter any issues:
1. Check server logs for errors
2. Verify all environment variables are set
3. Test MongoDB connection separately
4. Test email credentials separately
