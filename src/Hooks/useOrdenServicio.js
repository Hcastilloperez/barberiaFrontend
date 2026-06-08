import { fetchService } from "../Config/Axios";

const GetOrdenServicio = async () => {
  try {
    const { data } = await fetchService("ordenServicios", "get");
    return data;
  } catch (error) {
    throw error;
  }
};

/***
 * 
 * trae todas los servicios asociaos a una orden
 * 
 */
const GetOrdenServiciobyOrden = async (idOrden) => {
  try {
    const { data } = await fetchService(`ordenServicios/${idOrden}`, "get");
    return data;
  } catch (error) {
    throw error;
  }
};


/***
 * 
 * busca si existe un  servicio dentro una orden
 * 
 */
const buscarServicioOrden = async (idOrden, idServicio) => {
  try {
    const { data } = await fetchService(`ordenServicios/${idOrden}/${idServicio}`, "get");
    return data;
  } catch (error) {
    throw error;
  }
};



const CreateOrdenServicio = async (payload) => {
  try {
    const { data } = await fetchService("ordenServicios", "post", payload);

    return data;
  } catch (error) {
    throw error;
  }
};

const UpdateOrdenServicio = async (id, payload) => {
  try {
    const { data } = await fetchService(`ordenServicios/${id}`, "put", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

const DeleteOrdenServicio = async (id) => {
  try {
    const { data } = await fetchService(`ordenServicios/${id}`, "delete");
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  GetOrdenServicio,
  GetOrdenServiciobyOrden,
  buscarServicioOrden,
  CreateOrdenServicio,
  UpdateOrdenServicio,
  DeleteOrdenServicio,
};
