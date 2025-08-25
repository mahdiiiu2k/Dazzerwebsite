import { db } from "./shared/db.js";
import { dynamicButtons } from "./shared/schema.js";
import { eq } from "drizzle-orm";

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
    // Extract number from URL path like /api/buttons/:number
    const pathParts = event.path.split('/');
    const number = pathParts[pathParts.length - 1];
    
    if (!number || number === 'buttons-delete') {
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

  } catch (error) {
    console.error("Button deletion error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};