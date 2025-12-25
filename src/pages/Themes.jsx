import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './Themes.css';

const Themes = () => {
  const { theme, changeTheme } = useTheme();

  const themes = [
    {
      id: 'purple',
      name: 'Purple Luxury',
      description: 'Classic elegance with rose & gold tones',
      colors: ['#a6527a', '#e6c9a8', '#fdf5f3']
    },
    {
      id: 'emerald',
      name: 'Emerald Dream',
      description: 'Fresh and sophisticated green vibes',
      colors: ['#10b981', '#b2f5ea', '#f0fdf4']
    },
    {
      id: 'sunset',
      name: 'Sunset Glow',
      description: 'Warm orange and golden gradients',
      colors: ['#f97316', '#fde68a', '#fffbeb']
    },
    {
      id: 'ocean',
      name: 'Ocean Breeze',
      description: 'Cool blue and teal combination',
      colors: ['#0088cc', '#bfdbfe', '#f0f9ff']
    },
    {
      id: 'rose',
      name: 'Rose Garden',
      description: 'Romantic rose and blush tones',
      colors: ['#d81b60', '#f9a8d4', '#fdf2f8']
    }
  ];

  return (
    <div className="themes-page">
      <section className="themes-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">CUSTOMIZE YOUR EXPERIENCE</span>
            <h1>Choose Your Theme</h1>
            <p className="hero-description">
              Personalize your browsing experience with our stunning color themes. Each theme is carefully crafted to match the luxury of our salon.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="themes-content">
        <div className="container">
          <div className="themes-grid">
            {themes.map((themeItem, index) => (
              <motion.div
                key={themeItem.id}
                className={`theme-card glass-card ${theme === themeItem.id ? 'active' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => changeTheme(themeItem.id)}
              >
                <div className="theme-preview">
                  {themeItem.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="color-swatch"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="theme-info">
                  <h3>{themeItem.name}</h3>
                  <p>{themeItem.description}</p>
                  {theme === themeItem.id && (
                    <motion.span
                      className="active-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      ✓ Active
                    </motion.span>
                  )}
                </div>
                <motion.button
                  className={`btn ${theme === themeItem.id ? '' : 'btn-secondary'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme === themeItem.id ? 'Current Theme' : 'Apply Theme'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-info-section">
        <div className="container">
          <motion.div
            className="theme-info-content glass-card neon-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>About Our Themes</h2>
            <p>
              Each theme features a carefully curated color palette that adapts across the entire website. 
              Your theme preference is saved locally, so you'll see your chosen colors every time you visit.
            </p>
            <div className="theme-features">
              <div className="feature-item">
                <h4>Glassmorphism</h4>
                <p>Elegant frosted glass effects throughout the interface</p>
              </div>
              <div className="feature-item">
                <h4>Neon Accents</h4>
                <p>Subtle glowing borders and highlights for premium feel</p>
              </div>
              <div className="feature-item">
                <h4>Smooth Animations</h4>
                <p>Powered by Framer Motion for fluid interactions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Themes;
