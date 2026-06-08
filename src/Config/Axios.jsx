import axios from "axios";

//import { BASE_URL } from "./config";

//const BASE_URL = "http://localhost:4001/api";
//const BASE_URL = "http://149.50.144.72:4000/api";
const BASE_URL = "http://192.167.1.54:4001/api";

export const fetchService = async (
  endpoint,
  method,
  data
) => {
  const token = localStorage.getItem("token");
  const URL = `${BASE_URL}/${endpoint}`;

  const headers = {};

  if (token) {
    headers.Authorization = JSON.parse(token);
  }

  if (data instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }

  return axios({
    url: URL,
    method,
    headers,
    data,
  });
};

//export const dir = "http://localhost:4001/api/";
//export const dir = "http://149.50.144.72:4000/api/";
export const dir = "http://192.167.1.54:4001/api/";

//export const FRONTEND_URL = "http://localhost:5172";
export const FRONTEND_URL = "http://192.167.1.54";
