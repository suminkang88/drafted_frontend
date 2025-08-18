import axios from './axios';

export const authRequest = async <T = any>(
  getToken: () => Promise<string | null>,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: any
): Promise<T> => {
  const token = await getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axios.request<T>({
    method,
    url,
    data,
    headers,
    withCredentials: true,
  });

  return response.data;
};
