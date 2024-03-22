import axios from 'axios';

const BASE = process.env.REACT_APP_BACKEND_URL + '/api/oauth/sgid';

export const getAuthorizationUrl = () => {
  return axios.get(`${BASE}/authurl`, { withCredentials: true })
}
