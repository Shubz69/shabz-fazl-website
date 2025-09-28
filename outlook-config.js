// Outlook Business Email Configuration
// This file shows how to configure the server for Outlook business emails

const outlookConfig = {
    // SMTP Configuration for Outlook
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your-email@yourdomain.com', // Replace with your business email
        pass: 'your-email-password' // Replace with your email password
    },
    tls: {
        ciphers: 'SSLv3'
    }
};

// Alternative configuration for Office 365
const office365Config = {
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'your-email@yourdomain.com',
        pass: 'your-email-password'
    },
    tls: {
        ciphers: 'SSLv3'
    }
};

// Instructions for setup:
console.log(`
📧 Outlook Business Email Setup Instructions:

1. Create a .env file in your project root with:
   EMAIL_USER=your-email@yourdomain.com
   EMAIL_PASS=your-email-password
   PORT=3000

2. If your organization uses 2FA:
   - Go to Microsoft Account settings
   - Security → Advanced security options → App passwords
   - Generate a new app password for "Mail"
   - Use this app password in your .env file

3. Common Outlook SMTP servers:
   - smtp-mail.outlook.com (Outlook.com)
   - smtp.office365.com (Office 365)
   - smtp.yourdomain.com (Custom domain)

4. Test your configuration by running:
   npm start

5. Check the server console for any connection errors
`);

module.exports = { outlookConfig, office365Config };
