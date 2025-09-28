# Netlify Forms Setup Instructions

## Step 1: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub and select your repository: `Shubz69/shabz-fazl-website`
4. Click "Deploy site"
5. Wait for deployment to complete

## Step 2: Configure Form Notifications

1. In your Netlify dashboard, go to **Forms**
2. You should see your "contact" form listed
3. Click on the form name
4. Go to **Settings & usage**
5. Under **Form notifications**, click **Add notification**

## Step 3: Set Up Email Notifications

1. Choose **Email notification**
2. **To email**: `contact@shabzfazl.com`
3. **From name**: `Shabz Fazl Website`
4. **Reply-to**: `%email%` (this will use the sender's email)
5. **Subject**: `New Contact Form Submission from %name%`
6. **Email template**: Use this template:

```
New contact form submission:

Name: %name%
Email: %email%
Message: %message%

---
Sent from your website contact form.
```

7. Click **Save**

## Step 4: Test the Contact Form

1. Go to your live Netlify website
2. Fill out the contact form with test data
3. Submit the form
4. Check your `contact@shabzfazl.com` email inbox
5. You should receive the form submission as an email

## Step 5: Custom Domain (Optional)

If you want to use your custom domain:

1. In Netlify dashboard, go to **Domain settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., `shabzfazl.com`)
4. Follow the DNS setup instructions
5. Update your domain's DNS settings as instructed

## How It Works

- Netlify Forms automatically captures form submissions
- You receive email notifications at `contact@shabzfazl.com`
- Users see a success page after submission
- No server-side code needed
- Works reliably with static hosting

## Troubleshooting

- If emails don't arrive, check your spam folder
- Ensure the form has `data-netlify="true"` attribute
- Make sure the form name matches in Netlify dashboard
- Check Netlify Forms usage limits (100 submissions/month on free plan)
