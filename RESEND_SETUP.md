# Resend Email Setup

## Why Resend?
- GoDaddy SMTP is blocking Railway servers
- Resend is designed for developers and hosting platforms
- Free tier: 3,000 emails/month
- Reliable delivery

## Setup Steps:

### 1. Create Resend Account
1. Go to https://resend.com
2. Click "Sign Up"
3. Use your email: `contact@shabzfazl.com`
4. Verify your email

### 2. Get API Key
1. After login, go to "API Keys"
2. Click "Create API Key"
3. Name it: "Shabz Website"
4. Copy the API key (starts with `re_`)

### 3. Update Railway Variables
1. Go to Railway dashboard
2. Click on your project
3. Go to "Variables" tab
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key_here`
5. Remove old variables:
   - `EMAIL_USER`
   - `EMAIL_PASS`

### 4. Verify Domain (Optional)
1. In Resend dashboard, go to "Domains"
2. Add `shabzfazl.com`
3. Follow DNS setup instructions
4. This ensures emails come from your domain

## After Setup:
- Deploy the updated code
- Test the contact form
- Emails will be sent from `contact@shabzfazl.com`

## Benefits:
✅ Reliable delivery
✅ Professional appearance
✅ No blocking issues
✅ Free for small websites
✅ Easy to set up
