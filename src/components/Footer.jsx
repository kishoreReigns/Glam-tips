import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-brand">Glam Tips</h3>
            <p className="footer-description">
              Elevating nail care to an art form. We provide luxury treatments in a relaxing, hygienic environment.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <FaPinterest />
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-list">
              <li>
                <FaMapMarkerAlt />
                <span>123 Beauty Avenue<br />Beverly Hills, CA 90210</span>
              </li>
              <li>
                <FaPhone />
                <span>(555) 123-4567</span>
              </li>
              <li>
                <FaEnvelope />
                <span>hello@glamtips.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-heading">Hours</h4>
            <ul className="footer-list hours-list">
              <li>
                <span>Mon - Fri</span>
                <span>10:00 AM - 7:00 PM</span>
              </li>
              <li>
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
              </li>
              <li>
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Glam Tips Nail Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
