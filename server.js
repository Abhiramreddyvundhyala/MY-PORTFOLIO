const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://abhiramreddyvundhyala.github.io',
        'https://www.abhiramreddyvundhyala.tech',
        'https://abhiramreddyvundhyala.tech'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('Contact', contactSchema);

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Save to MongoDB
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        // Send email notification to you
        const mailOptionsToYou = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Your email
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #4a6cf7; border-bottom: 2px solid #4a6cf7; padding-bottom: 10px;">New Contact Form Submission</h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong style="color: #2a3855;">Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong style="color: #2a3855;">Email:</strong> <a href="mailto:${email}" style="color: #4a6cf7;">${email}</a></p>
                        <p style="margin: 10px 0;"><strong style="color: #2a3855;">Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="background-color: #f4f7fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <strong style="color: #2a3855;">Message:</strong>
                        <p style="margin: 10px 0; line-height: 1.6; color: #333;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
                        <p>This email was sent from your portfolio contact form.</p>
                        <p>Date: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `
        };

        // Send auto-reply to the user
        const mailOptionsToUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting me!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #4a6cf7; border-bottom: 2px solid #4a6cf7; padding-bottom: 10px;">Thank You for Reaching Out!</h2>
                    
                    <p style="line-height: 1.6; color: #333;">Hi ${name},</p>
                    
                    <p style="line-height: 1.6; color: #333;">Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.</p>
                    
                    <div style="background-color: #f4f7fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Your Message Details:</strong></p>
                        <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                        <p style="margin: 5px 0;"><strong>Message:</strong> ${message}</p>
                    </div>
                    
                    <p style="line-height: 1.6; color: #333;">Best regards,<br><strong style="color: #4a6cf7;">AbhiRam Reddy Vundhyala</strong></p>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                        <p style="color: #666; font-size: 12px;">Email: abhiabhiramreddy32@gmail.com</p>
                        <p style="color: #666; font-size: 12px;">Phone: +91 7780720178</p>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(mailOptionsToYou);
        await transporter.sendMail(mailOptionsToUser);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! Thank you for contacting me.'
        });

    } catch (error) {
        console.error('Error:', error);
        console.error('Error details:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Get all contacts (optional - for admin panel)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        email: process.env.EMAIL_USER ? 'configured' : 'not configured',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
    try {
        await transporter.verify();
        res.status(200).json({
            success: true,
            message: 'Email service is working',
            configured: process.env.EMAIL_USER
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Email service error',
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📧 Email configured with: ${process.env.EMAIL_USER}`);
});
