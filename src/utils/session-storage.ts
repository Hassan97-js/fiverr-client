export const storeData = (key: string, value: string) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const retrieveData = (key: string) => {
  return sessionStorage.getItem(key);
};

export const removeData = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clearStorage = () => {
  sessionStorage.clear();
};
