# Vercel SMTP Setup

## Step 1: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login with GitHub**
3. **Import your GitHub repository:** `Shubz69/shabz-fazl-website`
4. **Click "Deploy"**

## Step 2: Add Environment Variables in Vercel

1. **In your Vercel dashboard**, go to your project
2. **Click "Settings" tab**
3. **Click "Environment Variables"**
4. **Add these variables:**

```
EMAIL_USER = contact@shabzfazl.com
EMAIL_PASS = your-godaddy-email-password
```

**Replace `your-godaddy-email-password` with your actual GoDaddy email password**

## Step 3: Redeploy

After adding environment variables:
1. **Go to "Deployments" tab**
2. **Click "Redeploy"** on the latest deployment

## Step 4: Test

1. **Visit your Vercel URL**
2. **Fill out the contact form**
3. **Click "Send Message"**
4. **Check your `contact@shabzfazl.com` inbox**

## How It Works:

- ✅ **Simple contact form** - No third-party services
- ✅ **Direct SMTP** - Uses GoDaddy SMTP to send emails
- ✅ **Serverless** - Runs on Vercel's serverless functions
- ✅ **Direct delivery** - Emails go straight to `contact@shabzfazl.com`

The contact form will send emails directly via your GoDaddy SMTP when users click "Send Message"!
