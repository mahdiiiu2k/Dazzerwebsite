import { db } from "./shared/db.js";
import { dynamicButtons } from "./shared/schema.js";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const handler = async (event, context) => {
  console.log('🔧 Buttons function called:', event.httpMethod, event.path);
  console.log('🔧 Headers:', JSON.stringify(event.headers, null, 2));
  console.log('🔧 Event body:', event.body?.substring(0, 200) + '...');
  console.log('🔧 Environment check:', {
    hasDatabase: !!process.env.DATABASE_URL,
    databasePrefix: process.env.DATABASE_URL?.substring(0, 30) + '...',
    hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
    hasCloudinaryKey: !!process.env.CLOUDINARY_API_KEY,
    hasCloudinarySecret: !!process.env.CLOUDINARY_API_SECRET
  });
  
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
    // GET - Retrieve all buttons
    if (event.httpMethod === "GET") {
      console.log('🔧 Getting buttons from database...');
      const buttons = await db.select().from(dynamicButtons);
      console.log('🔧 Found buttons:', buttons.length);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ buttons }),
      };
    }

    // POST - Create new button
    if (event.httpMethod === "POST") {
      console.log('🔧 Processing POST request...');
      let body;
      try {
        body = JSON.parse(event.body);
        console.log('🔧 Parsed body keys:', Object.keys(body));
        console.log('🔧 Body data:', { 
          number: body.number, 
          link: body.link, 
          hasImageData: !!body.imageData,
          imageDataType: body.imageData?.substring(0, 20) + '...' || 'none'
        });
      } catch (parseError) {
        console.error('🚨 JSON parse error:', parseError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid JSON in request body' })
        };
      }
      
      // Handle multipart form data (for image uploads)
      if (event.headers["content-type"]?.includes("multipart/form-data")) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            error: "File uploads not supported in serverless functions. Please use a direct image URL or upload to Cloudinary first." 
          }),
        };
      }

      // For direct image URL or base64 data
      let imageUrl = body.imageUrl;
      
      // If base64 image data is provided, upload to Cloudinary
      if (body.imageData && body.imageData.startsWith('data:image/')) {
        console.log('🔧 Uploading to Cloudinary...');
        try {
          const uploadResult = await cloudinary.uploader.upload(body.imageData, {
            folder: 'button-images',
            resource_type: 'image',
            timeout: 60000
          });
          imageUrl = uploadResult.secure_url;
          console.log('🔧 Cloudinary upload successful:', imageUrl);
        } catch (uploadError) {
          console.error('🚨 Cloudinary upload error:', uploadError);
          console.error('🚨 Upload error details:', JSON.stringify(uploadError, null, 2));
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
              error: 'Failed to upload image to Cloudinary',
              details: uploadError.message,
              timestamp: new Date().toISOString()
            }),
          };
        }
      }

      if (!imageUrl) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'No image URL or image data provided' }),
        };
      }

      const buttonData = {
        number: body.number,
        imageUrl: imageUrl,
        link: body.link
      };

      console.log('🔧 Creating button with data:', buttonData);
      
      // Basic validation
      if (!buttonData.number || !buttonData.imageUrl || !buttonData.link) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required fields: number, imageUrl, link' }),
        };
      }
      
      console.log('🔧 Inserting button data into database:', buttonData);
      const [result] = await db
        .insert(dynamicButtons)
        .values(buttonData)
        .returning();
      console.log('🔧 Button created successfully:', result);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, button: result }),
      };
    }

    // DELETE - Remove button by number (handled by buttons-delete function)
    if (event.httpMethod === "DELETE") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: "DELETE requests should go to buttons-delete function" }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };

  } catch (error) {
    console.error("🚨 Buttons API error:", error.message);
    console.error("🚨 Stack trace:", error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Internal server error", 
        details: error.message,
        timestamp: new Date().toISOString()
      }),
    };
  }
};