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
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        environment: {
          databaseConnected: true,
          buttonsCount: buttons.length,
          cloudinaryTest: cloudinaryTest
        },
        sampleButtons: buttons.slice(0, 3)
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