import axios from 'axios';

export default axios.create({
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  timeout: 10000,
  withCredentials: false,
  responseType: 'json',
  maxRedirects: 0
});
