import axios from 'axios';

const BASE = process.env.REACT_APP_BACKEND_URL + '/api/shortcuts';

export const retrieveOwnerLinks = (token: string) => {
  return axios.get(`${BASE}/all`, { withCredentials: true, headers: { authorization: `Bearer ${token}` } })
}

export const createShortcut = (original: string, shortcut: string, token: string) => {
  return axios.post(`${BASE}/add`, {
    shortcut,
    original
  }, { withCredentials: true, headers: { authorization: `Bearer ${token}` } })
}

export const getShortcut = (shortcut: string) => {
  return axios.get(`${BASE}/retrieve/${shortcut}`)
}
