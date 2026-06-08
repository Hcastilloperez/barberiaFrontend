import { fetchService } from "../Config/Axios";
//const baseUrl = "http://localhost:4000/api/users/login";

const IntentLogin = async (payload) => {
  try {
    const { data } = await fetchService("usuarios/login", "post", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { IntentLogin };
