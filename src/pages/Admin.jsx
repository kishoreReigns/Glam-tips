import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Admin.css';
import { getAppointments, getServices, getGallery } from '../services/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    totalServices: 0,
    totalGallery: 0
  });

  // Service form state
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    price: '',
    duration: '',
    description: '',
    features: ''
  });

  // Gallery form state
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'nail-art'
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [appointmentsData, servicesData, galleryData] = await Promise.all([
        getAppointments(),
        getServices(),
        getGallery()
      ]);

      setAppointments(appointmentsData);
      setServices(servicesData);
      setGallery(galleryData);

      // Calculate stats
      setStats({
        totalAppointments: appointmentsData.length,
        pendingAppointments: appointmentsData.filter(a => a.status === 'pending').length,
        totalServices: servicesData.length,
        totalGallery: galleryData.length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh appointments
        const updatedAppointments = await getAppointments();
        setAppointments(updatedAppointments);
        alert('Appointment status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment status');
    }
  };

  const deleteAppointment = async (id) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedAppointments = await getAppointments();
        setAppointments(updatedAppointments);
        alert('Appointment deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Service Management Functions
  const openServiceForm = (service = null) => {
    if (service) {
      setEditingService(service);
      setServiceForm({
        title: service.title,
        price: service.price,
        duration: service.duration,
        description: service.description,
        features: Array.isArray(service.features) 
          ? service.features.join(', ') 
          : service.features
      });
    } else {
      setEditingService(null);
      setServiceForm({
        title: '',
        price: '',
        duration: '',
        description: '',
        features: ''
      });
    }
    setShowServiceForm(true);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const featuresArray = serviceForm.features.split(',').map(f => f.trim());
      const serviceData = {
        ...serviceForm,
        features: featuresArray
      };

      const url = editingService 
        ? `http://localhost:5000/api/services/${editingService.id}`
        : 'http://localhost:5000/api/services';
      
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });

      if (response.ok) {
        alert(editingService ? 'Service updated!' : 'Service added!');
        setShowServiceForm(false);
        fetchAllData();
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  const closeServiceForm = () => {
    setShowServiceForm(false);
  };

  const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Service deleted!');
        fetchAllData();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  // Gallery Management Functions
  const openGalleryForm = (item = null) => {
    if (item) {
      setEditingGallery(item);
      setGalleryForm({
        title: item.title,
        description: item.description || '',
        image_url: item.image_url,
        category: item.category || 'nail-art'
      });
    } else {
      setEditingGallery(null);
      setGalleryForm({
        title: '',
        description: '',
        image_url: '',
        category: 'nail-art'
      });
    }
    setShowGalleryForm(true);
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingGallery 
        ? `http://localhost:5000/api/gallery/${editingGallery.id}`
        : 'http://localhost:5000/api/gallery';
      
      const method = editingGallery ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm)
      });

      if (response.ok) {
        alert(editingGallery ? 'Gallery item updated!' : 'Gallery item added!');
        setShowGalleryForm(false);
        fetchAllData();
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Failed to save gallery item');
    }
  };

  const closeGalleryForm = () => {
    setShowGalleryForm(false);
  };

  const deleteGalleryItem = async (id) => {
    if (!confirm('Delete this gallery item?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Gallery item deleted!');
        fetchAllData();
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('Failed to delete gallery item');
    }
  };

  return (
    <div className="admin-page">
      <section className="admin-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Admin Dashboard</h1>
            <p>Manage your salon bookings, services, and gallery</p>
          </motion.div>
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          {/* Stats Cards */}
          <div className="stats-grid">
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3>Total Appointments</h3>
              <p className="stat-number">{stats.totalAppointments}</p>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Pending</h3>
              <p className="stat-number pending">{stats.pendingAppointments}</p>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Services</h3>
              <p className="stat-number">{stats.totalServices}</p>
            </motion.div>
            <motion.div 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Gallery Items</h3>
              <p className="stat-number">{stats.totalGallery}</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="admin-tabs">
            <button 
              className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button 
              className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              Services
            </button>
            <button 
              className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content glass-card">
            {loading ? (
              <div className="loading-state">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                  <div className="appointments-section">
                    <h2>All Appointments</h2>
                    {appointments.length === 0 ? (
                      <p>No appointments yet.</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Service</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {appointments.map((appointment) => (
                              <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.name}</td>
                                <td>{appointment.email}</td>
                                <td>{appointment.phone}</td>
                                <td>{formatDate(appointment.appointment_date)}</td>
                                <td>{appointment.appointment_time}</td>
                                <td>{appointment.service}</td>
                                <td>
                                  <span className={`status-badge ${appointment.status}`}>
                                    {appointment.status}
                                  </span>
                                </td>
                                <td className="actions-cell">
                                  <select 
                                    value={appointment.status}
                                    onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                                    className="status-select"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                  <button 
                                    className="delete-btn"
                                    onClick={() => deleteAppointment(appointment.id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="services-section">
                    <div className="section-header">
                      <h2>All Services</h2>
                      <button className="btn btn-add" onClick={() => openServiceForm()}>
                        + Add Service
                      </button>
                    </div>

                    {showServiceForm && (
                      <div className="form-modal" onClick={(e) => {
                        if (e.target.className === 'form-modal') closeServiceForm();
                      }}>
                        <div className="form-modal-content glass-card">
                          <button 
                            type="button" 
                            className="modal-close-btn" 
                            onClick={closeServiceForm}
                            aria-label="Close"
                          >
                            ×
                          </button>
                          <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                          <form onSubmit={handleServiceSubmit}>
                            <div className="form-group">
                              <label>Service Title *</label>
                              <input
                                type="text"
                                value={serviceForm.title}
                                onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                                required
                                placeholder="e.g., Luxury Spa Manicure"
                              />
                            </div>
                            <div className="form-row">
                              <div className="form-group">
                                <label>Price *</label>
                                <input
                                  type="text"
                                  value={serviceForm.price}
                                  onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                                  required
                                  placeholder="e.g., $45"
                                />
                              </div>
                              <div className="form-group">
                                <label>Duration *</label>
                                <input
                                  type="text"
                                  value={serviceForm.duration}
                                  onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                                  required
                                  placeholder="e.g., 60 min"
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label>Description *</label>
                              <textarea
                                value={serviceForm.description}
                                onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                                required
                                rows="3"
                                placeholder="Service description"
                              />
                            </div>
                            <div className="form-group">
                              <label>Features (comma separated) *</label>
                              <input
                                type="text"
                                value={serviceForm.features}
                                onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})}
                                required
                                placeholder="e.g., Nail shaping, Cuticle care, Hand massage"
                              />
                            </div>
                            <div className="form-actions">
                              <button type="button" className="btn btn-cancel" onClick={closeServiceForm}>
                                Cancel
                              </button>
                              <button type="submit" className="btn btn-primary">
                                {editingService ? 'Update' : 'Add'} Service
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    <div className="services-list">
                      {services.map((service) => (
                        <div key={service.id} className="service-item">
                          <div className="service-info">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-meta">
                              <span className="price">{service.price}</span>
                              <span className="duration">{service.duration}</span>
                            </div>
                          </div>
                          <div className="service-actions">
                            <button className="btn-edit" onClick={() => openServiceForm(service)}>
                              Edit
                            </button>
                            <button className="btn-delete" onClick={() => deleteService(service.id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                  <div className="gallery-section">
                    <div className="section-header">
                      <h2>Gallery Items</h2>
                      <button className="btn btn-add" onClick={() => openGalleryForm()}>
                        + Add Gallery Item
                      </button>
                    </div>

                    {showGalleryForm && (
                      <div className="form-modal" onClick={(e) => {
                        if (e.target.className === 'form-modal') closeGalleryForm();
                      }}>
                        <div className="form-modal-content glass-card">
                          <button 
                            type="button" 
                            className="modal-close-btn" 
                            onClick={closeGalleryForm}
                            aria-label="Close"
                          >
                            ×
                          </button>
                          <h3>{editingGallery ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h3>
                          <form onSubmit={handleGallerySubmit}>
                            <div className="form-group">
                              <label>Title *</label>
                              <input
                                type="text"
                                value={galleryForm.title}
                                onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
                                required
                                placeholder="e.g., French Ombre"
                              />
                            </div>
                            <div className="form-group">
                              <label>Description</label>
                              <textarea
                                value={galleryForm.description}
                                onChange={(e) => setGalleryForm({...galleryForm, description: e.target.value})}
                                rows="2"
                                placeholder="Brief description"
                              />
                            </div>
                            <div className="form-group">
                              <label>Image URL *</label>
                              <input
                                type="url"
                                value={galleryForm.image_url}
                                onChange={(e) => setGalleryForm({...galleryForm, image_url: e.target.value})}
                                required
                                placeholder="https://example.com/image.jpg"
                              />
                              {galleryForm.image_url && (
                                <div className="image-preview">
                                  <img src={galleryForm.image_url} alt="Preview" />
                                </div>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Category *</label>
                              <select
                                value={galleryForm.category}
                                onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})}
                                required
                              >
                                <option value="nail-art">Nail Art</option>
                                <option value="bridal">Bridal</option>
                                <option value="classic">Classic</option>
                                <option value="luxury">Luxury</option>
                              </select>
                            </div>
                            <div className="form-actions">
                              <button type="button" className="btn btn-cancel" onClick={closeGalleryForm}>
                                Cancel
                              </button>
                              <button type="submit" className="btn btn-primary">
                                {editingGallery ? 'Update' : 'Add'} Item
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    <div className="gallery-admin-grid">
                      {gallery.map((item) => (
                        <div key={item.id} className="gallery-admin-item">
                          <img src={item.image_url} alt={item.title} />
                          <div className="gallery-item-info">
                            <h4>{item.title}</h4>
                            <p>{item.description || 'No description'}</p>
                            <span className="category-tag">{item.category}</span>
                          </div>
                          <div className="gallery-item-actions">
                            <button className="btn-edit" onClick={() => openGalleryForm(item)}>
                              Edit
                            </button>
                            <button className="btn-delete" onClick={() => deleteGalleryItem(item.id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
