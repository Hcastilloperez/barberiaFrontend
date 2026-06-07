import { fetchService } from "../config/axios";

const GetComodin = async (comodin) => {
  try {
    const { data } = await fetchService(`comodines/${comodin}`, "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const GetAllComodines = async () => {
  try {
    const { data } = await fetchService("comodines", "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const CreateComodin = async (payload) => {
  try {
    const { data } = await fetchService("comodines", "post", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

const UpdateComodin = async (id, payload) => {
  try {
    const { data } = await fetchService(`comodines/${id}`, "put", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export { GetComodin, GetAllComodines, CreateComodin, UpdateComodin };
