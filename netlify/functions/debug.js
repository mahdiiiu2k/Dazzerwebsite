export const handler = async (event, context) => {
  console.log('🔧 Debug function called');
  
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
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeVersion: process.version,
        hasDatabase: !!process.env.DATABASE_URL,
        hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
        databaseUrl: process.env.DATABASE_URL ? '***SET***' : 'NOT SET'
      },
      request: {
        method: event.httpMethod,
        path: event.path,
        headers: event.headers
      }
    };

    console.log('🔧 Debug info:', debugInfo);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(debugInfo),
    };
  } catch (error) {
    console.error('🚨 Debug function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};