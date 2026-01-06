import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
  ssl:
    process.env.POSTGRES_SSL === "true"
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

async function setupDatabase() {
  try {
    console.log("🚀 Starting database setup...\n");

    // Test connection
    console.log("🔄 Connecting to Neon database...");
    const client = await pool.connect();
    console.log("✅ Connected successfully!\n");

    // Read schema file
    const schemaPath = path.join(__dirname, "database", "schema_postgres.sql");
    console.log("📄 Reading schema file...");
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Execute schema
    console.log("🔨 Creating tables and inserting sample data...\n");
    await client.query(schema);
    console.log("✅ Schema executed successfully!\n");

    // Verify tables
    console.log("🔍 Verifying tables...");
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log("✅ Tables created:");
    for (const row of tablesResult.rows) {
      const countResult = await client.query(
        `SELECT COUNT(*) FROM ${row.table_name}`
      );
      console.log(
        `   📊 ${row.table_name}: ${countResult.rows[0].count} records`
      );
    }

    console.log("\n🎉 Database setup complete!");
    console.log("\n📝 Next steps:");
    console.log("   1. Start the server: npm run dev");
    console.log("   2. Test API endpoints");
    console.log("   3. Your Glam Tips app is ready to use!\n");

    client.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    console.error("\nError details:", error);
    await pool.end();
    process.exit(1);
  }
}

setupDatabase();
