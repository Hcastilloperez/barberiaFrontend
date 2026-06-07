import React, { useEffect, useState } from "react";
import Cabecera from "@/components/Layout/Private/Cabezera.jsx";
import { GetPuestosbyBarbero, UpdatePuestos } from "@/Hooks/usePuesto.js";

import Paginacion from "@/components/paginacion/Paginacion.jsx";

import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TablePuestos from "@/components/Admin/puestos/tablePuestos/TablePuestos.jsx";
import FormPuestos from "@/components/Admin/puestos/formPuestos/FormPuestos.jsx";

import { ModalBasic } from "@/components/Modal/ModalBasic";

const PuestosPage = () => {
  const [puestos, setPuestos] = useState([]);
  const [verTabla, setVerTabla] = useState(true);
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [contentModal, setContentModal] = useState();

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  /***
   *  VARIABLES PARA LA PAGINACION
   */

  const [dataQt, setDataQt] = useState(5); //elementos por pagina
  const [currentPage, setCurrentePage] = useState(1); //define la pagina que quiere mostrar
  const [puestoPag, setPuestoPag] = useState([]);
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
      const result = await GetPuestosbyBarbero();
      setPuestos(result);

      /***
       * FUNCIONALIDAD DE LA PAGINACION
       */

      setPuestoPag(result.slice(indexIni, indexFin));
      setNPage(Math.ceil(result.length / dataQt));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const activarPuestos = async (props) => {
    const puesto = props;
    try {
      await UpdatePuestos(puesto.id, puesto.estado);
      getInitialData();
    } catch (error) {
      console.log(error);
    }
  };

  const addPuesto = () => {
    //console.log("vamos a actulizar");

    //await UpdateEstadoMinuta(idMinuta);
    verTabla ? setVerTabla(false) : setVerTabla(true);
    //navigate("/Formpuestos");
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent={
              verTabla ? "Listado de Puestos" : "Agregar Puesto"
            }
            nomBoton1={verTabla ? "Agragar Puesto" : "Listado Puestos"}
            linkBoton1={addPuesto}
          />
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
                  <TablePuestos
                    puestos={puestoPag}
                    activarPuestos={activarPuestos}
                    estado={puestoPag.estado}
                  />

                  <Paginacion
                    nPage={nPage}
                    currentPage={currentPage}
                    setCurrentePage={setCurrentePage}
                  />
                </>
              ) : (
                <div className="py-5">
                  <FormPuestos onRefetch={onRefetch} />
                </div>
              )}
            </div>
          )}

          {/**
           *  modal para ADD && EDIR
           *
           */}

          <ModalBasic
            show={showModal}
            size="tiny"
            onClose={openCloseModal}
            title={titleModal}
            children={contentModal}
          />
        </div>
      </div>
    </>
  );
};

export default PuestosPage;
