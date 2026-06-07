import { fetchService } from "../config/axios";

const GetPuestos = async () => {
  try {
    const { data } = await fetchService("puestos", "get");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetPuestosbyId = async (id) => {
  try {
    const { data } = await fetchService(`puestos/${id}`, "get");

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const GetPuestosbyBarbero = async () => {
  try {
    const { data } = await fetchService(`puestos/barbero/listado/`, "get");

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/***
 *  TRAE LISTADO DE LOS PUESTOS POR ESTADO Y LA INFOR DEL BARBERO QUE ESTA EN EN 
 * ESE PUESTO
 * 
 */

const GetPuestosbyEstado = async (estado) => {
  try {
    const { data } = await fetchService(`puestos/listado/${estado}`, "get");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const CreatePuestos = async (payload) => {
  try {
    const { data } = await fetchService("puestos", "post", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const UpdatePuestos = async (id, estado) => {
  try {
    const { data } = await fetchService(`puestos/${id}/${estado}`, "put");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const DeletePuestos = async (id) => {
  try {
    const { data } = await fetchService(`puestos/${id}`, "delete");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  GetPuestos,
  GetPuestosbyId,
  GetPuestosbyBarbero,
  GetPuestosbyEstado,
  CreatePuestos,
  UpdatePuestos,
  DeletePuestos,
};
