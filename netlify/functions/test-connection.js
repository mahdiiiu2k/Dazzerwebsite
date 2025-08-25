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
    console.log('🔧 Testing connection with different methods...');
    
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "No DATABASE_URL" }),
      };
    }

    console.log('🔧 DATABASE_URL exists, trying connection...');
    console.log('🔧 URL structure:', {
      hasPostgresql: dbUrl.startsWith('postgresql://'),
      hasHost: dbUrl.includes('.supabase.co'),
      length: dbUrl.length
    });

    // Try basic fetch to test connectivity
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(dbUrl);
      
      console.log('🔧 Attempting simple query...');
      const result = await sql`SELECT 1 as test, NOW() as timestamp`;
      console.log('🔧 Query successful!', result);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true,
          message: "Database connection successful",
          result: result[0],
          timestamp: new Date().toISOString()
        }),
      };
      
    } catch (dbError) {
      console.error('🚨 Database query error:', dbError);
      
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: "Database query failed",
          details: dbError.message,
          errorType: dbError.constructor.name,
          stack: dbError.stack,
          timestamp: new Date().toISOString()
        }),
      };
    }
    
  } catch (error) {
    console.error('🚨 General error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: "Connection test failed",
        details: error.message,
        timestamp: new Date().toISOString()
      }),
    };
  }
};