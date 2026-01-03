-- Add calendar_event_id column to appointments table
ALTER TABLE appointments 
ADD COLUMN calendar_event_id VARCHAR(255) NULL AFTER status;

-- Optional: Add index for faster lookups
CREATE INDEX idx_calendar_event_id ON appointments(calendar_event_id);
