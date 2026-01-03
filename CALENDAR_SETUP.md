# Google Calendar Integration Setup Guide

## Overview

This guide will help you connect your Glam Tips booking system to your Google Calendar (theglamtips01@gmail.com) so that appointments are automatically added to your calendar.

## Setup Steps

### Step 1: Enable Google Calendar API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable Google Calendar API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Configure OAuth consent screen if prompted:
   - User Type: External
   - App name: Glam Tips Booking System
   - User support email: theglamtips01@gmail.com
   - Developer contact: theglamtips01@gmail.com
   - Add scope: `https://www.googleapis.com/auth/calendar`
4. Create OAuth Client ID:
   - Application type: Web application
   - Name: Glam Tips Server
   - Authorized redirect URIs: `http://localhost:5000/oauth2callback`
   - Click "Create"
5. **Save** the Client ID and Client Secret

### Step 3: Get Refresh Token

Run this Node.js script to get your refresh token:

```javascript
// getRefreshToken.js
import { google } from "googleapis";
import http from "http";
import url from "url";
import open from "open";

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:5000/oauth2callback";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  prompt: "consent",
});

console.log("Authorize this app by visiting this url:", authUrl);

// Create server to handle callback
const server = http.createServer(async (req, res) => {
  try {
    if (req.url.indexOf("/oauth2callback") > -1) {
      const qs = new url.URL(req.url, "http://localhost:5000").searchParams;
      const code = qs.get("code");

      res.end("Authentication successful! Please return to the console.");

      const { tokens } = await oauth2Client.getToken(code);
      console.log("\\n\\nYour Refresh Token:");
      console.log(tokens.refresh_token);
      console.log("\\nAdd this to your .env file as GOOGLE_REFRESH_TOKEN");

      server.close();
    }
  } catch (e) {
    console.error(e);
  }
});

server.listen(5000, () => {
  open(authUrl, { wait: false });
});
```

Run: `node getRefreshToken.js`

### Step 4: Update .env File

Add these variables to your `server/.env` file:

```env
# Google Calendar Integration
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_CALENDAR_ID=primary
GOOGLE_REDIRECT_URI=http://localhost:5000/oauth2callback
```

### Step 5: Update Database

Run the SQL migration to add calendar event tracking:

```bash
mysql -u root -p glam_tips_db < server/database/add_calendar_column.sql
```

Or manually in MySQL Workbench:

```sql
ALTER TABLE appointments
ADD COLUMN calendar_event_id VARCHAR(255) NULL AFTER status;
```

### Step 6: Restart Server

```bash
cd d:/Projects/Glam-tips/server
npm run dev
```

You should see: `✅ Google Calendar initialized with OAuth2`

## Testing

1. Make a test booking through your website
2. Check the server logs for: `✅ Calendar event created successfully!`
3. Check your Google Calendar at theglamtips01@gmail.com
4. The appointment should appear with customer details

## Features

✅ Automatic calendar event creation on booking
✅ Calendar invites sent to customers
✅ Event updates when rescheduling
✅ Event deletion when cancelling
✅ Customer email and phone in event description
✅ Booking ID reference
✅ 1-day and 1-hour reminders

## Troubleshooting

**"Calendar integration disabled"**

- Make sure all Google credentials are in .env file
- Restart the server after adding credentials

**"Invalid credentials"**

- Double-check Client ID, Client Secret, and Refresh Token
- Make sure the refresh token was generated with `access_type: 'offline'`

**"Insufficient permission"**

- Ensure Google Calendar API is enabled in Google Cloud Console
- Check that the OAuth consent screen includes calendar scope

## Alternative: Service Account (Easier for Production)

For production, consider using a Service Account instead:

1. Create Service Account in Google Cloud Console
2. Download JSON key file
3. Share your calendar with the service account email
4. Add to .env:

```env
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":...}'
```

This avoids the need for refresh tokens and OAuth flow.
