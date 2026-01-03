-- Glam Tips Database Schema
-- MySQL Workbench Setup Script

-- Create Database
CREATE DATABASE IF NOT EXISTS glam_tips_db;
USE glam_tips_db;

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    description TEXT,
    features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_date_time (appointment_date, appointment_time),
    INDEX idx_status (status),
    INDEX idx_email (email)
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100) DEFAULT 'nail-art',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Sample Services Data
INSERT INTO services (title, price, duration, description, features) VALUES
('Luxury Spa Manicure', '$45', '60 min', 'Complete nail care with exfoliation, massage, and polish application.', 
 '["Nail shaping", "Cuticle care", "Hand massage", "Polish application"]'),
('Deluxe Pedicure', '$65', '75 min', 'Luxurious foot treatment including scrub, mask, and extended massage.', 
 '["Foot soak", "Callus removal", "Scrub & mask", "Extended massage"]'),
('Gel Manicure', '$55', '45 min', 'Long-lasting gel polish that stays perfect for up to 3 weeks.', 
 '["Nail prep", "Gel application", "UV curing", "Top coat"]'),
('Custom Nail Art', '$75+', '90 min', 'Hand-painted designs and intricate patterns tailored to your vision.', 
 '["Design consultation", "Hand-painted art", "Premium materials", "Finishing coat"]'),
('Gel Extensions', '$85', '120 min', 'Natural-looking extensions using premium hard gel for strength.', 
 '["Length consultation", "Extension application", "Shape & file", "Polish or gel"]'),
('Bridal Package', '$150', '3 hours', 'Complete pre-wedding nail service with trial and day-of styling.', 
 '["Trial session", "Custom design", "Manicure & pedicure", "Touch-up kit"]');

-- Insert Sample Gallery Data
INSERT INTO gallery (title, description, image_url, category) VALUES
('French Ombre', 'Classic French tips with modern ombre gradient', 'https://images.unsplash.com/photo-1604654894610-df63bc536371', 'nail-art'),
('Floral Design', 'Hand-painted delicate flower patterns', 'https://images.unsplash.com/photo-1610992015732-2449b76344bc', 'nail-art'),
('Geometric Glam', 'Bold geometric patterns with metallic accents', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53', 'nail-art'),
('Pastel Dreams', 'Soft pastel colors with subtle shimmer', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b', 'nail-art'),
('Chrome Finish', 'Mirror-like chrome effect nails', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66', 'nail-art'),
('Wedding Elegance', 'Bridal nail art with pearls and lace details', 'https://images.unsplash.com/photo-1583001315039-c84a3dfdb32a', 'bridal');

-- Create a view for upcoming appointments
CREATE OR REPLACE VIEW upcoming_appointments AS
SELECT 
    id,
    name,
    email,
    phone,
    appointment_date,
    appointment_time,
    service,
    status
FROM appointments
WHERE appointment_date >= CURDATE() 
  AND status != 'cancelled'
ORDER BY appointment_date ASC, appointment_time ASC;

-- Create a view for today's appointments
CREATE OR REPLACE VIEW today_appointments AS
SELECT 
    id,
    name,
    email,
    phone,
    appointment_time,
    service,
    status
FROM appointments
WHERE appointment_date = CURDATE()
  AND status != 'cancelled'
ORDER BY appointment_time ASC;
