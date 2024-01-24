import axios from 'axios';

const BASE = process.env.REACT_APP_BACKEND_URL + '/api/shortcuts';

export const retrieveOwnerLinks = (token: string) => {
  return axios.get(`${BASE}/all`, {withCredentials: true, headers: {authorization: `Bearer ${token}`}})
}
