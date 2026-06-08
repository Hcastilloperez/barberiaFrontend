import { fetchService } from "../Config/Axios";

const GetUsuarios = async () => {
  try {
    const { data } = await fetchService("usuarios", "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const GetUsuariosbyId = async (id) => {
  try {
    const { data } = await fetchService(`usuarios/${id}`, "get");
    return data;
  } catch (error) {
    throw error;
  }
};

const CreateUsuarios = async (payload) => {
  try {
    const { data } = await fetchService("usuarios", "post", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

const UpdateUsuarios = async (id, payload) => {
  try {
    const { data } = await fetchService(`usuarios/${id}`, "put", payload);
    return data;
  } catch (error) {
    throw error;
  }
};

const ActivarUsuarios = async (id, estado) => {
  try {
    const { data } = await fetchService(`usuarios/${id}/${estado}`, "put");
    return data;
  } catch (error) {
    throw error;
  }
};

const updatePass = async (id, payload) => {
  try {
    const { data } = await fetchService(
      `usuarios/update/pass/${id}`,
      "put",
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const DeleteUsuarios = async (id) => {
  try {
    const { data } = await fetchService(`usuarios/${id}`, "delete");
    return data;
  } catch (error) {
    throw error;
  }
};

const subirFoto = async (id, payload) => {
  //console.log("Subir Foro Front")
  try {
    const { data } = await fetchService(
      `usuarios/usuarios/subir/subirImagen/${id}`,
      "post",
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const GetFoto = async (foto) => {
  try {
    const { data } = await fetchService(
      `usuarios/usuarios/subir/subirImagen/bajarimagen/${foto}`,
      "get"
    );

    return data;
  } catch (error) {
    console.log("Error al obtener la foto", error);
    throw error;
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
  subirFoto,
  GetFoto,
};
