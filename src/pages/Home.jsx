import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaUsers, FaAward, FaShieldAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const trendingStyles = [
    {
      id: 1,
      title: 'Marble & Gold',
      description: 'Sophisticated textures with metallic accents',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Classic Red Gel',
      description: 'Timeless elegance with long-lasting shine',
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Spring Floral',
      description: 'Delicate hand-painted details for a fresh look',
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=400&fit=crop'
    }
  ];

  const services = [
    'Luxury Spa Manicures & Pedicures',
    'Custom Nail Art & Design',
    'Gel Extensions & Hard Gel',
    'Non-Toxic Polish Options',
    'Bridal & Event Styling'
  ];

  const stats = [
    { icon: FaUsers, value: '500+', label: 'Happy Clients' },
    { icon: FaStar, value: '5.0', label: '⭐ Rating' },
    { icon: FaAward, value: '10+', label: 'Expert Artists' },
    { icon: FaShieldAlt, value: '100%', label: 'Hygienic' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">✦ PREMIUM NAIL CARE</span>
          <h1>
            Artistry at<br />
            Your<br />
            <span className="accent-text">Fingertips</span>
          </h1>
          <p className="hero-description">
            Step into a world of elegance and relaxation. Our expert technicians combine precision with artistry to give you the perfect manicure.
          </p>
          <div className="hero-buttons">
            <Link to="/book">
              <button className="btn-primary">Book Now</button>
            </Link>
            <Link to="/gallery">
              <button className="btn-secondary">View Gallery</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Styles */}
      <section className="trending">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-label">FEATURED COLLECTION</span>
            <h2>Trending Styles</h2>
            <p className="section-description">
              From classic elegance to avant-garde designs, explore our most requested nail art styles this season.
            </p>
          </motion.div>

          <div className="trending-grid">
            {trendingStyles.map((style, index) => (
              <motion.div
                key={style.id}
                className="trending-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="trending-image">
                  <img src={style.image} alt={style.title} />
                </div>
                <div className="trending-content">
                  <h3>{style.title}</h3>
                  <p>{style.description}</p>
                  <button className="btn-view-details">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="trending-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link to="/gallery">
              <button className="btn-see-full">
                See Full Gallery
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-preview">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-label">OUR EXPERTISE</span>
            <h2>More Than Just a Manicure</h2>
            <p className="section-description">
              At Glam Tips, we believe nail care is an essential part of self-care. We use only the highest quality, non-toxic products to ensure your nails stay healthy and strong.
            </p>
          </motion.div>

          <div className="services-content">
            <motion.div 
              className="services-list"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="service-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="service-bullet">✦</span>
                  <span>{service}</span>
                </motion.div>
              ))}
              <Link to="/services">
                <button className="btn-primary" style={{ marginTop: '2rem' }}>
                  View All Services
                </button>
              </Link>
            </motion.div>

            <motion.div 
              className="stats-grid"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card glass-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className="stat-icon" />
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div 
            className="cta-content glass-card neon-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Shine?</h2>
            <p>Book your appointment today and let our artists transform your nails into a masterpiece.</p>
            <Link to="/book">
              <motion.button 
                className="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Appointment Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
