# MySQL Workbench Setup Guide for Glam Tips

Complete step-by-step guide to set up your MySQL database using MySQL Workbench.

## Prerequisites

- MySQL Server installed on your computer
- MySQL Workbench installed (comes with MySQL installer)

If you don't have MySQL installed, download it from: https://dev.mysql.com/downloads/mysql/

---

## Step 1: Open MySQL Workbench

1. Open **MySQL Workbench** from your applications/start menu
2. You should see the home screen with MySQL Connections

---

## Step 2: Create a New Connection (If Not Already Connected)

1. Click the **"+"** icon next to "MySQL Connections"
2. Fill in the connection details:
   - **Connection Name:** Glam Tips Local
   - **Hostname:** 127.0.0.1 (or localhost)
   - **Port:** 3306
   - **Username:** root (or your MySQL username)
3. Click **"Test Connection"**
4. Enter your MySQL password when prompted
5. If successful, click **"OK"** to save the connection

---

## Step 3: Connect to MySQL Server

1. Double-click on your connection (e.g., "Glam Tips Local")
2. Enter your password if prompted
3. You should now see the MySQL Workbench Query Editor

---

## Step 4: Create the Database

**Method A: Using the SQL Script (Recommended)**

1. In MySQL Workbench, click **File → Open SQL Script**
2. Navigate to your project folder: `d:\Projects\Glam-tips\server\database\`
3. Select and open `schema.sql`
4. You'll see the SQL script in the editor
5. Click the **lightning bolt icon** (⚡) in the toolbar to execute the entire script
   - Or press **Ctrl + Shift + Enter**
6. Wait for execution to complete
7. You should see success messages in the Output panel

**Method B: Manual Step-by-Step**

If you prefer to run commands step by step:

1. Copy the following command and paste it into the query editor:
   ```sql
   CREATE DATABASE IF NOT EXISTS glam_tips_db;
   ```
2. Click the lightning bolt to execute
3. Then run:
   ```sql
   USE glam_tips_db;
   ```

---

## Step 5: Verify Database Creation

1. Look at the **Schemas** panel on the left side of MySQL Workbench
2. Click the **refresh icon** (↻) in the Schemas panel
3. You should now see **glam_tips_db** in the list
4. Click the triangle (▶) next to **glam_tips_db** to expand it
5. Expand **Tables** - you should see:
   - `appointments`
   - `gallery`
   - `services`

---

## Step 6: Verify Tables Were Created

1. In the Schemas panel, right-click on **glam_tips_db**
2. Select **"Set as Default Schema"** (it will appear bold)
3. Run this query to check tables:
   ```sql
   SHOW TABLES;
   ```
4. You should see all three tables listed

---

## Step 7: Verify Sample Data

Check if sample data was inserted successfully:

**Check Services:**

```sql
SELECT * FROM services;
```

You should see 6 services (Luxury Spa Manicure, Deluxe Pedicure, etc.)

**Check Gallery:**

```sql
SELECT * FROM gallery;
```

You should see 6 gallery items

**Check Appointments Table Structure:**

```sql
DESCRIBE appointments;
```

This shows the structure is ready (it will be empty initially)

---

## Step 8: Configure Your Backend

1. Open the file: `d:\Projects\Glam-tips\server\.env`
2. Update the database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
   DB_NAME=glam_tips_db
   DB_PORT=3306
   ```
3. Replace `YOUR_MYSQL_PASSWORD_HERE` with your actual MySQL password
4. Save the file

---

## Step 9: Install Backend Dependencies

1. Open a terminal/command prompt
2. Navigate to the server folder:
   ```bash
   cd d:\Projects\Glam-tips\server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Step 10: Start the Backend Server

```bash
npm run dev
```

You should see:

```
✅ Database connected successfully
🚀 Server is running on http://localhost:5000
```

---

## Step 11: Test the API

Open your browser or use a tool like Postman to test:

- **Health Check:** http://localhost:5000/api/health
- **Get Services:** http://localhost:5000/api/services
- **Get Gallery:** http://localhost:5000/api/gallery

---

## Common Issues and Solutions

### Issue 1: "Access denied for user 'root'@'localhost'"

**Solution:** Your password is incorrect. Update the password in `.env` file.

### Issue 2: "Can't connect to MySQL server"

**Solution:**

- Make sure MySQL service is running
- On Windows: Open Services and start "MySQL80" (or your version)
- Or restart MySQL Workbench

### Issue 3: Tables not showing

**Solution:**

- Click refresh icon in Schemas panel
- Or run: `SHOW TABLES;` to verify

### Issue 4: "Database connection failed"

**Solution:**

- Verify MySQL is running
- Check your `.env` file credentials
- Ensure DB_NAME matches: `glam_tips_db`

### Issue 5: Port 5000 already in use

**Solution:** Change PORT in `.env` to 5001 or another available port

---

## Useful MySQL Workbench Tips

### View Table Data

1. Expand **glam_tips_db → Tables**
2. Right-click on a table (e.g., `services`)
3. Select **"Select Rows - Limit 1000"**

### Edit Table Data Manually

1. Right-click on table
2. Select **"Select Rows - Limit 1000"**
3. Click in the cell you want to edit
4. Make changes
5. Click **"Apply"** to save

### Backup Your Database

1. Click **Server → Data Export**
2. Select **glam_tips_db**
3. Choose export location
4. Click **"Start Export"**

### Run Custom Queries

You can always write and run custom SQL queries in the query editor:

```sql
-- Get all pending appointments
SELECT * FROM appointments WHERE status = 'pending';

-- Get appointments for today
SELECT * FROM appointments WHERE appointment_date = CURDATE();

-- Count services
SELECT COUNT(*) as total_services FROM services;
```

---

## Next Steps

1. ✅ Database is set up
2. ✅ Backend server is running
3. 📱 Update your React frontend to connect to the backend
4. 🎨 Test booking appointments through your frontend
5. 📊 View booked appointments in MySQL Workbench

---

## Support

If you encounter any issues:

1. Check the error message carefully
2. Verify all credentials in `.env` file
3. Make sure MySQL service is running
4. Check that the database name is exactly: `glam_tips_db`

Good luck with your Glam Tips project! 💅✨
