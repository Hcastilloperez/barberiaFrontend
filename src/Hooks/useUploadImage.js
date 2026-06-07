import { fetchService } from "../config/axios";

const CargarImagen = async (payload) => {
  try {
    const { data } = await fetchService("upload", "post", payload);

    return data;
  } catch (error) {
    throw error;
  }
};

export { CargarImagen };
