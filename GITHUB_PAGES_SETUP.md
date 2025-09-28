# GitHub Pages Setup Instructions (FREE)

## Step 1: Enable GitHub Pages

1. Go to your GitHub repository: `Shubz69/shabz-fazl-website`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**
7. Wait 5-10 minutes for deployment

## Step 2: Your Website URL

Your website will be available at:
`https://shubz69.github.io/shabz-fazl-website/`

## Step 3: How the Contact Form Works

The contact form now uses a simple **mailto** approach:

1. **User fills out the form** (Name, Email, Message)
2. **Clicks "Send Message"**
3. **Email client opens** (Outlook, Gmail, etc.) with:
   - **To**: `contact@shabzfazl.com`
   - **Subject**: "Contact from [Name]"
   - **Body**: Formatted message with all details
4. **User clicks Send** in their email client
5. **Email arrives** in your GoDaddy inbox

## Step 4: Custom Domain (Optional)

If you want to use `shabzfazl.com`:

1. In GitHub repository **Settings** → **Pages**
2. Under **Custom domain**, enter: `shabzfazl.com`
3. Click **Save**
4. Add DNS records to your GoDaddy domain:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: `shubz69.github.io`
   - **Type**: A
   - **Name**: @
   - **Value**: `185.199.108.153`

## Benefits of This Approach

- ✅ **Completely FREE** (no credits needed)
- ✅ **No server required**
- ✅ **Works with any hosting**
- ✅ **Simple and reliable**
- ✅ **Emails go directly to your GoDaddy inbox**

## Testing

1. Go to your GitHub Pages URL
2. Fill out the contact form
3. Click "Send Message"
4. Your email client should open with pre-filled details
5. Send the email
6. Check your `contact@shabzfazl.com` inbox

This is the simplest working solution that requires no paid services!
