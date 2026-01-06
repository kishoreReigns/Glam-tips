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
('Luxury Spa Manicure', 'Indulge in our signature spa manicure with exfoliation, massage, and perfect polish', 45.00, 60, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', '["Hand exfoliation", "Cuticle care", "Hand massage", "Polish of choice", "Paraffin treatment"]'),
('Deluxe Pedicure', 'Pamper your feet with our deluxe pedicure including scrub, massage, and polish', 65.00, 75, 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80', '["Foot soak", "Exfoliation", "Callus removal", "Foot massage", "Polish application"]'),
('Gel Manicure', 'Long-lasting gel polish that stays perfect for weeks', 55.00, 45, 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80', '["Gel polish application", "UV curing", "Lasts 2-3 weeks", "Chip-resistant"]'),
('Custom Nail Art', 'Express your style with our custom nail art designs', 75.00, 90, 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80', '["Custom designs", "Hand-painted art", "Crystals & embellishments", "Unique patterns"]'),
('Gel Extensions', 'Beautiful, natural-looking gel extensions for length and strength', 85.00, 120, 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80', '["Custom length", "Natural look", "Durable", "Shaping included"]'),
('Bridal Package', 'Complete nail care package for your special day', 150.00, 180, 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80', '["Trial session", "Day-of service", "Custom design", "Hand & foot care", "Long-lasting finish"]')
ON CONFLICT DO NOTHING;

-- Insert sample gallery items
INSERT INTO gallery (title, image_url, category, description) VALUES
('French Ombre Elegance', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', 'Classic', 'Elegant French ombre with subtle shimmer'),
('Floral Spring Design', 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80', 'Nail Art', 'Hand-painted cherry blossoms on nude base'),
('Glitter Glamour', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&q=80', 'Special Occasion', 'Rose gold glitter with crystal accents'),
('Minimalist Chic', 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80', 'Modern', 'Clean lines and geometric patterns'),
('Sunset Gradient', 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=800&q=80', 'Colorful', 'Warm gradient from coral to purple'),
('Bridal Perfection', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80', 'Bridal', 'Classic white with delicate lace details')
ON CONFLICT DO NOTHING;
