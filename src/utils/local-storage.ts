export const storeData = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrieveData = (key: string) => {
  const data = JSON.parse(String(localStorage.getItem(key)));
  return typeof data === "string" ? data : null;
};

export const removeData = (key: string) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};
