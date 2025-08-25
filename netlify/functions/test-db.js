import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    console.log('🔧 Testing database connection...');
    console.log('🔧 DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('🔧 DATABASE_URL starts with:', process.env.DATABASE_URL?.substring(0, 20) + '...');

    if (!process.env.DATABASE_URL) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: "DATABASE_URL not set in environment variables",
          hasDbUrl: false
        }),
      };
    }

    const sql = neon(process.env.DATABASE_URL);
    
    // Test simple query
    const result = await sql`SELECT 1 as test`;
    console.log('🔧 Database test successful:', result);

    // Test if our table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'dynamic_buttons'
      );
    `;
    
    const tableExists = tableCheck[0]?.exists;
    console.log('🔧 Table exists:', tableExists);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        connection: "OK",
        tableExists: tableExists,
        timestamp: new Date().toISOString()
      }),
    };

  } catch (error) {
    console.error('🚨 Database test error:', error.message);
    console.error('🚨 Full error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Database connection failed",
        details: error.message,
        hasDbUrl: !!process.env.DATABASE_URL,
        timestamp: new Date().toISOString()
      }),
    };
  }
};