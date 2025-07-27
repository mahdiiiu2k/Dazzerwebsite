# Exact Files to Upload to GitHub

## Summary
Your email system works perfectly on Replit but needs these files uploaded to GitHub for Netlify deployment.

## File 1: netlify/functions/contact.js
**Location**: Create this file in your GitHub repo
**Content**: Copy from the `netlify/functions/contact.js` file in this Replit project (4,359 bytes)

## File 2: netlify/functions/package.json  
**Location**: Create this file in your GitHub repo
**Content**:
```json
{
  "name": "netlify-functions",
  "version": "1.0.0",
  "dependencies": {
    "nodemailer": "^6.9.8"
  }
}
```

## File 3: netlify.toml (UPDATE existing file)
**Location**: Update your existing netlify.toml file
**Content**:
```toml
[build]
  publish = "dist/public"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[functions]
  directory = "netlify/functions"
```

## File 4: client/src/components/sections/cta.tsx (UPDATE existing file)
**Location**: Update your existing contact form file
**Key Change**: The form now automatically detects if it's running on Netlify or Replit and uses the appropriate endpoint.

## What Happens After Upload:
1. Netlify automatically redeploys
2. Contact form works on both platforms
3. Emails sent to chouikimahdiabderrahmane@gmail.com
4. Environment variables already configured in Netlify

## Alternative: Manual File Copy
If you can't do git operations, you can:
1. Download the files from this Replit
2. Upload them manually to GitHub through the web interface
3. Netlify will detect and deploy automatically