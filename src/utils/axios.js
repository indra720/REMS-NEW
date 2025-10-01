import axios from 'axios';

// Global axios configuration
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default axios;
