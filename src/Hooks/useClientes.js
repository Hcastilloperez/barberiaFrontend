import { fetchService } from "../config/axios";

const GetClientes = async () => {
  try {
    const { data } = await fetchService("clientes", "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const getClienteCumpleByfecha = async () => {
  try {
    const { data } = await fetchService("clientes/cumpleanos/clientes", "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const CreateClientes = async (payload) => {
  try {
    const { data } = await fetchService("clientes", "post", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

const UpdateClientes = async (id, payload) => {
  try {
    const { data } = await fetchService(`clientes/${id}`, "put", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

const DeleteClientes = async (id) => {
  try {
    const { data } = await fetchService(`clientes/${id}`, "delete");
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  GetClientes,
  CreateClientes,
  getClienteCumpleByfecha,
  UpdateClientes,
  DeleteClientes,
};
