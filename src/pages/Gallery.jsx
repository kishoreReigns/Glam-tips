import { motion } from 'framer-motion';
import { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [filter, setFilter] = useState('all');

  const galleryItems = [
    { id: 1, category: 'classic', title: 'Classic French', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop' },
    { id: 2, category: 'artistic', title: 'Floral Art', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop' },
    { id: 3, category: 'luxury', title: 'Gold Accents', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=600&fit=crop' },
    { id: 4, category: 'classic', title: 'Red Elegance', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop' },
    { id: 5, category: 'artistic', title: 'Abstract Design', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop' },
    { id: 6, category: 'luxury', title: 'Diamond Shine', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=600&fit=crop' },
    { id: 7, category: 'classic', title: 'Nude Perfection', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop' },
    { id: 8, category: 'artistic', title: 'Watercolor', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop' },
    { id: 9, category: 'luxury', title: 'Crystal Glamour', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=600&fit=crop' }
  ];

  const categories = [
    { id: 'all', name: 'All Designs' },
    { id: 'classic', name: 'Classic' },
    { id: 'artistic', name: 'Artistic' },
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
            {filteredItems.map((item, index) => (
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
                  <img src={item.image} alt={item.title} />
                  <div className="gallery-overlay">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
