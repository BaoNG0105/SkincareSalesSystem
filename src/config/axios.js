import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com' // Thay đổi URL API bằng URL API của Backend
  });

export default api;