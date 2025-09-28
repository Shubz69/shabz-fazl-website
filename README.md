# Shabz Fazl Website

Professional website for Shabz Fazl Mindset Coach with server-based email functionality.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Settings

Create a `.env` file in the root directory with your email credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
```

### 3. Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in your `.env` file

### 4. Run the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 5. Access the Website

Open your browser and go to: `http://localhost:3000`

## 📧 Email Configuration

The server will send emails directly to `contact@shabzfazl.com` when the contact form is submitted.

### Alternative Email Services

You can modify the email configuration in `server.js` to use other services:

- **Outlook/Hotmail**: Change service to 'hotmail'
- **Yahoo**: Change service to 'yahoo'
- **Custom SMTP**: Replace the service configuration with your SMTP settings

## 🛠️ Features

- ✅ Professional dark purple design
- ✅ Responsive layout
- ✅ Server-based email handling
- ✅ Form validation
- ✅ Professional email templates
- ✅ Error handling and user feedback

## 📁 File Structure

```
├── index.html          # Main website
├── styles.css          # Styling
├── script.js           # Frontend JavaScript
├── server.js           # Node.js server
├── package.json        # Dependencies
└── README.md          # This file
```

## 🔧 Troubleshooting

### Email Not Sending
1. Check your `.env` file has correct credentials
2. Ensure 2FA is enabled and app password is correct
3. Check server console for error messages

### Port Already in Use
Change the PORT in your `.env` file to a different number (e.g., 3001, 8080)

## 📞 Support

For any issues or questions, contact the development team.