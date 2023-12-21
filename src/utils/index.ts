import { setIsActive } from "./is-active";
import { formatCurrency } from "./format-currency";
import { getRatingAverage } from "./rating-average";
import { makeApiRequest } from "./api-request";
import { wait } from "./wait";
import { capitalize } from "./capitalize";
import { formatDateToNow } from "./format-date";
import {
  storeData,
  retrieveData,
  removeData,
  clearStorage
} from "./session-storage";
import { createCloudinary } from "./cloudinary";
import { checkIfAuthenticated } from "./check-auth";
import { getCurrentUser } from "./current-user";

export {
  getCurrentUser,
  checkIfAuthenticated,
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
