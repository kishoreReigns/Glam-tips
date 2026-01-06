# Migration Complete: MySQL → PostgreSQL

## ✅ Changes Made

### 1. Environment Variables (.env)

- Changed `DB_HOST` → `POSTGRES_HOST`
- Changed `DB_USER` → `POSTGRES_USER`
- Changed `DB_PASSWORD` → `POSTGRES_PASSWORD`
- Changed `DB_NAME` → `POSTGRES_DB`
- Changed `DB_PORT` → `POSTGRES_PORT` (5432)

### 2. Database Configuration (config/db.js)

- Replaced `mysql2/promise` with `pg` (PostgreSQL driver)
- Changed from `mysql.createPool()` to `new Pool()`
- Updated to use POSTGRES\_\* environment variables

### 3. Database Schema (database/schema_postgres.sql)

**Key Changes:**

- `AUTO_INCREMENT` → `SERIAL`
- `ENUM('pending', 'confirmed', ...)` → `VARCHAR with CHECK constraint`
- `TEXT` → `TEXT` (same in PostgreSQL)
- `VARCHAR(255)` remains the same
- `DATETIME` → `TIMESTAMP`
- `DECIMAL(10, 2)` remains the same
- `JSON` → `JSONB` (for better performance)

### 4. Route Files Converted

All SQL queries converted from MySQL to PostgreSQL syntax:

**appointments.js:**

- Replaced `?` placeholders with `$1, $2, $3...`
- Changed `result.insertId` → `result.rows[0].id`
- Changed `result.affectedRows` → `result.rowCount`
- Changed `const [rows] = await pool.query()` → `const result = await pool.query(); const rows = result.rows`
- Added `RETURNING id` to INSERT statements

**services.js:**

- Same query syntax updates as appointments.js
- Updated result handling

**gallery.js:**

- Same query syntax updates as appointments.js
- Updated result handling

### 5. NPM Packages

- ❌ Removed: `mysql2`
- ✅ Added: `pg` (PostgreSQL client)

## 📋 What You Need to Do

### 1. Install PostgreSQL

If not already installed:

- Download from: https://www.postgresql.org/download/
- During installation, set postgres user password to: `Excel@123`
- Default port: `5432`

### 2. Create Database

Open Command Prompt and run:

```bash
psql -U postgres
```

Then:

```sql
CREATE DATABASE glam_tips_db;
\c glam_tips_db
\i 'D:/Projects/Glam-tips/server/database/schema_postgres.sql'
```

Or use pgAdmin (GUI tool) to create database and run the schema file.

### 3. Start the Server

```bash
cd server
npm run dev
```

You should see:

```
✅ PostgreSQL database connected successfully
Server running on port 5000
```

## 📊 Backup Files Created

Your original MySQL files are backed up:

- `routes/appointments_mysql_backup.js`
- `routes/services_mysql_backup.js`
- `routes/gallery_mysql_backup.js`

## 🔍 Testing Checklist

After database is set up:

- [ ] Server starts without errors
- [ ] GET /api/services returns sample services
- [ ] GET /api/gallery returns sample gallery items
- [ ] POST /api/appointments creates new booking
- [ ] Email confirmation works
- [ ] Google Calendar event created
- [ ] GET /api/appointments/available-slots/:date shows available times
- [ ] Admin dashboard loads data
- [ ] Customer can reschedule/cancel bookings

## 📚 Documentation

Detailed setup instructions: `database/POSTGRESQL_SETUP.md`

## ⚠️ Important Notes

1. **Fresh Database**: PostgreSQL database starts empty with sample data from schema
2. **No Data Migration**: Old MySQL data is NOT automatically migrated
3. **Connection String**: Uses individual env vars (HOST, USER, PASSWORD, DB, PORT)
4. **Port Change**: MySQL used 3306, PostgreSQL uses 5432
5. **Email & Calendar**: No changes needed - still using existing configuration

## 🆘 Troubleshooting

If connection fails:

1. Verify PostgreSQL is running (Windows Services)
2. Check .env file has correct POSTGRES\_\* variables
3. Verify password: `Excel@123`
4. Test connection: `psql -U postgres -d glam_tips_db`

See `POSTGRESQL_SETUP.md` for detailed troubleshooting.
