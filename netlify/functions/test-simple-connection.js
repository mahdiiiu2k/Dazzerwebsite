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
    console.log('🔧 Testing simple connection...');
    console.log('🔧 DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('🔧 DATABASE_URL prefix:', process.env.DATABASE_URL?.substring(0, 30) + '...');
    
    // Test connection with minimal query
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('🔧 Executing simple query...');
    const result = await sql`SELECT 1 as test`;
    console.log('🔧 Simple query result:', result);

    // Test table existence
    console.log('🔧 Testing table existence...');
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'dynamic_buttons'
      )
    `;
    console.log('🔧 Table exists:', tableCheck);

    // If table exists, count rows
    let buttonCount = 0;
    if (tableCheck[0]?.exists) {
      const countResult = await sql`SELECT COUNT(*) FROM dynamic_buttons`;
      buttonCount = parseInt(countResult[0].count);
      console.log('🔧 Button count:', buttonCount);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        connection: "OK",
        tableExists: tableCheck[0]?.exists || false,
        buttonCount: buttonCount,
        timestamp: new Date().toISOString()
      }),
    };

  } catch (error) {
    console.error('🚨 Connection test failed:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Connection test failed",
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }),
    };
  }
};