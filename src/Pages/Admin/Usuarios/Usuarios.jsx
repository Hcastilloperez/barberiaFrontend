import React, { useEffect, useState } from "react";

import { ActivarUsuarios, GetUsuarios } from "@/Hooks/useUsuarios.js";

import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Cabecera from "@/components/Layout/Private/Cabezera";
import TableUsuario from "@/components/Admin/Usuarios/tableUsuarios/TableUsuario.jsx";

import FormUsuario from "@/components/Admin/Usuarios/formUsuarios/FormUsuario.jsx";

import Paginacion from "@/components/paginacion/Paginacion.jsx";

const UsuariosPage = () => {
  const [usuarios, setusuarios] = useState([]);
  const [usuario, setusuario] = useState([]);

  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);

  const onRefetch = () => setRefetch((prev) => !prev);

  const [loading, setLoading] = useState(true);
  const [verTabla, setVerTabla] = useState(true);

  /***
   *  VARIABLES PARA LA PAGINACION
   */
  const [dataQt, setDataQt] = useState(5); //elementos por pagina
  const [currentPage, setCurrentePage] = useState(1); //define la pagina que quiere mostrar
  const [UsuariosPag, setUsuariosPag] = useState([]);
  const [nPage, setNPage] = useState();

  const indexFin = currentPage * dataQt;
  const indexIni = indexFin - dataQt;

  useEffect(() => {
    isAuth ? getInitialData() : navigate("/login");

    //getInitialData();
  }, [indexIni, refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      setVerTabla(true);
      const result = await GetUsuarios();
      setusuarios(result);

      setUsuariosPag(result.slice(indexIni, indexFin));
      setNPage(Math.ceil(result.length / dataQt));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const activarUsuario = async (props) => {
    const usuario = props;

    try {
      await ActivarUsuarios(usuario.id, usuario.estado);
      getInitialData();
    } catch (error) {
      console.log(error);
    }
  };

  const addUsuario = (data) => {
    setusuario(data);

    verTabla ? setVerTabla(false) : setVerTabla(true);
  };

  /*   const actualizarUsuario = (data) => {
    setTitleModal("Actualizar usuario");
    setContentModal(
      <FormUsuarios
        onClose={openCloseModal}
        onRefetch={onRefetch}
        usuario={data}
      />
    );
    openCloseModal();
  }; */

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent={
              verTabla ? "Listado de Usuarios" : "Agregar usuario"
            }
            nomBoton1={verTabla ? "Agregar usuario" : "Listado Usuarios"}
            linkBoton1={addUsuario}
          ></Cabecera>
          {loading ? (
            <Loader active inline="centered">
              Cargando...
            </Loader>
          ) : (
            <div className="col-lg-12 py-10">
              {/**
               *  tabla para mostrar los puestos
               *
               */}

              {verTabla ? (
                <>
                  <TableUsuario
                    usuarios={UsuariosPag}
                    activarUsuario={activarUsuario}
                    updateBarbero={addUsuario}
                  />
                  <Paginacion
                    nPage={nPage}
                    currentPage={currentPage}
                    setCurrentePage={setCurrentePage}
                  />
                </>
              ) : (
                <>
                  <div className="py-5">
                    <FormUsuario usuario={usuario} onRefetch={onRefetch} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UsuariosPage;
