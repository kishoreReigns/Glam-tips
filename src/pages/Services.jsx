import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Luxury Spa Manicure',
      price: '$45',
      duration: '60 min',
      description: 'Complete nail care with exfoliation, massage, and polish application.',
      features: ['Nail shaping', 'Cuticle care', 'Hand massage', 'Polish application']
    },
    {
      id: 2,
      title: 'Deluxe Pedicure',
      price: '$65',
      duration: '75 min',
      description: 'Luxurious foot treatment including scrub, mask, and extended massage.',
      features: ['Foot soak', 'Callus removal', 'Scrub & mask', 'Extended massage']
    },
    {
      id: 3,
      title: 'Gel Manicure',
      price: '$55',
      duration: '45 min',
      description: 'Long-lasting gel polish that stays perfect for up to 3 weeks.',
      features: ['Nail prep', 'Gel application', 'UV curing', 'Top coat']
    },
    {
      id: 4,
      title: 'Custom Nail Art',
      price: '$75+',
      duration: '90 min',
      description: 'Hand-painted designs and intricate patterns tailored to your vision.',
      features: ['Design consultation', 'Hand-painted art', 'Premium materials', 'Finishing coat']
    },
    {
      id: 5,
      title: 'Gel Extensions',
      price: '$85',
      duration: '120 min',
      description: 'Natural-looking extensions using premium hard gel for strength.',
      features: ['Length consultation', 'Extension application', 'Shape & file', 'Polish or gel']
    },
    {
      id: 6,
      title: 'Bridal Package',
      price: '$150',
      duration: '3 hours',
      description: 'Complete pre-wedding nail service with trial and day-of styling.',
      features: ['Trial session', 'Custom design', 'Manicure & pedicure', 'Touch-up kit']
    }
  ];

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
