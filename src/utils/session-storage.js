export const storeData = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const retrieveData = (key) => {
  const storedValue = sessionStorage.getItem(key);
  return JSON.parse(storedValue);
};

export const removeData = (key) => {
  sessionStorage.removeItem(key);
};

export const clearStorage = () => {
  sessionStorage.clear();
};
