# PostgreSQL Setup Guide for Glam Tips

## Prerequisites

- PostgreSQL installed on your system
- pgAdmin (optional, for GUI management)

## Step 1: Install PostgreSQL

If you don't have PostgreSQL installed:

### Windows:

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation, set a password for the postgres user (use: Excel@123)
4. Note the port (default: 5432)

### Verify Installation:

```bash
psql --version
```

## Step 2: Create Database

### Option A: Using Command Line (psql)

1. Open Command Prompt or PowerShell as Administrator
2. Connect to PostgreSQL:

```bash
psql -U postgres
```

Enter password: Excel@123

3. Create the database:

```sql
CREATE DATABASE glam_tips_db;
```

4. Connect to the database:

```sql
\c glam_tips_db
```

5. Run the schema file:

```sql
\i 'D:/Projects/Glam-tips/server/database/schema_postgres.sql'
```

Or copy and paste the contents of schema_postgres.sql

6. Verify tables were created:

```sql
\dt
```

You should see:

- services
- appointments
- gallery

7. Exit psql:

```sql
\q
```

### Option B: Using pgAdmin (GUI)

1. Open pgAdmin
2. Connect to PostgreSQL server (localhost)
3. Right-click on "Databases" → Create → Database
4. Name: glam_tips_db
5. Click Save
6. Right-click on glam_tips_db → Query Tool
7. Open and run the schema_postgres.sql file

## Step 3: Verify Environment Variables

Check your server/.env file has these settings:

```env
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Excel@123
POSTGRES_DB=glam_tips_db
POSTGRES_PORT=5432
```

## Step 4: Test Database Connection

1. Start the backend server:

```bash
cd server
npm run dev
```

2. You should see:

```
✅ PostgreSQL database connected successfully
Server running on port 5000
```

## Step 5: Verify Data

Test with a query tool or pgAdmin:

```sql
-- Check services
SELECT * FROM services;

-- Check if sample data was inserted
SELECT COUNT(*) FROM services;
-- Should return 6

SELECT COUNT(*) FROM gallery;
-- Should return 6
```

## Troubleshooting

### Error: "password authentication failed"

- Verify password in .env matches PostgreSQL user password
- Try resetting postgres user password:

```sql
ALTER USER postgres PASSWORD 'Excel@123';
```

### Error: "database does not exist"

- Make sure you created the database: `CREATE DATABASE glam_tips_db;`
- Check database name spelling in .env

### Error: "relation does not exist"

- Tables not created yet
- Run schema_postgres.sql

### Error: "could not connect to server"

- Verify PostgreSQL is running:
  - Windows: Check Services (services.msc) for "postgresql-x64-xx"
  - Or start it: `pg_ctl -D "C:\Program Files\PostgreSQL\XX\data" start`

### Port already in use

- Check if PostgreSQL is using default port:

```sql
SELECT * FROM pg_settings WHERE name = 'port';
```

- Update POSTGRES_PORT in .env if different

## Migration from MySQL

If you're migrating from MySQL:

1. Your old MySQL data is in the database, but PostgreSQL is a fresh install
2. To migrate data, you'll need to export from MySQL and import to PostgreSQL
3. Or just use the sample data provided in schema_postgres.sql

## Key Differences from MySQL

### Syntax Changes:

- **Placeholders**: PostgreSQL uses `$1, $2, $3` instead of `?`
- **Auto-increment**: PostgreSQL uses `SERIAL` instead of `AUTO_INCREMENT`
- **Boolean**: PostgreSQL has native `BOOLEAN` type
- **Result**: PostgreSQL returns `result.rows` and `result.rowCount`

### Example Query Differences:

**MySQL:**

```javascript
const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
if (result.affectedRows === 0) { ... }
```

**PostgreSQL:**

```javascript
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
const rows = result.rows;
if (result.rowCount === 0) { ... }
```

## Next Steps

After database is set up:

1. Test the API endpoints
2. Test booking functionality
3. Verify email notifications work
4. Check Google Calendar integration

## Useful PostgreSQL Commands

```sql
-- List all databases
\l

-- Connect to database
\c glam_tips_db

-- List all tables
\dt

-- Describe table structure
\d appointments

-- View table data
SELECT * FROM appointments LIMIT 10;

-- Drop database (careful!)
DROP DATABASE glam_tips_db;
```
