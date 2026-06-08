import { fetchService } from "../Config/Axios";

const IntentSuperLogin = async (payload) => {
  try {
    const { data } = await fetchService("usuarios/super/login", "post", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { IntentSuperLogin };