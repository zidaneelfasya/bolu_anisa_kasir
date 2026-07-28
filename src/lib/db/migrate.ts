import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL is not set!');
  process.exit(1);
}

const sql = postgres(connectionString, { prepare: false });

async function migrate() {
  try {
    console.log('Running ALTER TABLE...');
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS barcode text UNIQUE;`;
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url text;`;
    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await sql.end();
  }
}

migrate();
