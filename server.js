// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email Configuration - Use SendGrid for reliable delivery
let emailService = null;

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    emailService = 'sendgrid';
    console.log('SendGrid configured for email delivery');
} else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Fallback to GoDaddy SMTP (may have connectivity issues)
    emailService = 'smtp';
    transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 60000,
        greetingTimeout: 30000,
        socketTimeout: 60000
    });
    console.log('GoDaddy SMTP configured (may have connectivity issues)');
} else {
    console.log('No email service configured');
}

// Contact form endpoint
app.post('/send-email', async (req, res) => {
    try {
        // Check if email service is configured
        if (!emailService) {
            return res.status(500).json({ 
                success: false, 
                message: 'Email service not configured. Please try again later.' 
            });
        }

        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format' 
            });
        }

        // Send email using appropriate service
        if (emailService === 'sendgrid') {
            // Use SendGrid
            const msg = {
                to: 'contact@shabzfazl.com',
                from: 'contact@shabzfazl.com',
                replyTo: email,
                subject: `New Message from ${name} - Website Contact Form`,
                html: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                    <hr>
                    <p><em>Sent from Shabz Fazl Website Contact Form</em></p>
                `,
                text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Sent from Shabz Fazl Website Contact Form
                `
            };

            await sgMail.send(msg);
            console.log('Email sent successfully via SendGrid');

        } else if (emailService === 'smtp') {
            // Use GoDaddy SMTP (fallback)
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'contact@shabzfazl.com',
                replyTo: email,
                subject: `New Message from ${name} - Website Contact Form`,
                html: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                    <hr>
                    <p><em>Sent from Shabz Fazl Website Contact Form</em></p>
                `,
                text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Sent from Shabz Fazl Website Contact Form
                `
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully via SMTP:', info.messageId);
        }

        res.json({ 
            success: true, 
            message: 'Message sent successfully! Shabz will get back to you within 24 hours.' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again later.' 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Log email service status
    console.log(`Email Service: ${emailService || 'None'}`);
    if (emailService === 'sendgrid') {
        console.log('SendGrid API Key: Set');
    } else if (emailService === 'smtp') {
        console.log('GoDaddy SMTP: Configured (may have connectivity issues)');
    }
    
    console.log('Server started successfully - contact form ready');
});
