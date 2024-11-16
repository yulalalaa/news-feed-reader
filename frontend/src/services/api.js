import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchPosts = () => axios.get(`${API_URL}/posts`);
