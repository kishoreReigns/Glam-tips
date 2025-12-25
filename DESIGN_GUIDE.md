# Glam Tips - Complete Design Specification

## 🎨 Color Palette

### Light Theme (Default - Rose/Burgundy)

```css
--primary-hue: 330;
--primary-sat: 50%;
--primary-light: 50%;

--bg-primary: hsl(30, 30%, 95%); /* Soft beige/cream */
--bg-secondary: hsl(20, 25%, 92%); /* Light pink beige */
--text-primary: hsl(340, 30%, 20%); /* Dark burgundy */
--text-secondary: hsl(340, 20%, 40%); /* Medium burgundy */
--accent-primary: hsl(330, 50%, 50%); /* Rose/Burgundy */
--accent-secondary: hsl(340, 60%, 45%); /* Deep rose */
```

### Theme Variations

- **Emerald**: Green tones (hue: 160)
- **Sunset**: Orange/Pink (hue: 20)
- **Ocean**: Blue/Teal (hue: 200)
- **Rose**: Pink/Gold (hue: 340)

## 📝 Typography

### Font Families

```css
--font-heading: "Playfair Display", serif;
--font-body: "Montserrat", sans-serif;
```

### Font Sizes

- **Hero Title**: `clamp(2.5rem, 6vw, 4.5rem)`
- **Section Title**: `clamp(2rem, 4vw, 3.5rem)`
- **Subsection**: `clamp(1.5rem, 3vw, 2.5rem)`
- **Body Large**: `1.125rem`
- **Body**: `1rem`
- **Small**: `0.875rem`
- **Label**: `0.75rem`

### Font Weights

- **Headings**: 700 (Bold)
- **Semi-Bold**: 600
- **Medium**: 500
- **Regular**: 400
- **Light**: 300

## 🎯 Design System

### Spacing Scale

```css
--spacing-xs: 0.5rem; /* 8px */
--spacing-sm: 1rem; /* 16px */
--spacing-md: 1.5rem; /* 24px */
--spacing-lg: 2.5rem; /* 40px */
--spacing-xl: 4rem; /* 64px */
```

### Border Radius

```css
--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-full: 50%;
```

## ✨ Effects

### Glassmorphism

```css
background: hsla(0, 0%, 100%, 0.7);
backdrop-filter: blur(20px);
border: 1px solid hsla(340, 40%, 80%, 0.3);
```

### Neon Border

```css
box-shadow: 0 0 10px var(--neon-glow), 0 0 20px var(--neon-glow),
  inset 0 0 20px hsla(var(--primary-hue), 50%, 50%, 0.1);
```

### Subtle Background Animation

```css
radial-gradient(circle at 20% 20%, hsla(330, 40%, 85%, 0.3) 0%, transparent 50%),
radial-gradient(circle at 80% 80%, hsla(340, 40%, 85%, 0.3) 0%, transparent 50%);
animation: bgShift 20s ease-in-out infinite;
```

## 🧩 Component Specs

### Header

- **Height**: Dynamic padding `1.5rem` top/bottom
- **Background**: Light cream with subtle backdrop blur
- **Border**: Bottom border `1px solid` glass-border
- **Logo**: Playfair Display, 1.75rem with sparkle icon
- **Nav Links**: Montserrat, 0.95rem, uppercase, letter-spacing 0.05em
- **Active State**: Underline animation from left to right

### Buttons

- **Primary**: Rose gradient background, white text
- **Secondary**: Transparent with rose border
- **Padding**: `0.875rem 2rem`
- **Border Radius**: 8px
- **Hover**: Lift effect (-2px) with shadow
- **Font**: Montserrat, 600 weight, uppercase, 1rem

### Cards (Glass Effect)

```css
background: hsla(0, 0%, 100%, 0.7);
backdrop-filter: blur(20px);
border: 1px solid hsla(340, 40%, 80%, 0.3);
border-radius: 16px;
padding: 2.5rem;
```

### Hero Section

- **Layout**: Two-column grid (text left, image right)
- **Label**: Small caps, rose color, glass background
- **Title**: Large Playfair, "Fingertips" in italic rose color
- **Description**: 1.125rem, secondary text color
- **Buttons**: Stack on mobile, side-by-side on desktop
- **Image**: 4:5 aspect ratio, rounded corners, subtle border

### Section Headers

- **Label**: Uppercase, small, glass background, rose text
- **Title**: Centered, Playfair Display
- **Description**: Max-width 700px, centered, secondary text

### Gallery Filters

- **Default**: Glass background, light border
- **Hover**: Rose border
- **Active**: Solid rose background, white text
- **Layout**: Flex wrap, centered

### Footer

- **Background**: Light pink beige (bg-secondary)
- **Grid**: 3 columns on desktop, 1 on mobile
- **Social Icons**: Circle, glass background, rose on hover
- **Sections**: Contact, Hours information
- **Border**: Top border 1px solid glass-border

## 🎬 Animations (Framer Motion)

### Page Entrance

```jsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Scroll Trigger

```jsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, delay: index * 0.1 }}
viewport={{ once: true }}
```

### Hover Effects

```jsx
whileHover={{ y: -10, scale: 1.05 }}
transition={{ type: "spring", stiffness: 300 }}
```

### Button Interactions

```jsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

## 📐 Layout Structure

### Container

```css
max-width: 1400px;
margin: 0 auto;
padding: 0 1.5rem;
```

### Section Padding

```css
padding: 4rem 0; /* Desktop */
padding: 3rem 0; /* Mobile */
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Key Adjustments

- Header: Hamburger menu below 768px
- Hero: Stack columns on mobile
- Gallery: 1 column on mobile, 2-3 on tablet, 4+ on desktop
- Services: 1 column on mobile, 2 on tablet, 3 on desktop
- Stats Grid: 2x2 on mobile, 4x1 on desktop

## 🌟 Best Practices

### Do's

✅ Use semantic HTML5 elements
✅ Maintain consistent spacing scale
✅ Apply glassmorphism subtly
✅ Use theme-aware colors (CSS variables)
✅ Add smooth transitions (0.3s ease)
✅ Implement proper focus states
✅ Ensure WCAG AA contrast ratios

### Don'ts

❌ Don't mix gradient text with regular colors
❌ Don't overuse animations
❌ Don't use fixed pixel values (use rem/em)
❌ Don't forget mobile-first approach
❌ Don't skip loading states
❌ Don't ignore accessibility

## 🎨 Visual Hierarchy

1. **Primary**: Hero title, CTA buttons
2. **Secondary**: Section titles, featured cards
3. **Tertiary**: Body text, descriptions
4. **Accent**: Labels, icons, highlights

## 🔧 Implementation Notes

- All colors use CSS custom properties for theme switching
- Glassmorphism requires backdrop-filter support
- Framer Motion handles all complex animations
- Images use Unsplash URLs (replace with actual assets)
- Theme preference saved in localStorage
- Mobile menu uses slide-in animation

---

**Built with React 18, Vite, Framer Motion, and modern CSS**
