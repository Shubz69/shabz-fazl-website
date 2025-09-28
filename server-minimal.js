const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('=== MINIMAL SERVER STARTING ===');
console.log('Resend API Key:', process.env.RESEND_API_KEY ? '***SET***' : 'NOT SET');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration - using Resend
const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 587,
    secure: false,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY || 'dummy-key'
    }
});

console.log('✅ Resend transporter configured');

// Simple contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        console.log('📧 Contact form submitted');
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }

        console.log(`📧 Sending email from ${name} (${email}) to contact@shabzfazl.com`);
        
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: 'contact@shabzfazl.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        
        res.json({ 
            success: true, 
            message: 'Thank you for your message! Shabz will get back to you within 24 hours.' 
        });
        
    } catch (error) {
        console.error('❌ Email error:', error.message);
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

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 Visit http://localhost:${PORT} to view the website`);
});

console.log('✅ Server startup complete');
