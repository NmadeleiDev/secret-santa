const LOCALSTORAGE_KEY =
  process.env.NEXT_APP_LOCALSTORAGE_KEY || 'SECRET_SANTA_DATA';

export const useLocalStorage = () => {
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
  return { getItem, putItem };
};
