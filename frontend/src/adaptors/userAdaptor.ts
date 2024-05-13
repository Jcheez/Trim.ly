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

export const retrieveProfile = (token: string) => {
  return axios.get(`${BASE}/profile`, { withCredentials: true, headers: { authorization: `Bearer ${token}` } })
}

export const updateUsername = (newUserName: string, token: string) => {
  return axios.put(`${BASE}/update/name`, { username: newUserName }, { withCredentials: true, headers: { authorization: `Bearer ${token}` } })
}

export const updatePassword = (oldPassword: string | undefined, newPassword: string, token: string) => {
  return axios.put(`${BASE}/update/pw`, {
    oldPassword: oldPassword,
    newPassword
  }, { withCredentials: true, headers: { authorization: `Bearer ${token}` } })
}

export const deleteUserAccount = (token: string) => {
  return axios.delete(`${BASE}/delete`, { withCredentials: true, headers: { authorization: `Bearer ${token}` } })
}
