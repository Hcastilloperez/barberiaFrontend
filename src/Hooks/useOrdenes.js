import { fetchService } from "../config/axios";

const GetOrdenes = async () => {
  try {
    const { data } = await fetchService("ordenes", "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const GetOrdenesInfo = async (id) => {
  try {
    const { data } = await fetchService(`ordenes/${id}`, "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const GetOrdenesbyPuesto = async (idPuesto) => {
  console.log("Ordenes por puesto", idPuesto);
  try {
    const { data } = await fetchService(`ordenes/puesto/${idPuesto}`, "get");
    console.log("Ordenes", data);
    return data;
  } catch (error) {
    throw error;
  }
};

/******************************************************
 *
 * TODAS LAS ORDENES CERRADAS Y NO PAGADAS DEL MES
 *
 * CONSULTA REALZIADA PARA SABER LA VENTA DE LA SEMANA (PERIODO)
 *
 * (POR SERVICIOS DE BARBERIA)
 *
 ***************************************************/
const GetOrdenesbyEstado = async () => {
  try {
    const { data } = await fetchService(`ordenes/ordenes/estado/`, "get");
    return data;
  } catch (error) {
    throw error;
  }
};

/******************************************************
 *
 * TODAS LAS ORDENES POR PUESTO Y ABIERTAS
 *
 * CONSULTA PARA SABER SI EL BARBERO ESTA OCUPADO O NO
 *
 *
 *
 ***************************************************/
const GetOrdenesbyEstadobyPuesto = async (idPuesto) => {
  //console.log("servicios", idPuesto);
  try {
    const { data } = await fetchService(
      `ordenes/ordenes/puesto/estado/${idPuesto}`,
      "get"
    );
    return data;
  } catch (error) {
    throw error;
  }
};

/*****************************************************
 *
 * TODAS LAS ORDENES CERRADAS DEL MES
 *
 * CONSULTA REALZIDA PARA SABER LA VENTA DEL MES
 *
 *  (POR SERVICIOS DE BARBERIA)
 *
 ***************************************************/

const GetOrdenesbyVentaMes = async () => {
  try {
    const { data } = await fetchService(`ordenes/ordenes/venta/mes/`, "get");
    return data;
  } catch (error) {
    throw error;
  }
};

/*****************************************************
 *
 * TODAS LAS ORDENES CERRADAS DEL MES
 *
 * CONSULTA REALZIDA PARA MOSTAR EL HISTORICO
 *
 *  (CON NOMBRE DEL BARBERO)
 *
 ***************************************************/

const GetOrdenesbyHistoricoMes = async () => {  
  try {
    const { data } = await fetchService(
      `ordenes/ordenes/historico/ordenes/mes/`,
      "get"
    );
    return data;
  } catch (error) {
    throw error;
  }
};

/******************************************************
 *
 * TODAS LAS ORDENES CERRADAS Y NO PAGADAS DEL MES X BARBERO
 *
 * CONSULTA REALZIADA PARA SABER LA VENTA DE LA SEMANA (PERIODO)
 *
 * (POR SERVICIOS DE BARBERIA)
 *
 ***************************************************/
const GetOrdenesbyEstadoBarbero = async (id) => {
  try {
    const { data } = await fetchService(
      `ordenes/ordenes/estado/barbero/${id}`,
      "get"
    );
    return data;
  } catch (error) {   
    throw error;
  }
};

const CreateOrdenes = async (payload) => {
  try {
    const { data } = await fetchService("ordenes", "post", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

/****
 *
 *  CIERRA LAS ORDENES DE SERVICIO  Y REGISTRA EL MONTO DEL PAGO DEL CLIENTE
 *
 */

const CierraOrdenes = async (id, payload) => {
  try {
    const { data } = await fetchService(
      `ordenes/ordenes/${id}`,
      "put",
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

/***
 *  ACTUALZIA TODAS LAS ORDENES A ESTADO PAGADAS DESPUES QUE SE LIQUIDA A UN BARBERO
 * EL PERIODO DE TRABAJO
 *
 */

const liquidarOrdenes = async (id) => {
  // console.log("ID", id)
  try {
    const { data } = await fetchService(
      `ordenes/ordenes/liquidar/${id}`,
      "put"
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const DeleteOrdenes = async (id) => {
  try {
    const { data } = await fetchService(`ordenes/${id}`, "delete");
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  GetOrdenes,
  GetOrdenesInfo,
  GetOrdenesbyPuesto,
  GetOrdenesbyEstado,
  GetOrdenesbyEstadobyPuesto,
  GetOrdenesbyVentaMes,
  GetOrdenesbyEstadoBarbero,
  GetOrdenesbyHistoricoMes,
  CreateOrdenes,
  DeleteOrdenes,
  CierraOrdenes,
  liquidarOrdenes,
};
