import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Gallery.css';
import { getGallery } from '../services/api';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        setGalleryItems(data);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = [
    { id: 'all', name: 'All Designs' },
    { id: 'nail-art', name: 'Nail Art' },
    { id: 'bridal', name: 'Bridal' },
    { id: 'classic', name: 'Classic' },
    { id: 'luxury', name: 'Luxury' }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">OUR PORTFOLIO</span>
            <h1>Nail Art Gallery</h1>
            <p className="hero-description">
              Explore our stunning collection of nail art designs. From timeless classics to bold, modern statements.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="gallery-content">
        <div className="container">
          <motion.div 
            className="filter-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.name}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="gallery-grid"
            layout
          >
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', gridColumn: '1/-1', color: 'var(--text-color)' }}>
                <p>Loading gallery...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', gridColumn: '1/-1', color: '#ff4d4d' }}>
                <p>{error}</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', gridColumn: '1/-1', color: 'var(--text-color)' }}>
                <p>No gallery items found.</p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="gallery-item glass-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
              >
                <div className="gallery-image">
                  <img src={item.image_url} alt={item.title} />
                  <div className="gallery-overlay">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              </motion.div>
            )))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
