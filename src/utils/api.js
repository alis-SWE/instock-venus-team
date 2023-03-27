import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = {
    //put aka update
  put: (endpoint, formData) => {
    return axios.put(`${API_BASE_URL}${endpoint}`, formData);
  },
  //get
  get: (endpoint) => {
    return axios.get(`${API_BASE_URL}${endpoint}`);
  },
  //post
  post: (endpoint, formData) => {
    return axios.post(`${API_BASE_URL}${endpoint}`, formData);
  },
  //delete
  delete: (endpoint) => {
    return axios.delete(`${API_BASE_URL}${endpoint}`);
  },
};

export default api;
