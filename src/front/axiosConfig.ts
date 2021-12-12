import axios from 'axios';
export const CancelToken = axios.CancelToken;
const port =
  process.env.NEXT_PUBLIC_NGINX_PORT === '80' ||
  process.env.NEXT_PUBLIC_NGINX_PORT === ''
    ? ''
    : `:${process.env.NEXT_PUBLIC_NGINX_PORT}`;
const host =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_NGINX_HOST}${port}`
    : 'localhost:2222';
const protocol =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FRONTEND_PROTOCOL
    : 'http';
const prefix =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BACKEND_PREFIX
    : '';

const baseURL = `${protocol}://${host}${prefix}/`;
console.log({ baseURL });
export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status >= 200 && status < 500,
});

export const makeGetRequest = async <T>(url: string): Promise<T> => {
  return api
    .get(url)
    .then((data) => data.data)
    .catch((e) => console.log(e));
};
export const makePostRequest = async <T>(
  url: string,
  data: any,
): Promise<T> => {
  return api
    .post(url, data)
    .then((data) => data.data)
    .catch((e) => console.log(e));
};

export interface IApiResponse<T> {
  status: boolean;
  error: string | null;
  data: T | null;
}

export interface IApiError {
  detail: [
    {
      loc: string[];
      msg: string;
      type: string;
    },
  ];
}
