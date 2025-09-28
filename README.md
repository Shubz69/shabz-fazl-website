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

### 3. Outlook Business Email Setup

1. **Use your business email credentials**:
   - Email: `your-email@yourdomain.com`
   - Password: Your regular email password (or app password if 2FA is enabled)

2. **If 2-Factor Authentication is enabled**:
   - Go to Microsoft Account settings
   - Security → Advanced security options → App passwords
   - Generate a new app password for "Mail"
   - Use this app password instead of your regular password

3. **Update your `.env` file**:
   ```env
   EMAIL_USER=your-email@yourdomain.com
   EMAIL_PASS=your-email-password
   PORT=3000
   ```

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