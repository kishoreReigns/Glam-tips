import { useState } from 'react';
import { motion } from 'framer-motion';
import './BookAppointment.css';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Luxury Spa Manicure',
    'Deluxe Pedicure',
    'Gel Manicure',
    'Custom Nail Art',
    'Gel Extensions',
    'Bridal Package'
  ];

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the data to your backend
    console.log('Booking submitted:', formData);
  };

  if (submitted) {
    return (
      <div className="booking-page">
        <section className="booking-success">
          <div className="container">
            <motion.div
              className="success-content glass-card neon-border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="success-icon">✓</div>
              <h1>Booking Confirmed!</h1>
              <p>
                Thank you for booking with Glam Tips, {formData.name}! We've sent a confirmation email to {formData.email}.
              </p>
              <p className="booking-details">
                Your appointment for <strong>{formData.service}</strong> is scheduled for <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
              </p>
              <motion.button
                className="btn"
                onClick={() => setSubmitted(false)}
                whileHover={{ scale: 1.05 }}
              >
                Book Another Appointment
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <section className="booking-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">RESERVE YOUR SPOT</span>
            <h1>Book Appointment</h1>
            <p className="hero-description">
              Schedule your visit and experience the art of luxury nail care. We can't wait to pamper you!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="booking-form-section">
        <div className="container">
          <motion.div
            className="booking-form-wrapper glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Select Service *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Preferred Time *</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Special Requests (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any special requests or preferences?"
                />
              </div>

              <motion.button
                type="submit"
                className="btn btn-submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Confirm Booking
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="booking-info glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Booking Information</h3>
            <ul className="info-list">
              <li>✦ Appointments are confirmed via email within 24 hours</li>
              <li>✦ Please arrive 10 minutes early for your appointment</li>
              <li>✦ Cancellations must be made 24 hours in advance</li>
              <li>✦ Walk-ins are welcome based on availability</li>
              <li>✦ Gift certificates are available for purchase</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
