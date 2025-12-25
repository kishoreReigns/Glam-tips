# Glam Tips - Luxury Nail Salon Website

A modern, responsive React website for Glam Tips Nail Salon featuring stunning glassmorphism design, multiple theme options, and smooth animations.

## 🌟 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Multiple Themes** - 5 beautiful color themes (Purple, Emerald, Sunset, Ocean, Rose)
- **Glassmorphism UI** - Modern frosted glass effects throughout
- **Smooth Animations** - Powered by Framer Motion
- **Neon Accents** - Premium glowing borders and highlights
- **Theme Persistence** - Your theme choice is saved locally

## 📦 Pages

- **Home** - Hero section with featured nail art styles and services preview
- **Gallery** - Filterable gallery of nail art designs
- **Services** - Comprehensive list of salon services with pricing
- **Book Appointment** - Interactive booking form with validation
- **Themes** - Theme switcher to personalize your experience

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
glam-tips/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Gallery.jsx
│   │   ├── Gallery.css
│   │   ├── Services.jsx
│   │   ├── Services.css
│   │   ├── BookAppointment.jsx
│   │   ├── BookAppointment.css
│   │   ├── Themes.jsx
│   │   └── Themes.css
│   ├── context/             # React Context
│   │   └── ThemeContext.jsx
│   ├── App.jsx              # Main app component
│   ├── App.css
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Typography

- **Headings**: Playfair Display (Serif)
- **Body**: Montserrat (Sans-serif)

### Color Themes

#### Purple Luxe (Default)

- Primary: `hsl(280, 65%, 60%)`
- Accent: `hsl(320, 75%, 65%)`

#### Emerald Dream

- Primary: `hsl(160, 70%, 55%)`
- Accent: `hsl(140, 65%, 60%)`

#### Sunset Glow

- Primary: `hsl(20, 80%, 60%)`
- Accent: `hsl(340, 75%, 65%)`

#### Ocean Breeze

- Primary: `hsl(200, 70%, 55%)`
- Accent: `hsl(180, 65%, 60%)`

#### Rose Gold

- Primary: `hsl(340, 75%, 65%)`
- Accent: `hsl(320, 70%, 70%)`

### Effects

- **Glassmorphism**: `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- **Neon Borders**: Glowing box-shadows using theme colors
- **Smooth Transitions**: Custom Framer Motion animations

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router** - Navigation
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Vite** - Build tool
- **CSS3** - Styling with custom properties

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: Below 768px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Key Features Breakdown

### Theme System

The theme system uses CSS custom properties and React Context to provide seamless theme switching. All colors update dynamically based on the selected theme.

### Animations

Framer Motion provides:

- Page entrance animations
- Scroll-triggered animations
- Hover effects
- Smooth transitions between states

### Form Validation

The booking form includes:

- Required field validation
- Date/time selection
- Service selection
- Success confirmation page

## 📝 Customization

### Changing Colors

Edit the CSS custom properties in `src/index.css` under each theme section.

### Adding New Services

Update the services array in `src/pages/Services.jsx` with your service details.

### Modifying Images

Replace the Unsplash URLs with your own images throughout the page components.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is for educational and portfolio purposes.

## 🤝 Support

For questions or issues, please contact hello@glamtips.com

---

Built with ❤️ for Glam Tips Nail Salon
