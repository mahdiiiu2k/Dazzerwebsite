import { db } from "./shared/simple-db.js";

export const handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "DELETE, OPTIONS",
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

  if (event.httpMethod !== "DELETE") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    console.log('🔧 Delete function called with path:', event.path);
    
    // Extract number from URL path like /api/buttons/:number
    const pathParts = event.path.split('/');
    const number = pathParts[pathParts.length - 1];
    
    console.log('🔧 Extracted number:', number);
    
    if (!number || number === 'buttons-delete') {
      console.log('🚨 No number provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Button number required" }),
      };
    }

    console.log('🔧 Attempting to delete button with number:', number);
    const result = await db.deleteButton(number);
    
    console.log('🔧 Delete result:', result);
    
    if (result) {
      console.log('🔧 Button deleted successfully');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: "Button deleted" }),
      };
    } else {
      console.log('🔧 Button not found');
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: "Button not found" }),
      };
    }

  } catch (error) {
    console.error("Button deletion error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};