import { api, IApiResponse } from 'axiosConfig';
import { setUser } from 'store/feaures/user';
import { useAppDispatch } from 'store/store';
import { IUser } from 'types/UserType';

const LOCALSTORAGE_KEY =
  process.env.NEXT_APP_LOCALSTORAGE_KEY || 'SECRET_SANTA_DATA';

export const useLocalStorage = () => {
  const dispatch = useAppDispatch();
  const getItem = (key: string) => {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    if (data) return JSON.parse(data)?.[key];
  };
  const putItem = (key: string, value: string | number) => {
    const data = localStorage.getItem(LOCALSTORAGE_KEY);
    const json = data ? JSON.parse(data) : {};
    json[key] = value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(json));
  };
  const login = async (id: string) => {
    const { data } = await api.get<IApiResponse<IUser>>(`user/${id}/info`);
    if (data.data) {
      dispatch(setUser({ ...data.data, id }));
    }
  };
  return { getItem, putItem, login };
};
