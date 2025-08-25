import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type", 
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    console.log('🔧 Setting up database...');
    
    if (!process.env.DATABASE_URL) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "DATABASE_URL not configured" }),
      };
    }

    const sql = neon(process.env.DATABASE_URL);
    
    // Create the dynamic_buttons table
    await sql`
      CREATE TABLE IF NOT EXISTS dynamic_buttons (
        id SERIAL PRIMARY KEY,
        number TEXT NOT NULL,
        image_url TEXT NOT NULL,
        link TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    console.log('🔧 Table created successfully');
    
    // Check if table exists and is empty
    const tableCheck = await sql`
      SELECT COUNT(*) as count FROM dynamic_buttons;
    `;
    
    const itemCount = parseInt(tableCheck[0].count);
    console.log('🔧 Items in table:', itemCount);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: "Database setup complete",
        itemCount: itemCount,
        timestamp: new Date().toISOString()
      }),
    };
    
  } catch (error) {
    console.error('🚨 Database setup error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Database setup failed",
        details: error.message,
        timestamp: new Date().toISOString()
      }),
    };
  }
};