import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";

import { GetClientes } from "@/Hooks/useClientes";
import Cabecera from "@/components/Layout/Private/Cabezera.jsx";
//import { ModalBasic } from "../../../components/common/ModalBasic/ModalBasic.jsx";

import TableClientes from "@/components/Admin/clientes/tableClientes/TableClientes.jsx";
import FormClientes from "@/components/Admin/clientes/formClientes/FormClientes.jsx";
import Paginacion from "@/components/paginacion/Paginacion.jsx";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ClientePage = () => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [VerTable, setVerTable] = useState(true);
  const [loading, setLoading] = useState(true);

  const { isAuth } = useSelector((state) => state.auth);

  const [refetch, setRefetch] = useState(false);
  const onRefetch = () => setRefetch((prev) => !prev);

  const navigate = useNavigate();

  /***
   *  VARIABLES PARA LA PAGINACION
   */
  const [dataQt, setDataQt] = useState(5); //elementos por pagina
  const [currentPage, setCurrentePage] = useState(1); //define la pagina que quiere mostrar
  const [clientesPag, setClientesPag] = useState([]);
  const [nPage, setNPage] = useState();

  const indexFin = currentPage * dataQt;
  const indexIni = indexFin - dataQt;

  useEffect(() => {
    isAuth ? getInitialData() : navigate("/login");

    /* console.log("INICIO TABLA");
    setVerTable(true); */

    //getInitialData();
  }, [indexIni, refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const result = await GetClientes();
      setClientes(result);
      setLoading(false);
      setVerTable(true);

      /***
       * FUNCIONALIDAD DE LA PAGINACION
       */
      setClientesPag(result.slice(indexIni, indexFin));
      setNPage(Math.ceil(result.length / dataQt));
    } catch (error) {
      console.log(error);
    }
  };

  const addCliente = (data) => {
    setCliente(data);

    VerTable ? setVerTable(false) : setVerTable(true);

    console.log("Cleinte Edit", data);
  };

  const guardarCliente = () => {
    console.log("VAMOS");
  };

  const actualzarCliente = (data) => {
    // navigate(`/Formclientes/${data}`);78
  };

  const addServicio = () => {
    alert("funcion pendiente por desarrolar desde esta ventana");
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent={
              VerTable ? "Listado de Clientes" : "Agregar Cliente"
            }
            nomBoton1={VerTable ? "Agregar de Clientes" : "Listado Cliente"}
            linkBoton1={addCliente}
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
              {VerTable ? (
                <>
                  <TableClientes
                    clientes={clientesPag}
                    updatePersona={addCliente}
                    addServicio={addServicio}
                    onRefetch={onRefetch}
                  />
                  <Paginacion
                    nPage={nPage}
                    currentPage={currentPage}
                    setCurrentePage={setCurrentePage}
                  />
                </>
              ) : (
                <div className="py-5">
                  <FormClientes
                    cliente={cliente}
                    addCliente={addCliente}
                    onRefetch={onRefetch}
                  />
                </div>
              )}
            </div>
          )}
          {/**
           *  modal para ADD && EDIR
           *
           */}
        </div>
      </div>
    </>
  );
};

export default ClientePage;
