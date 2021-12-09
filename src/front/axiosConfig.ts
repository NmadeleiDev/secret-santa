import axios from 'axios';
export const CancelToken = axios.CancelToken;
const host =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_FRONTEND_HOST}:2222`
    : 'localhost:2222';
const protocol =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FRONTEND_PROTOCOL
    : 'http';

const baseURL = `${protocol}://${host}/`;
console.log({ baseURL });
export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status >= 200 && status < 500,
});

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
