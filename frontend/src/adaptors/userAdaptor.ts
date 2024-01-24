import axios from 'axios';

const BASE = process.env.REACT_APP_BACKEND_URL + '/api/users';

export const registerUser = (
  username: string,
  email: string,
  password: string
) => {
  return axios.post(`${BASE}/register`, {
    username,
    email,
    password
  });
};

export const signinUser = (email: string, password: string) => {
  return axios.post(
    `${BASE}/login`,
    {
      email,
      password
    },
    { withCredentials: true }
  );
};

export const refreshUserAccess = () => {
  return axios.get(`${BASE}/refresh`, { withCredentials: true });
};

export const signoutUser = () => {
  return axios.get(`${BASE}/logout`, { withCredentials: true })
}
