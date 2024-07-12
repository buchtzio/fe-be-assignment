import api from '../api';

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const fetchUserInfo = async (token: string) => {
  const response = await api.get('/auth/user-info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
