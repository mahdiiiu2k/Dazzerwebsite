# How to Add Environment Variables to Netlify

## Step-by-Step Instructions:

1. **In your Netlify dashboard** (where you are now), look for **"Environment variables"** in the left sidebar
2. **Click on "Environment variables"**
3. **Click "Add a variable"** button
4. **Add the first variable:**
   - **Key**: `GMAIL_USER`
   - **Value**: `chouikimahdu@gmail.com`
   - Click "Create variable"

5. **Add the second variable:**
   - **Key**: `GMAIL_APP_PASSWORD` 
   - **Value**: Your Gmail App Password (16 characters, no spaces)
   - Click "Create variable"

## To Get Your Gmail App Password:
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click Security → 2-Step Verification (enable if not already)
3. Search for "App passwords" 
4. Generate new app password for "Mail"
5. Copy the 16-character password

## After Adding Both Variables:
1. Your site will automatically redeploy
2. The contact form will start sending emails to your inbox
3. Test by submitting the form - you should get the email within minutes

That's it! Your email system will be fully working.