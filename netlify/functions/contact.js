import { db } from "./shared/db.js";
import { contacts, insertContactSchema } from "./shared/schema.js";
import { z } from "zod";

export const handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const contact = insertContactSchema.parse(JSON.parse(event.body));
    const [result] = await db
      .insert(contacts)
      .values(contact)
      .returning();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, contact: result }),
    };
  } catch (error) {
    console.error("Contact creation error:", error);
    
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid input", details: error.errors }),
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};