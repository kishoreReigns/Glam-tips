-- PostgreSQL Schema for Glam Tips Booking System

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INTEGER NOT NULL,
    image_url VARCHAR(500),
    features JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    calendar_event_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);
CREATE INDEX IF NOT EXISTS idx_calendar_event_id ON appointments(calendar_event_id);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);

-- Insert sample services
INSERT INTO services (name, description, price, duration, image_url, features) VALUES
('Luxury Spa Manicure', 'Indulge in our signature spa manicure with exfoliation, massage, and perfect polish', 45.00, 60, '/images/services/manicure.jpg', '["Hand exfoliation", "Cuticle care", "Hand massage", "Polish of choice", "Paraffin treatment"]'),
('Deluxe Pedicure', 'Pamper your feet with our deluxe pedicure including scrub, massage, and polish', 65.00, 75, '/images/services/pedicure.jpg', '["Foot soak", "Exfoliation", "Callus removal", "Foot massage", "Polish application"]'),
('Gel Manicure', 'Long-lasting gel polish that stays perfect for weeks', 55.00, 45, '/images/services/gel.jpg', '["Gel polish application", "UV curing", "Lasts 2-3 weeks", "Chip-resistant"]'),
('Custom Nail Art', 'Express your style with our custom nail art designs', 75.00, 90, '/images/services/nailart.jpg', '["Custom designs", "Hand-painted art", "Crystals & embellishments", "Unique patterns"]'),
('Gel Extensions', 'Beautiful, natural-looking gel extensions for length and strength', 85.00, 120, '/images/services/extensions.jpg', '["Custom length", "Natural look", "Durable", "Shaping included"]'),
('Bridal Package', 'Complete nail care package for your special day', 150.00, 180, '/images/services/bridal.jpg', '["Trial session", "Day-of service", "Custom design", "Hand & foot care", "Long-lasting finish"]')
ON CONFLICT DO NOTHING;

-- Insert sample gallery items
INSERT INTO gallery (title, image_url, category, description) VALUES
('French Ombre Elegance', '/images/gallery/gallery1.jpg', 'Classic', 'Elegant French ombre with subtle shimmer'),
('Floral Spring Design', '/images/gallery/gallery2.jpg', 'Nail Art', 'Hand-painted cherry blossoms on nude base'),
('Glitter Glamour', '/images/gallery/gallery3.jpg', 'Special Occasion', 'Rose gold glitter with crystal accents'),
('Minimalist Chic', '/images/gallery/gallery4.jpg', 'Modern', 'Clean lines and geometric patterns'),
('Sunset Gradient', '/images/gallery/gallery5.jpg', 'Colorful', 'Warm gradient from coral to purple'),
('Bridal Perfection', '/images/gallery/gallery6.jpg', 'Bridal', 'Classic white with delicate lace details')
ON CONFLICT DO NOTHING;
