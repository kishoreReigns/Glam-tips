import { config } from "dotenv";
import { google } from "googleapis";

config();

console.log("🔍 Testing Google Calendar Configuration...\n");

// Check environment variables
console.log("Environment Variables:");
console.log(
  "✓ GOOGLE_SERVICE_ACCOUNT_KEY:",
  process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    ? "Present (" +
        process.env.GOOGLE_SERVICE_ACCOUNT_KEY.substring(0, 50) +
        "...)"
    : "❌ Missing"
);
console.log(
  "✓ GOOGLE_CALENDAR_ID:",
  process.env.GOOGLE_CALENDAR_ID || "❌ Missing"
);
console.log("");

// Try to initialize calendar
if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  try {
    const serviceAccountKey = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    );
    console.log("✅ Service account key parsed successfully");
    console.log("   Project ID:", serviceAccountKey.project_id);
    console.log("   Client Email:", serviceAccountKey.client_email);
    console.log("");

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });
    console.log("✅ Google Calendar API initialized successfully!");
    console.log("");
    console.log("🎉 Calendar integration is ready to use!");
  } catch (error) {
    console.error("❌ Error initializing calendar:", error.message);
    console.error("");
    console.error("Details:", error);
  }
} else {
  console.log("❌ GOOGLE_SERVICE_ACCOUNT_KEY not found");
  console.log("");
  console.log("Calendar events will NOT be created.");
  console.log("");
  console.log("To fix this in Vercel:");
  console.log(
    "1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables"
  );
  console.log("2. Add GOOGLE_SERVICE_ACCOUNT_KEY with the JSON credentials");
  console.log("3. Add GOOGLE_CALENDAR_ID with your calendar ID");
  console.log("4. Redeploy the application");
}
