# Simple Formspree Setup

## Step 1: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login with GitHub**
3. **Import your GitHub repository:** `Shubz69/shabz-fazl-website`
4. **Click "Deploy"**

The website will deploy as a pure static site with no Node.js errors.

## Step 2: Set Up Formspree

1. **Go to [formspree.io](https://formspree.io)**
2. **Sign up for free account**
3. **Create new form:**
   - **Name:** Shabz Fazl Contact Form
   - **Email:** contact@shabzfazl.com
4. **Copy your form endpoint** (will be something like `https://formspree.io/f/xxxxx`)
5. **Update the form action in `index.html`:**
   ```html
   <form id="contact-form" action="YOUR_FORMSPREE_ENDPOINT" method="POST" class="form">
   ```

## Step 3: Test

1. **Visit your Vercel URL**
2. **Fill out contact form**
3. **Submit and check contact@shabzfazl.com inbox**

## Benefits:
- ✅ **Pure static site** - No server errors
- ✅ **Simple deployment** - Just HTML/CSS/JS
- ✅ **Contact form works** - Via Formspree
- ✅ **Free hosting** on Vercel
- ✅ **Fast and reliable**

Your website will be live at a URL like `your-project.vercel.app`
