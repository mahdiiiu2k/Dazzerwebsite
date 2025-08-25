import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Configure postgres for serverless Supabase connection
const sql = postgres(process.env.DATABASE_URL, {
  host: 'aws-1-eu-north-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  username: 'postgres.oprhpgnmfckswynfkstk',
  password: 'Mahdi:2006',
  ssl: 'require',
  connection: {
    options: '--search_path=public',
  },
  max: 1, // Important for serverless
});

// Simple database functions without Drizzle ORM
export const db = {
  async getButtons() {
    const result = await sql`SELECT * FROM dynamic_buttons ORDER BY id`;
    return result;
  },
  
  async createButton(data) {
    const { number, imageUrl, link } = data;
    const result = await sql`
      INSERT INTO dynamic_buttons (number, image_url, link) 
      VALUES (${number}, ${imageUrl}, ${link}) 
      RETURNING *
    `;
    return result[0];
  },
  
  async deleteButton(number) {
    const result = await sql`
      DELETE FROM dynamic_buttons 
      WHERE number = ${number} 
      RETURNING *
    `;
    return result[0];
  }
};