import { db } from "./shared/db.js";
import { dynamicButtons, insertDynamicButtonSchema } from "./shared/schema.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const handler = async (event, context) => {
  console.log('🔧 Buttons function called:', event.httpMethod, event.path);
  console.log('🔧 Environment check:', {
    hasDatabase: !!process.env.DATABASE_URL,
    hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME
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
      const body = JSON.parse(event.body);
      
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
        try {
          const uploadResult = await cloudinary.uploader.upload(body.imageData, {
            folder: 'button-images'
          });
          imageUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error('Cloudinary upload error:', uploadError);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to upload image' }),
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
      const button = insertDynamicButtonSchema.parse(buttonData);
      const [result] = await db
        .insert(dynamicButtons)
        .values(button)
        .returning();
      
      console.log('🔧 Button created successfully:', result);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, button: result }),
      };
    }

    // DELETE - Remove button by number
    if (event.httpMethod === "DELETE") {
      const pathParts = event.path.split('/');
      const number = pathParts[pathParts.length - 1];
      
      if (!number) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Button number required" }),
        };
      }

      const result = await db
        .delete(dynamicButtons)
        .where(eq(dynamicButtons.number, number));

      const success = (result.rowCount ?? 0) > 0;

      if (success) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, message: "Button deleted" }),
        };
      } else {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: "Button not found" }),
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };

  } catch (error) {
    console.error("🚨 Buttons API error:", error.message);
    console.error("🚨 Stack trace:", error.stack);
    
    if (error instanceof z.ZodError) {
      console.error("🚨 Validation error:", error.errors);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid input", details: error.errors }),
      };
    }

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