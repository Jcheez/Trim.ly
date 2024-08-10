import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '../utils/constants';

const BASE = REACT_APP_BACKEND_URL + '/api/oauth/sgid';

export const getAuthorizationUrl = () => {
  return axios.get(`${BASE}/authurl`, { withCredentials: true })
}
