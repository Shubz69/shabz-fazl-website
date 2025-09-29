# Vercel Email Setup - Direct to contact@shabzfazl.com

## Step 1: Get Resend API Key (Free)

1. **Go to [resend.com](https://resend.com)**
2. **Sign up for free account** (100 emails/month free)
3. **Verify your email**
4. **Go to API Keys section**
5. **Create new API key**
6. **Copy the API key** (starts with "re_")

## Step 2: Add to Vercel Environment Variables

1. **In Vercel dashboard, go to your project**
2. **Click "Settings" tab**
3. **Click "Environment Variables"**
4. **Add this variable:**
   - **Key:** `RESEND_API_KEY`
   - **Value:** `your-resend-api-key-here`

## Step 3: Redeploy

After adding environment variable:
1. **Go to "Deployments" tab**
2. **Click "Redeploy"** on the latest deployment

## Step 4: Test

1. **Visit your Vercel URL**
2. **Fill out the contact form**
3. **Click "Send Message"**
4. **Check your `contact@shabzfazl.com` inbox**

## Features:

✅ **Direct email delivery** - Goes straight to contact@shabzfazl.com
✅ **Beautiful HTML emails** - Matches your website design
✅ **Professional sender** - noreply@shabzfazl.com
✅ **Reply functionality** - You can reply directly to the sender
✅ **No third-party forms** - Everything stays on Vercel
✅ **Free tier** - 100 emails/month free

The emails will look professional and go directly to your business email!
