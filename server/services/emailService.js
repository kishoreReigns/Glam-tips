import { createTransport } from "nodemailer";

// Email credentials
const EMAIL_USER = process.env.EMAIL_USER || "theglamtips01@gmail.com";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "oetxuhyrgfkpmnam";

console.log("📧 Email Service Initialized");
console.log("Email account:", EMAIL_USER);
console.log("Password configured:", EMAIL_PASSWORD ? "Yes" : "No");

// Create transporter
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Send booking confirmation email
export const sendBookingConfirmation = async (appointmentDetails) => {
  const {
    name,
    email,
    appointment_date,
    appointment_time,
    service,
    appointmentId,
  } = appointmentDetails;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "✨ Booking Confirmation - Glam Tips Nail Salon",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
          }
          .details {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #ff69b4;
            border-radius: 5px;
          }
          .detail-row {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .value {
            color: #ff69b4;
            font-weight: bold;
          }
          .footer {
            background: #333;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 10px 10px;
          }
          .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #ff69b4;
            color: white;
            text-decoration: none;
            border-radius: 25px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Booking Confirmed!</h1>
            <p>Your glamorous experience awaits</p>
          </div>
          
          <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for choosing Glam Tips Nail Salon! We're excited to pamper you with our luxury nail care services.</p>
            
            <div class="details">
              <h3 style="color: #ff69b4; margin-top: 0;">Appointment Details</h3>
              <div class="detail-row">
                <span class="label">Booking ID:</span>
                <span class="value">#${appointmentId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Service:</span>
                <span class="value">${service}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date:</span>
                <span class="value">${new Date(
                  appointment_date
                ).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time:</span>
                <span class="value">${appointment_time}</span>
              </div>
            </div>
            
            <h3 style="color: #ff69b4;">What to Expect</h3>
            <ul>
              <li>Please arrive 5-10 minutes before your appointment</li>
              <li>Our expert nail technicians will provide personalized care</li>
              <li>Complimentary beverages will be served during your service</li>
            </ul>
            
            <p><strong>Need to reschedule or cancel?</strong><br>
            Please contact us at least 24 hours in advance:<br>
            📞 Phone: (555) 123-4567<br>
            📧 Email: info@glamtips.com</p>
            
            <center>
              <a href="http://localhost:3000/my-bookings?email=${email}" class="btn">
                Manage My Booking
              </a>
            </center>
          </div>
          
          <div class="footer">
            <p><strong>Glam Tips Nail Salon</strong></p>
            <p>123 Beauty Street, Glamour City, GC 12345</p>
            <p>📞 (555) 123-4567 | 📧 info@glamtips.com</p>
            <p style="font-size: 12px; margin-top: 15px;">
              Follow us on social media for the latest nail trends and promotions!
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    console.log("Attempting to send confirmation email to:", email);
    console.log("Using email account:", EMAIL_USER);
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Confirmation email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Recipient:", email);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    return { success: false, error: error.message };
  }
};

// Send cancellation email
export const sendCancellationEmail = async (appointmentDetails) => {
  const {
    name,
    email,
    appointment_date,
    appointment_time,
    service,
    appointmentId,
  } = appointmentDetails;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Appointment Cancelled - Glam Tips Nail Salon",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #666; color: white; padding: 30px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Appointment Cancelled</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Your appointment (#${appointmentId}) for ${service} on ${new Date(
      appointment_date
    ).toLocaleDateString()} at ${appointment_time} has been cancelled.</p>
            <p>We hope to see you again soon! You can book a new appointment anytime on our website.</p>
            <p>Best regards,<br>Glam Tips Nail Salon Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Cancellation email sent to:", email);
    return { success: true };
  } catch (error) {
    console.error("Error sending cancellation email:", error);
    return { success: false, error: error.message };
  }
};

// Send reschedule confirmation email
export const sendRescheduleEmail = async (appointmentDetails) => {
  const {
    name,
    email,
    appointment_date,
    appointment_time,
    service,
    appointmentId,
  } = appointmentDetails;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "✨ Appointment Rescheduled - Glam Tips Nail Salon",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%); color: white; padding: 30px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
          .highlight { color: #ff69b4; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Appointment Rescheduled</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Your appointment (#${appointmentId}) has been successfully rescheduled!</p>
            <p><strong>New Appointment Details:</strong></p>
            <ul>
              <li>Service: <span class="highlight">${service}</span></li>
              <li>Date: <span class="highlight">${new Date(
                appointment_date
              ).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</span></li>
              <li>Time: <span class="highlight">${appointment_time}</span></li>
            </ul>
            <p>We look forward to seeing you!</p>
            <p>Best regards,<br>Glam Tips Nail Salon Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reschedule email sent to:", email);
    return { success: true };
  } catch (error) {
    console.error("Error sending reschedule email:", error);
    return { success: false, error: error.message };
  }
};
