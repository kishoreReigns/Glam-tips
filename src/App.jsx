import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import BookAppointment from './pages/BookAppointment';
import Themes from './pages/Themes';
import Admin from './pages/Admin';
import MyBookings from './pages/MyBookings';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/services" element={<Services />} />
              <Route path="/book" element={<BookAppointment />} />
              <Route path="/themes" element={<Themes />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
