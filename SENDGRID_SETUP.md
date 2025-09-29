# SendGrid Setup for Reliable Email Delivery

Since GoDaddy SMTP is blocking Railway's servers, I've added SendGrid as a more reliable email service.

## Step 1: Get SendGrid API Key

1. **Go to [SendGrid.com](https://sendgrid.com)**
2. **Sign up for a free account** (100 emails/day free)
3. **Verify your email address**
4. **Go to Settings → API Keys**
5. **Create API Key:**
   - Name: "Shabz Fazl Website"
   - Permissions: "Full Access" (or "Mail Send" only for security)
6. **Copy the API key** (starts with "SG.")

## Step 2: Add to Railway Environment Variables

1. **Go to Railway dashboard**
2. **Click on your "web" service**
3. **Go to "Variables" tab**
4. **Add new variable:**
   - **Key:** `SENDGRID_API_KEY`
   - **Value:** `your-copied-api-key-here`

## Step 3: Verify Domain (Optional but Recommended)

1. **In SendGrid dashboard, go to Settings → Sender Authentication**
2. **Add your domain:** `shabzfazl.com`
3. **Add the required DNS records** to your GoDaddy domain settings
4. **This ensures emails come "from" your domain**

## Step 4: Test

1. **Railway will auto-redeploy**
2. **Test the contact form**
3. **Check your `contact@shabzfazl.com` inbox**

## Benefits of SendGrid:

- ✅ **Reliable delivery** - No IP blocking issues
- ✅ **Professional service** - Designed for applications
- ✅ **Free tier** - 100 emails/day free
- ✅ **Better deliverability** - Less likely to go to spam
- ✅ **Analytics** - Track email delivery status

The server will automatically use SendGrid when the API key is available, and fall back to GoDaddy SMTP if needed.
