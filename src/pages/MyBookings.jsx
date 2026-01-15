import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MyBookings.css';

const MyBookings = () => {
  const [email, setEmail] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({ id: null, date: '', time: '' });
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const allTimeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  // Get email from URL params if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
      fetchAppointments(emailParam);
    }
  }, []);

  // Fetch available slots when reschedule date changes
  useEffect(() => {
    if (rescheduleData.date) {
      fetchAvailableSlots(rescheduleData.date);
    }
  }, [rescheduleData.date]);

  const fetchAvailableSlots = async (date) => {
    setLoadingSlots(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://glam-tips-nid8.vercel.app/api';
      const response = await fetch(`${API_BASE_URL}/appointments/available-slots/${date}`);
      const data = await response.json();
      setAvailableSlots(data.availableSlots);
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setAvailableSlots(allTimeSlots);
    } finally {
      setLoadingSlots(false);
    }
  };

  const fetchAppointments = async (searchEmail) => {
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/customer/${searchEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (email.trim()) {
      fetchAppointments(email);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/cancel`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      alert('Appointment cancelled successfully!');
      fetchAppointments(email);
    } catch (err) {
      alert('Failed to cancel appointment. Please try again.');
      console.error(err);
    }
  };

  const openRescheduleModal = (appointment) => {
    setRescheduleData({
      id: appointment.id,
      date: '',
      time: ''
    });
    setShowRescheduleModal(true);
  };

  const closeRescheduleModal = () => {
    setShowRescheduleModal(false);
    setRescheduleData({ id: null, date: '', time: '' });
    setAvailableSlots([]);
  };

  const handleReschedule = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${rescheduleData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appointment_date: rescheduleData.date,
          appointment_time: rescheduleData.time
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to reschedule appointment');
      }

      alert('Appointment rescheduled successfully!');
      closeRescheduleModal();
      fetchAppointments(email);
    } catch (err) {
      alert(err.message || 'Failed to reschedule appointment. Please try again.');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FFA726';
      case 'completed': return '#42A5F5';
      case 'cancelled': return '#EF5350';
      default: return '#999';
    }
  };

  return (
    <div className="my-bookings-page">
      <section className="bookings-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">MANAGE YOUR VISITS</span>
            <h1>My Bookings</h1>
            <p className="hero-description">
              View, reschedule, or cancel your appointments
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bookings-content">
        <div className="container">
          <motion.div
            className="search-wrapper glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Find Your Appointments</h2>
            <form onSubmit={handleSearch} className="search-form">
              <div className="form-group">
                <label htmlFor="email">Enter your email address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Find My Bookings'}
              </motion.button>
            </form>
          </motion.div>

          {error && (
            <div className="error-message glass-card">
              <p>{error}</p>
            </div>
          )}

          {searched && !loading && appointments.length === 0 && (
            <motion.div
              className="no-bookings glass-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No appointments found for this email address.</p>
            </motion.div>
          )}

          {appointments.length > 0 && (
            <motion.div
              className="appointments-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2>Your Appointments</h2>
              <div className="appointments-grid">
                {appointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    className="appointment-card glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="appointment-header">
                      <h3>{appointment.service}</h3>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(appointment.status) }}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    
                    <div className="appointment-details">
                      <div className="detail-row">
                        <span className="label">📅 Date:</span>
                        <span className="value">
                          {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">🕐 Time:</span>
                        <span className="value">{appointment.appointment_time}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">👤 Name:</span>
                        <span className="value">{appointment.name}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">📧 Email:</span>
                        <span className="value">{appointment.email}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">📞 Phone:</span>
                        <span className="value">{appointment.phone}</span>
                      </div>
                      {appointment.message && (
                        <div className="detail-row">
                          <span className="label">💬 Notes:</span>
                          <span className="value">{appointment.message}</span>
                        </div>
                      )}
                      <div className="detail-row">
                        <span className="label">🆔 Booking ID:</span>
                        <span className="value">#{appointment.id}</span>
                      </div>
                    </div>

                    {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                      <div className="appointment-actions">
                        <motion.button
                          className="btn-secondary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openRescheduleModal(appointment)}
                        >
                          Reschedule
                        </motion.button>
                        <motion.button
                          className="btn-danger"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="modal-overlay" onClick={closeRescheduleModal}>
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeRescheduleModal}>✕</button>
            <h2>Reschedule Appointment</h2>
            <form onSubmit={handleReschedule}>
              <div className="form-group">
                <label htmlFor="reschedule-date">New Date *</label>
                <input
                  type="date"
                  id="reschedule-date"
                  value={rescheduleData.date}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value, time: '' })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reschedule-time">New Time *</label>
                <select
                  id="reschedule-time"
                  value={rescheduleData.time}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                  required
                  disabled={!rescheduleData.date || loadingSlots}
                >
                  <option value="">
                    {!rescheduleData.date ? 'Select a date first' : loadingSlots ? 'Loading slots...' : 'Choose a time'}
                  </option>
                  {availableSlots.length > 0 ? (
                    availableSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))
                  ) : (
                    !loadingSlots && rescheduleData.date && (
                      <option value="" disabled>No slots available for this date</option>
                    )
                  )}
                </select>
                {rescheduleData.date && availableSlots.length === 0 && !loadingSlots && (
                  <small style={{color: 'var(--primary-color)', marginTop: '5px', display: 'block'}}>
                    All time slots are booked for this date. Please select another date.
                  </small>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={closeRescheduleModal}>
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
