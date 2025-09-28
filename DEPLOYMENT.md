# Deployment Guide for Shabz Fazl Website

This website requires a Node.js server to handle the contact form emails. Here are the deployment options:

## Option 1: Railway (Recommended - Free & Easy)

1. **Go to** [railway.app](https://railway.app)
2. **Sign up** with GitHub
3. **Click** "New Project" → "Deploy from GitHub repo"
4. **Select** your `shabz-fazl-website` repository
5. **Add Environment Variables:**
   - `EMAIL_USER` = `contact@shabzfazl.com`
   - `EMAIL_PASS` = `Shabana883`
   - `PORT` = `3000`
6. **Deploy** - Railway will automatically build and deploy your site
7. **Get your live URL** (e.g., `https://shabz-fazl-website-production.up.railway.app`)

## Option 2: Render (Free Tier Available)

1. **Go to** [render.com](https://render.com)
2. **Sign up** with GitHub
3. **Click** "New" → "Web Service"
4. **Connect** your GitHub repository
5. **Configure:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. **Add Environment Variables:**
   - `EMAIL_USER` = `contact@shabzfazl.com`
   - `EMAIL_PASS` = `Shabana883`
   - `PORT` = `3000`
7. **Deploy**

## Option 3: Heroku (Free Tier Discontinued)

1. **Install** Heroku CLI
2. **Login:** `heroku login`
3. **Create app:** `heroku create shabz-fazl-website`
4. **Set environment variables:**
   ```bash
   heroku config:set EMAIL_USER=contact@shabzfazl.com
   heroku config:set EMAIL_PASS=Shabana883
   heroku config:set PORT=3000
   ```
5. **Deploy:** `git push heroku main`

## Option 4: Keep Netlify + Use External Email Service

If you want to keep using Netlify, we can modify the contact form to use a third-party email service like EmailJS or Formspree.

## Current Status

- ✅ **Local server working** (http://localhost:3000)
- ✅ **Email system functional** with GoDaddy SMTP
- ✅ **Git repository updated**
- ⏳ **Live deployment needed** for production use

## Next Steps

1. Choose a deployment platform (Railway recommended)
2. Follow the deployment steps above
3. Update your domain DNS to point to the new hosting service
4. Test the contact form on the live site

## Important Notes

- **Environment variables** must be set on the hosting platform
- **Email credentials** are secure and not stored in code
- **Domain setup** may be required for custom domains
- **SSL certificates** are usually provided automatically
