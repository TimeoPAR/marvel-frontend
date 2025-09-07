import axios from "axios";

export const API_URL = "http://localhost:4000"; // <- attention au port

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
};
