import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

import { useParams } from "react-router-dom";

import Cabecera from "@/components/Layout/Private/Cabezera";
import { GetOrdenesbyPuesto } from "@/Hooks/useOrdenes";

import { Loader } from "semantic-ui-react";

const InfoBarbero = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const { isAuth, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const onRefetch = () => setRefetch((prev) => !prev);

  const id = userData.id; //EST ES EL ID DEL PUESTO
  console.log(id);
  const nuevaOrden = () => {};

  useEffect(() => {
    //isAuth ? getInitialData() : navigate("/login");

    getInitialData();
  }, [refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);

      const result = await GetOrdenesbyPuesto(id);
      setOrdenes(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent="Listado de ordenes Realizadas"
            nomBoton1="Nueva Orden"
            linkBoton1={nuevaOrden}
          />

          {loading ? (
            <Loader active inline="centered">
              Cargando...
            </Loader>
          ) : (
            <div className="col-lg-12">
              {/**
               *
               * ACA VOY A MOSTRAR LOS COMPONENTES DE LAS ORDENES
               *  QUE HA REALZIADO EL BARBERO Y PERMITIRA ASIGNAR
               *  UNA NUEVA ORDEN
               *
               *  */}
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

export default InfoBarbero;
