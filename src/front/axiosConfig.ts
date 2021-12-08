import axios from 'axios';
export const CancelToken = axios.CancelToken;
const host =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BACKEND_HOSTNAME
    : 'localhost:2222';
const backendHost =
  process.env.NODE_ENV === 'production' ? 'backend:2222' : 'localhost:2222';
const protocol =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROTOCOL
    : 'http';

const baseURL = `${protocol}://${host}/`;
console.log(baseURL);
export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status >= 200 && status < 500,
});
export const backend = axios.create({
  baseURL: `http://${backendHost}/`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => status >= 200 && status < 500,
});

export interface IUser {
  room_id: number;
  name: string;
  likes: string[];
  dislikes: string[];
}

export interface IRoom {
  name: string;
  admin_id: number;
}

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
