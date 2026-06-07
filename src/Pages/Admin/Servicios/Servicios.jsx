import React, { useEffect, useState } from "react";

import Cabecera from "@/components/Layout/Private/Cabezera";
import TableServicios from "@/components/Admin/Servicios/tableServicios/TableServicios";
import FormServicios from "@/components/Admin/Servicios/formServicios/FormServicios";
import { GetServicios, ActivarServicios } from "@/Hooks/useServicio";

import Paginacion from "@/components/paginacion/Paginacion";

import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Scissors } from "lucide-react";

const ServiciosPage = () => {
  const [servicios, setServicios] = useState([]);
  const [servicio, setServicio] = useState([]);

  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);

  const [loading, setLoading] = useState(true);
  const [verTabla, setVerTabla] = useState(true);

  const [dataQt, setDataQt] = useState(5);
  const [currentPage, setCurrentePage] = useState(1);
  const [serviciosPag, setServiciosPag] = useState([]);
  const [nPage, setNPage] = useState(1);

  const indexFin = currentPage * dataQt;
  const indexIni = indexFin - dataQt;

  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    isAuth ? getInitialData() : navigate("/login");
  }, [indexIni, refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      setVerTabla(true);
      const result = await GetServicios();
      setServicios(result);

      setServiciosPag(result.slice(indexIni, indexFin));
      setNPage(Math.ceil(result.length / dataQt));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const activarServicio = async (props) => {
    const usuario = props;

    try {
      await ActivarServicios(usuario.id, usuario.estado);
      getInitialData();
    } catch (error) {
      console.log(error);
    }
  };

  const addServicio = (data) => {
    setServicio(data);

    verTabla ? setVerTabla(false) : setVerTabla(true);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent={
              verTabla ? (
                <span className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-yellow-600" />
                  Listado de Servicios
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-yellow-600" />
                  {servicio?.id ? "Editar Servicio" : "Agregar Servicio"}
                </span>
              )
            }
            nomBoton1={verTabla ? "Agregar Servicio" : "Listado Servicio"}
            linkBoton1={addServicio}
          />

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
            </div>
          ) : (
            <div className="col-lg-12 py-10">
              {verTabla ? (
                <>
                  <TableServicios
                    servicios={serviciosPag}
                    activarServicio={activarServicio}
                    updateServicio={addServicio}
                  />

                  <div className="mt-4">
                    <Paginacion
                      nPage={nPage}
                      currentPage={currentPage}
                      setCurrentePage={setCurrentePage}
                    />
                  </div>
                </>
              ) : (
                <div className="py-5">
                  <FormServicios
                    servicio={servicio}
                    onRefetch={onRefetch}
                    onCancel={() => setVerTabla(true)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServiciosPage;
