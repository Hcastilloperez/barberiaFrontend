import { fetchService } from "../config/axios";

const GetComodin = async (comodin) => {
  try {
    const { data } = await fetchService(`comodines/${comodin}`, "get");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const CreateComodin = async (payload) => {
  try {
    const { data } = await fetchService("comodines", "post", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { GetComodin, CreateComodin };
