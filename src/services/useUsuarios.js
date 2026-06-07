import { fetchService } from "../config/axios";

const GetUsuarios = async () => {
  try {
    const { data } = await fetchService("usuarios", "get");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetUsuariosbyId = async (id) => {
  try {
    const { data } = await fetchService(`usuarios/${id}`, "get");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const CreateUsuarios = async (payload) => {
  try {
    const { data } = await fetchService("usuarios", "post", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const UpdateUsuarios = async (id, payload) => {
  try {
    const { data } = await fetchService(`usuarios/${id}`, "put", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const ActivarUsuarios = async (id, estado) => {
  try {
    const { data } = await fetchService(`usuarios/${id}/${estado}`, "put");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};


const updatePass = async (id, pass) => {
  try {
    console.log(id, pass)
    const { data } = await fetchService(`usuarios/update/pass/${id}/${pass}`, "put");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const DeleteUsuarios = async (id) => {
  try {
    const { data } = await fetchService(`usuarios/${id}`, "delete");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  GetUsuarios,
  GetUsuariosbyId,
  CreateUsuarios,
  UpdateUsuarios,
  ActivarUsuarios,
  DeleteUsuarios,
  updatePass,
};
