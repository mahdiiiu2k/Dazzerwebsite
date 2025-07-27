#!/bin/bash

# Test script for Netlify deployment
# Replace YOUR_SITE_URL with your actual Netlify URL

SITE_URL="YOUR_SITE_URL.netlify.app"

echo "🔧 Testing Netlify Deployment"
echo "================================"

echo "1. Testing if function exists..."
curl -s -o /dev/null -w "%{http_code}" "https://$SITE_URL/.netlify/functions/contact-simple"
FUNCTION_STATUS=$?

if [ $FUNCTION_STATUS -eq 0 ]; then
    echo "✅ Function endpoint exists"
else
    echo "❌ Function endpoint not found - check function deployment"
    exit 1
fi

echo ""
echo "2. Testing function with sample data..."
RESPONSE=$(curl -s -X POST "https://$SITE_URL/.netlify/functions/contact-simple" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Test message"}')

echo "Response: $RESPONSE"

if echo "$RESPONSE" | grep -q "emailSent"; then
    echo "✅ Function responds correctly"
    
    if echo "$RESPONSE" | grep -q '"emailSent":true'; then
        echo "🎉 EMAIL WORKING! Function successfully sent email"
    else
        echo "⚠️  Function responds but email failed - check environment variables and Gmail settings"
        echo "Check Netlify function logs for specific error"
    fi
else
    echo "❌ Function not responding correctly - check function logs"
fi

echo ""
echo "3. What to check if email still fails:"
echo "   - Netlify Dashboard → Functions → contact-simple → View Logs"
echo "   - Environment variables: GMAIL_USER and GMAIL_APP_PASSWORD"
echo "   - Gmail App Password (16 characters, not regular password)"
echo "   - 2-Factor Authentication enabled on Gmail account"