# Netlify Email Setup Guide

## Environment Variables Required

In your Netlify dashboard, add these environment variables:

1. **GMAIL_USER** = chouikimahdu@gmail.com
2. **GMAIL_APP_PASSWORD** = [Your 16-character Gmail App Password]

**IMPORTANT:** You do NOT need SESSION_SECRET for Netlify - only the Gmail credentials above.

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

## Troubleshooting Email Issues on Netlify

### 1. Check Environment Variables
First, verify your Netlify environment variables:
- Go to Netlify Dashboard > Your Site > Site Settings > Environment Variables
- Ensure both `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correctly set
- After adding/updating variables, **redeploy your site**

### 2. Common Issues and Solutions

**Problem**: "Email service not configured" error
**Solution**: Environment variables missing or incorrectly named
- Variable names must be exactly: `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- Values must not have extra spaces or quotes

**Problem**: Authentication errors (535, 534 codes)
**Solution**: Gmail App Password issues
- Make sure you're using App Password, not regular Gmail password
- App Password should be 16 characters without spaces
- Enable 2-Factor Authentication on Gmail account first

**Problem**: "getaddrinfo ENOTFOUND" error
**Solution**: Network/DNS issues in Netlify
- This is usually temporary - try redeploying
- Check Netlify function logs for specific error details

### 3. How to Check Function Logs
1. Go to Netlify Dashboard
2. Select your site
3. Go to Functions tab
4. Click on the contact function
5. View the logs to see detailed error messages

### 4. Test the Function Directly
You can test your Netlify function directly:
```
curl -X POST https://your-site.netlify.app/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","message":"Test message"}'
```

### 5. Email Delivery Verification
- Check Gmail Sent folder for confirmation
- Email goes to: chouikimahdiabderrahmane@gmail.com
- Subject: "New Contact Form Submission from [Name]"

### 6. Debug Your Specific Issue

Since you're getting "Message received but email notification failed", follow these steps:

**Step 1: Check Function Logs**
1. Go to your Netlify Dashboard
2. Click on your site
3. Go to "Functions" tab
4. Click on "contact" function
5. Look at the logs for error details

**Step 2: Test Environment Variables**
Upload the `test-netlify-email.html` file to your site and visit:
`https://your-site.netlify.app/test-netlify-email.html`

This will show you exactly what's wrong.

**Step 3: Common Fixes**
- Make sure environment variables are named exactly: `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- Redeploy your site after adding environment variables
- Generate a new Gmail App Password if the current one doesn't work
- Check that your Gmail account has 2-factor authentication enabled

**Step 4: Quick Test**
Run this command in your terminal (replace YOUR-SITE with your actual Netlify URL):
```bash
curl -X POST https://YOUR-SITE.netlify.app/.netlify/functions/test-email
```

This will show you the environment variable status.