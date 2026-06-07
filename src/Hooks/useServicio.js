import { fetchService } from "../config/axios";

/***
 *
 * LISTA TODOS LOS SERVICIOS
 *
 */

const GetServicios = async () => {
  try {
    const { data } = await fetchService("servicios", "get");
    return data;
  } catch (error) {
    throw error;
  }
};

/***
 *
 * LISTA SOLO LOS SERVIVIOS ACTIVOS
 * CONSULTA PARA LA VENTANA DE AGREGAR SERVICIOS A  UNA ORDEN
 *
 */

const GetServiciosEstado = async () => {
  try {
    const { data } = await fetchService("servicios/listado", "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const CreateServicios = async (payload) => {
  try {
    const { data } = await fetchService("servicios", "post", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

const UpdateServicios = async (id, payload) => {
  try {
    const { data } = await fetchService(`servicios/${id}`, "put", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

const ActivarServicios = async (id, estado) => {
  try {
    const { data } = await fetchService(`servicios/${id}/${estado}`, "put");
    return data;
  } catch (error) {
    throw error;
  }
};

const DeleteServicios = async (id) => {
  try {
    const { data } = await fetchService(`servicios/${id}`, "delete");
    return data;
  } catch (error) {
    throw error;
  }
};

const subirFotoServicio = async (id, payload) => {
  try {
    const { data } = await fetchService(
      `usuarios/usuarios/subir/subirImagen/${id}`,
      "post",
      payload,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  GetServicios,
  GetServiciosEstado,
  CreateServicios,
  UpdateServicios,
  ActivarServicios,
  DeleteServicios,
  subirFotoServicio,
};
