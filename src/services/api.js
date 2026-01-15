const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://glam-tips-nid8.vercel.app/api";

// Services API
export const getServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) throw new Error("Failed to fetch services");
    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    if (!response.ok) throw new Error("Failed to fetch service");
    return await response.json();
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

// Appointments API
export const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create appointment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    if (!response.ok) throw new Error("Failed to fetch appointments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

export const getAvailableSlots = async (date) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/appointments/availability/${date}`
    );
    if (!response.ok) throw new Error("Failed to fetch availability");
    return await response.json();
  } catch (error) {
    console.error("Error fetching availability:", error);
    throw error;
  }
};

// Gallery API
export const getGallery = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) throw new Error("Failed to fetch gallery");
    return await response.json();
  } catch (error) {
    console.error("Error fetching gallery:", error);
    throw error;
  }
};

export const getGalleryById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`);
    if (!response.ok) throw new Error("Failed to fetch gallery item");
    return await response.json();
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    throw error;
  }
};
