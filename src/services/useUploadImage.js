import { fetchService } from "../config/axios";

const CargarImagen = async () => {
  try {
    const { data } = await fetchService("upload", "post");

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { CargarImagen };
