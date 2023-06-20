import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export default customFetch;