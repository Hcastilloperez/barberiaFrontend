import { fetchService } from "../config/axios";

const GetPagos = async () => {
  try {
    const { data } = await fetchService("pagos", "get");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/*************************************************
 * 
 * ,MUSTRA TODOS PAGOS REALZADOS DURANTE DEL MES
 * 
 * 
 *************************************************/


const GetPagosbyFecha = async () => {
  try {
    const { data } = await fetchService("pagos/mes", "get");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};



const GetPagosbyId = async (id) => {
  try {
    const { data } = await fetchService(`pagos/${id}`, "get");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};



const CreatePagos = async (payload) => {
  consolole.log("payload", payload);
  try {
   // const { data } = await fetchService("pagos", "post", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const UpdatePagos = async (id, payload) => {
  try {
    const { data } = await fetchService(`pagos/${id}`, "put", payload);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const DeletePagos = async (id) => {
  try {
    const { data } = await fetchService(`pagos/${id}`, "delete");
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  GetPagos,
  GetPagosbyFecha,
  GetPagosbyId,  
  CreatePagos,
  UpdatePagos,
  DeletePagos,
};
