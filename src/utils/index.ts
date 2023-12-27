import { setIsActive } from "./is-active";
import { formatCurrency } from "./format-currency";
import { getRatingAverage } from "./rating-average";
import { makeApiRequest } from "./api-request";
import { wait } from "./wait";
import { capitalize } from "./capitalize";
import { formatDateToNow } from "./format-date";
import { storeData, retrieveData, removeData, clearStorage } from "./local-storage";
import { createCloudinary } from "./cloudinary";
import { auth } from "./user-auth";
import { getCurrentUser } from "./current-user";
import { handleError } from "./handle-error";

export {
  handleError,
  getCurrentUser,
  auth,
  getRatingAverage,
  setIsActive,
  formatCurrency,
  makeApiRequest,
  wait,
  capitalize,
  formatDateToNow,
  storeData,
  retrieveData,
  removeData,
  clearStorage,
  createCloudinary
};
