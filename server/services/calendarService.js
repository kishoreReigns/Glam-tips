import { google } from "googleapis";

// Google Calendar configuration
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";
const TIMEZONE = "America/New_York"; // Change to your timezone

// Initialize Google Calendar API
let calendar = null;

// Initialize OAuth2 client with service account or OAuth credentials
const initializeCalendar = () => {
  try {
    console.log("🔄 Initializing Google Calendar...");
    console.log("Environment check:");
    console.log(
      "- GOOGLE_SERVICE_ACCOUNT_KEY:",
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY ? "✅ Present" : "❌ Missing"
    );
    console.log(
      "- GOOGLE_CALENDAR_ID:",
      process.env.GOOGLE_CALENDAR_ID || "❌ Not set (using 'primary')"
    );

    // Option 1: Using Service Account (Recommended for server-side)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      const serviceAccountKey = JSON.parse(
        process.env.GOOGLE_SERVICE_ACCOUNT_KEY
      );
      console.log("- Service Account Email:", serviceAccountKey.client_email);

      const auth = new google.auth.GoogleAuth({
        credentials: serviceAccountKey,
        scopes: ["https://www.googleapis.com/auth/calendar"],
      });

      calendar = google.calendar({ version: "v3", auth });
      console.log("✅ Google Calendar initialized with Service Account");
      console.log("📅 Calendar events will be created in:", CALENDAR_ID);
      return true;
    }

    // Option 2: Using OAuth2 credentials
    if (
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
    ) {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI ||
          "http://localhost:5000/oauth2callback"
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });

      calendar = google.calendar({ version: "v3", auth: oauth2Client });
      console.log("✅ Google Calendar initialized with OAuth2");
      return true;
    }

    console.warn(
      "⚠️ Google Calendar not configured - events will not be synced"
    );
    console.warn("To enable calendar integration:");
    console.warn("1. Set GOOGLE_SERVICE_ACCOUNT_KEY environment variable");
    console.warn("2. Set GOOGLE_CALENDAR_ID environment variable (optional)");
    console.warn("3. Share your calendar with the service account email");
    return false;
  } catch (error) {
    console.error("❌ Error initializing Google Calendar:", error.message);
    console.error("Full error:", error);
    return false;
  }
};

// Initialize on module load
const isCalendarEnabled = initializeCalendar();

// Create calendar event for appointment
export const createCalendarEvent = async (appointmentDetails) => {
  console.log("📅 Attempting to create calendar event...");
  console.log("Calendar enabled:", isCalendarEnabled);
  console.log("Calendar object:", calendar ? "Initialized" : "Not initialized");

  if (!isCalendarEnabled || !calendar) {
    console.log("⚠️ Calendar integration disabled - skipping event creation");
    console.log(
      "Reason: Calendar not properly configured with Google credentials"
    );
    return { success: false, message: "Calendar not configured" };
  }

  const {
    name,
    email,
    phone,
    appointment_date,
    appointment_time,
    service,
    appointmentId,
    message,
  } = appointmentDetails;

  try {
    // Parse date and time
    const [hours, minutes] =
      appointment_time.includes("AM") || appointment_time.includes("PM")
        ? parseTime12Hour(appointment_time)
        : appointment_time.split(":").map(Number);

    const startDateTime = new Date(appointment_date);
    startDateTime.setHours(hours, minutes, 0);

    // Default 1-hour duration (adjust based on service)
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

    const event = {
      summary: `${service} - ${name}`,
      description: `
Booking Details:
- Customer: ${name}
- Email: ${email}
- Phone: ${phone}
- Service: ${service}
- Booking ID: #${appointmentId}
${message ? `- Notes: ${message}` : ""}

Booked via Glam Tips Website
      `.trim(),
      location: "Glam Tips Nail Salon, 123 Beauty Street, Glamour City",
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: TIMEZONE,
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 60 }, // 1 hour before
        ],
      },
      colorId: "10", // Basil (greenish) - you can change this
    };

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });

    console.log("✅ Calendar event created successfully!");
    console.log("Event ID:", response.data.id);
    console.log("Event link:", response.data.htmlLink);

    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error("❌ Error creating calendar event:");
    console.error("Error:", error.message);
    if (error.errors) {
      console.error("Details:", error.errors);
    }
    return {
      success: false,
      error: error.message,
    };
  }
};

// Update calendar event (for rescheduling)
export const updateCalendarEvent = async (eventId, appointmentDetails) => {
  if (!isCalendarEnabled || !calendar) {
    return { success: false, message: "Calendar not configured" };
  }

  const { appointment_date, appointment_time } = appointmentDetails;

  try {
    const [hours, minutes] =
      appointment_time.includes("AM") || appointment_time.includes("PM")
        ? parseTime12Hour(appointment_time)
        : appointment_time.split(":").map(Number);

    const startDateTime = new Date(appointment_date);
    startDateTime.setHours(hours, minutes, 0);

    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

    const response = await calendar.events.patch({
      calendarId: CALENDAR_ID,
      eventId: eventId,
      resource: {
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: TIMEZONE,
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: TIMEZONE,
        },
      },
    });

    console.log("✅ Calendar event updated successfully!");
    return { success: true, eventId: response.data.id };
  } catch (error) {
    console.error("❌ Error updating calendar event:", error.message);
    return { success: false, error: error.message };
  }
};

// Cancel calendar event
export const cancelCalendarEvent = async (eventId) => {
  if (!isCalendarEnabled || !calendar) {
    return { success: false, message: "Calendar not configured" };
  }

  try {
    await calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId: eventId,
    });

    console.log("✅ Calendar event cancelled successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Error cancelling calendar event:", error.message);
    return { success: false, error: error.message };
  }
};

// Helper function to parse 12-hour time format
const parseTime12Hour = (timeStr) => {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return [hours, minutes || 0];
};

export default {
  createCalendarEvent,
  updateCalendarEvent,
  cancelCalendarEvent,
};
