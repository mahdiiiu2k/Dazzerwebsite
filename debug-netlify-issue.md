# Debug Netlify Email Issue - Step by Step

Since the build command fix didn't resolve the issue, let's systematically debug this:

## 1. Check Function Deployment Status

Visit your function directly in browser:
```
https://dedesignportflio.netlify.app/.netlify/functions/contact-simple
```

**Expected responses:**
- ✅ `{"success":false,"emailSent":false,"message":"Only POST method allowed"}` = Function deployed correctly
- ❌ `404 Not Found` = Function not deployed
- ❌ `500 Internal Server Error` = Function has deployment/runtime errors

## 2. Check Function Logs in Netlify

1. Netlify Dashboard → dedesignportflio → Functions
2. Look for `contact-simple` function
3. Click on it and check logs for errors

**Common deployment errors:**
- `Cannot find module 'nodemailer'` = Dependencies not installed
- `Function not found` = Build process failed
- `Syntax error` = Code issue

## 3. Test Function with Curl

```bash
curl -X POST https://dedesignportflio.netlify.app/.netlify/functions/contact-simple \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Test message"}'
```

## 4. Alternative: Use Built-in Netlify Forms

If the function continues to fail, we can switch to pure Netlify Forms (no email sending):

1. The form already submits to Netlify Forms as backup
2. You can view submissions in: Netlify Dashboard → Forms
3. Set up email notifications in Netlify Forms settings

## 5. Check Browser Console

When submitting the form on your live site:
1. Open browser Developer Tools → Console
2. Submit the form
3. Look for error messages and network request details

## 6. Verify Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables:
- Confirm `GMAIL_USER` = chouikimahdu@gmail.com
- Confirm `GMAIL_APP_PASSWORD` = [16-character password]
- No extra spaces or quotes

## Next Steps

Please check items 1-3 above and let me know what you find. This will tell us exactly where the failure is occurring.