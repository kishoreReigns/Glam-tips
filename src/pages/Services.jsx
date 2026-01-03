import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import './Services.css';
import { getServices } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        // Parse features JSON string if needed
        const parsedServices = data.map(service => ({
          ...service,
          features: typeof service.features === 'string' 
            ? JSON.parse(service.features) 
            : service.features
        }));
        setServices(parsedServices);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">WHAT WE OFFER</span>
            <h1>Our Services</h1>
            <p className="hero-description">
              Experience luxury nail care with our comprehensive range of services. Each treatment is designed to provide the ultimate in relaxation and beauty.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="services-list-section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-color)' }}>
              <p>Loading services...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#ff4d4d' }}>
              <p>{error}</p>
            </div>
          ) : (
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="service-header">
                  <div>
                    <h3>{service.title}</h3>
                    <p className="service-duration">{service.duration}</p>
                  </div>
                  <div className="service-price">{service.price}</div>
                </div>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheck className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  className="btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>

      <section className="add-ons">
        <div className="container">
          <motion.div
            className="add-ons-content glass-card neon-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Add-On Services</h2>
            <div className="add-ons-grid">
              <div className="add-on-item">
                <h4>Paraffin Treatment</h4>
                <span className="add-on-price">+$15</span>
              </div>
              <div className="add-on-item">
                <h4>French Tips</h4>
                <span className="add-on-price">+$10</span>
              </div>
              <div className="add-on-item">
                <h4>Chrome Finish</h4>
                <span className="add-on-price">+$20</span>
              </div>
              <div className="add-on-item">
                <h4>Nail Repair</h4>
                <span className="add-on-price">+$8</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
