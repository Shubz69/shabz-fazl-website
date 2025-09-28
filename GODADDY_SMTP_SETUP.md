# GoDaddy SMTP Setup Instructions

## Step 1: Get Your GoDaddy Email Credentials

1. **Log into your GoDaddy account**
2. **Go to Email & Office Dashboard**
3. **Find your email account**: `contact@shabzfazl.com`
4. **Get your email password** (the password you use to log into the email)

## Step 2: Enable SMTP (if not already enabled)

1. **In your GoDaddy email settings**:
   - Look for "SMTP Settings" or "Outgoing Mail Server"
   - Make sure SMTP is enabled
   - Note: GoDaddy usually has SMTP enabled by default

## Step 3: Create Environment Variables

Create a `.env` file in your project root with:

```
EMAIL_USER=contact@shabzfazl.com
EMAIL_PASS=your-actual-email-password
PORT=3000
NODE_ENV=production
```

**Replace `your-actual-email-password` with your real GoDaddy email password**

## Step 4: Test Locally (Optional)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Test the contact form** at `http://localhost:3000`

## Step 5: Deploy to Railway

1. **Go to Railway.app**
2. **Create a new project**
3. **Connect your GitHub repository**
4. **Add environment variables in Railway dashboard**:
   - `EMAIL_USER` = `contact@shabzfazl.com`
   - `EMAIL_PASS` = `your-actual-email-password`
   - `PORT` = `3000`
   - `NODE_ENV` = `production`

## Step 6: Test the Live Website

1. **Visit your Railway URL**
2. **Fill out the contact form**
3. **Click "Send Message"**
4. **Check your `contact@shabzfazl.com` inbox**

## Troubleshooting

**If emails don't arrive:**

1. **Check Railway logs** for SMTP errors
2. **Verify email credentials** are correct
3. **Check spam folder** in your email
4. **Make sure SMTP is enabled** in GoDaddy

**Common GoDaddy SMTP Settings:**
- Host: `smtpout.secureserver.net`
- Port: `465`
- Security: `SSL/TLS`
- Username: `contact@shabzfazl.com`
- Password: Your email password

## Security Note

Never commit your `.env` file to Git. The `.gitignore` file is already set up to exclude it.
