import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create PostgreSQL connection pool
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
});

// Test connection
async function testConnection() {
  try {
    console.log("🔄 Testing PostgreSQL connection...");
    console.log(`Host: ${process.env.POSTGRES_HOST}`);
    console.log(`User: ${process.env.POSTGRES_USER}`);
    console.log(`Database: ${process.env.POSTGRES_DB}`);
    console.log(`Port: ${process.env.POSTGRES_PORT}`);
    console.log("");

    const result = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL connection successful!");
    console.log("Current time from database:", result.rows[0].now);
    console.log("");

    // Test if tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    if (tablesResult.rows.length > 0) {
      console.log("✅ Tables found in database:");
      tablesResult.rows.forEach((row) => {
        console.log(`  - ${row.table_name}`);
      });
      console.log("");

      // Count records in each table
      for (const row of tablesResult.rows) {
        const countResult = await pool.query(
          `SELECT COUNT(*) FROM ${row.table_name}`
        );
        console.log(
          `  ${row.table_name}: ${countResult.rows[0].count} records`
        );
      }
    } else {
      console.log("⚠️  No tables found. Please run schema_postgres.sql");
    }

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.error("");
    console.error("Troubleshooting steps:");
    console.error("1. Make sure PostgreSQL is installed and running");
    console.error("2. Verify .env file has correct POSTGRES_* variables");
    console.error(
      '3. Create database: psql -U postgres -c "CREATE DATABASE glam_tips_db;"'
    );
    console.error(
      "4. Run schema: psql -U postgres -d glam_tips_db -f database/schema_postgres.sql"
    );
    await pool.end();
    process.exit(1);
  }
}

testConnection();
