import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Use the HTTP endpoint for better serverless compatibility
const sql = neon(process.env.DATABASE_URL);

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