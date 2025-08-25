import { db } from "./shared/simple-db.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    console.log('🔧 Debug function called');
    console.log('🔧 Environment variables check:', {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) + '...',
      hasCloudinaryName: !!process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
      hasCloudinaryKey: !!process.env.CLOUDINARY_API_KEY,
      hasCloudinarySecret: !!process.env.CLOUDINARY_API_SECRET
    });

    // Test database connection
    console.log('🔧 Testing database connection...');
    const buttons = await db.getButtons();
    console.log('🔧 Found buttons in database:', buttons.length);
    console.log('🔧 Button data sample:', buttons.slice(0, 2));

    // Test Cloudinary configuration
    console.log('🔧 Testing Cloudinary configuration...');
    const cloudinaryTest = await cloudinary.api.ping().catch(err => err.message);
    
    // Test the exact same API call that the frontend makes
    console.log('🔧 Testing exact API format...');
    const apiResponse = { buttons: buttons };
    
    // Verify image URLs are accessible
    const testImageUrl = buttons.length > 0 ? buttons[0].imageUrl : null;
    let imageAccessTest = null;
    if (testImageUrl) {
      try {
        const imageResponse = await fetch(testImageUrl, { method: 'HEAD' });
        imageAccessTest = {
          url: testImageUrl,
          status: imageResponse.status,
          headers: Object.fromEntries(imageResponse.headers.entries())
        };
      } catch (err) {
        imageAccessTest = {
          url: testImageUrl,
          error: err.message
        };
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        environment: {
          databaseConnected: true,
          buttonsCount: buttons.length,
          cloudinaryTest: cloudinaryTest,
          cloudinaryConfig: {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            hasKey: !!process.env.CLOUDINARY_API_KEY,
            hasSecret: !!process.env.CLOUDINARY_API_SECRET
          }
        },
        apiFormatTest: apiResponse,
        imageAccessTest: imageAccessTest,
        fullButtonData: buttons,
        comparison: {
          firstButtonImageUrl: buttons[0]?.imageUrl || null,
          urlStartsWithHttps: buttons[0]?.imageUrl?.startsWith('https://') || false,
          urlContainsCloudinary: buttons[0]?.imageUrl?.includes('cloudinary') || false
        }
      }),
    };

  } catch (error) {
    console.error('🚨 Debug error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Debug failed",
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }),
    };
  }
};