# Netlify Email Setup Guide

## Environment Variables Required

In your Netlify dashboard, add these environment variables:

1. **GMAIL_USER** = chouikimahdu@gmail.com
2. **GMAIL_APP_PASSWORD** = [Your 16-character Gmail App Password]

## How to Set Environment Variables in Netlify:

1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings > Environment variables
4. Add both variables with their values
5. Redeploy your site

## Important Notes:

- The GMAIL_APP_PASSWORD is NOT your regular Gmail password
- It's a special 16-character password generated in your Google Account
- Both Replit and Netlify need the same credentials to work
- The email will be sent to: chouikimahdiabderrahmane@gmail.com

## Files to Upload to GitHub:

- `netlify/functions/contact.js` (serverless function)
- `netlify/functions/package.json` (dependencies)
- Updated `netlify.toml` (configuration)

Once you upload these files and set the environment variables, the contact form will work on both:
- ✅ Replit (using your backend server)
- ✅ Netlify (using serverless functions)

Both platforms will send emails to the same inbox using the same Gmail credentials.