import React, { useEffect, useState } from "react";
import Cabecera from "@/components/Layout/Private/Cabezera.jsx";
import { GetPuestosbyBarbero, UpdatePuestos } from "@/Hooks/usePuesto.js";

import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormPuestos from "@/components/Admin/puestos/formPuestos/FormPuestos.jsx";

const FormPuestosPage = () => {
  const [puestos, setPuestos] = useState([]);
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
    // isAuth ? getInitialData() : navigate("/login");
    getInitialData();
  }, [indexIni, refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);
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

  const verPuesto = () => {
    navigate("/Puestos");
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent="Agregar Puesto"
            nomBoton1="Listado Puestos"
            linkBoton1={verPuesto}
          />
          {loading ? (
            <Loader active inline="centered">
              Cargando...
            </Loader>
          ) : (
            <div className="col-lg-12 py-5">
              {/**
               *  tabla para mostrar los puestos
               *
               */}

              <FormPuestos />
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

export default FormPuestosPage;
