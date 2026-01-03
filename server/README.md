# Glam Tips Backend API

Backend API for the Glam Tips luxury nail salon website.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Database Setup

See the detailed MySQL Workbench setup guide below.

### 3. Environment Configuration

1. Copy `.env.example` to `.env`
2. Update the database credentials in `.env`
3. Update other configuration as needed

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

### Appointments

- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Book new appointment
- `PATCH /api/appointments/:id/status` - Update appointment status (Admin)
- `GET /api/appointments/availability/:date` - Get available time slots for a date
- `DELETE /api/appointments/:id` - Delete appointment (Admin)

### Gallery

- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get gallery item by ID
- `POST /api/gallery` - Create new gallery item (Admin)
- `PUT /api/gallery/:id` - Update gallery item (Admin)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin)

### Health Check

- `GET /api/health` - Check if API is running

## Database Schema

The database consists of three main tables:

- `services` - Stores salon services
- `appointments` - Stores customer appointments
- `gallery` - Stores gallery images

See `database/schema.sql` for the complete schema.

## Technologies Used

- Node.js
- Express.js
- MySQL
- CORS
- dotenv
