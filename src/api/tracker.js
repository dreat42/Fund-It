import axios from 'axios';

export default axios.create({
  baseURL: 'https://donationbackend.herokuapp.com/',
});
