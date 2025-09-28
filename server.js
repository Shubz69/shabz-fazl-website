require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Debug: Log environment variables
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS ? '***hidden***' : 'NOT SET');
console.log('Port:', PORT);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration for GoDaddy with timeout settings
const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net', // GoDaddy SMTP server
    port: 465, // GoDaddy SMTP port for SSL
    secure: true, // Use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000,   // 30 seconds
    socketTimeout: 60000,     // 60 seconds
    tls: {
        rejectUnauthorized: false
    }
});

// Email template
const createEmailTemplate = (name, email, message) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #4c1d95; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; text-align: center;">New Contact Form Submission</h2>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h3 style="color: #4c1d95; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #4c1d95; margin: 10px 0;">
                ${message.replace(/\n/g, '<br>')}
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #666; font-size: 14px; margin: 0;">
                This message was sent from the Shabz Fazl website contact form.
            </p>
        </div>
    </div>
    `;
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
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
                message: 'Please enter a valid email address' 
            });
        }

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: 'contact@shabzfazl.com',
            subject: `New Contact Form Submission from ${name}`,
            html: createEmailTemplate(name, email, message),
            replyTo: email
        };

        // Send email directly (connection will be established when sending)
        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        console.log(`Email sent successfully from ${name} (${email})`);

        res.json({ 
            success: true, 
            message: 'Thank you for your message! Shabz will get back to you within 24 hours.' 
        });

    } catch (error) {
        console.error('Detailed error sending email:', error);
        console.error('Error code:', error.code);
        console.error('Error response:', error.response);
        res.status(500).json({ 
            success: false, 
            message: 'Sorry, there was an error sending your message. Please try again later.' 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the website`);
});
