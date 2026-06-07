import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { User, DollarSign, Loader2 } from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import { toast } from "sonner";

import Cabecera from "@/components/Layout/Private/Cabezera";
import Tableordenes from "@/components/Private/ordenes/TableOrdenes/Tableordenes";
import FormOrdenes from "@/components/Private/ordenes/FormOrdenes/formOrdenes";
import FormPagosBarberos from "@/components/Private/pagos/formPagos/FormPagosBarberos";
import Paginacion from "@/components/paginacion/Paginacion.jsx";
import { Card, CardContent } from "@/components/ui/card";

import {
  GetOrdenesbyEstadoBarbero,
  GetOrdenesbyPuesto,
} from "@/Hooks/useOrdenes";

import { GetUsuariosbyId } from "@/Hooks/useUsuarios";
import { GetOrdenServiciobyOrden } from "@/Hooks/useOrdenServicio";

const InfoOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenesperiodo, setordenesPeriodo] = useState([]);
  const [nombre, setNombre] = useState("");

  const [numServiciosPeriodo, setNumeroServiciosPeriodo] = useState(0);
  const [valorPeriodo, setValorPeriodo] = useState(0);

  const [refetch, setRefetch] = useState(false);
  const [verTabla, setVerTabla] = useState(true);

  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.auth);

  const onRefetch = () => setRefetch((prev) => !prev);

  const { id } = useParams();

  const [dataQt, setDataQt] = useState(5);
  const [currentPage, setCurrentePage] = useState(1);
  const [ordenesPag, setOrdenesPag] = useState([]);
  const [nPage, setNPage] = useState(1);

  const indexFin = currentPage * dataQt;
  const indexIni = indexFin - dataQt;

  useEffect(() => {
    setVerTabla(true);
    getInitialData();
  }, [refetch]);

  useEffect(() => {
    if (ordenes.length > 0) {
      setOrdenesPag(ordenes.slice(indexIni, indexFin));
      setNPage(Math.ceil(ordenes.length / dataQt));
    }
  }, [currentPage, dataQt, ordenes]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const result = await GetOrdenesbyPuesto(id);
      setOrdenes(result);
      getValorVentaPeriodo();
      getNombreUsuario();
      setOrdenesPag(result.slice(indexIni, indexFin));
      setNPage(Math.ceil(result.length / dataQt));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getNombreUsuario = async () => {
    try {
      const result = await GetUsuariosbyId(id);
      setNombre(result.nombres + " " + result.apellidos);
    } catch (error) {
      console.log("error", error);
    }
  };

  /*********************************
   *
   *
   *  CALCULO DE VALOR VENTA PERIODO DE UN BARBERO
   *  PARA SABER CUANTO SE LE DEBE PAGAR AL BARBERO POR SUS SERVICIOS EN UN PERIODO
   *  POR EL MOMENTO SE CONDICIONA EL PAGO A 50 / 50 DE LOS SERVICIOS QUE TENGAN LA OPCION DE
   *  PAGARBARBERO EN TRUE, PERO SE PUEDE CAMBIAR LA LOGICA PARA QUE PORCENTAJE PUEDA CAMBIAR
   *
   */
  const getValorVentaPeriodo = async () => {
    try {
      setLoading(true);
      const result = await GetOrdenesbyEstadoBarbero(id);
      setordenesPeriodo(result);

      const servicios = await Promise.all(
        result.map(async (data) => {
          return await GetOrdenServiciobyOrden(data.id);
        }),
      );

      let valorT = 0;
      let num = 0;

      for (let i = 0; i < servicios.length; i++) {
        const ServicioOrden = servicios[i];
        for (let j = 0; j < ServicioOrden.length; j++) {
          if (ServicioOrden[j].Servicio.PagarBarbero === true) {
            valorT =
              valorT +
              ServicioOrden[j].Servicio.valor * ServicioOrden[j].cantidad;
            num = num + 1;
          }
        }
      }

      setValorPeriodo(parseFloat(valorT / 2));
      setNumeroServiciosPeriodo(num);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaOrden = () => {
    setVerTabla((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <Cabecera
          currentComponent={
            verTabla ? (
              <span className="flex items-center gap-2">
                <LogoScissors className="h-5 w-5" />
                Ordenes del Barbero Hoy
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogoScissors className="h-5 w-5" />
                Agregar Orden
              </span>
            )
          }
          nomBoton1={verTabla ? "Nueva Orden" : "Listado Ordenes"}
          linkBoton1={nuevaOrden}
        />

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/40 dark:to-blue-900/40 dark:border-blue-800 py-2">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Barbero
                      </p>
                      <p className="font-semibold text-sm text-blue-700 dark:text-blue-300">{nombre}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950/40 dark:to-green-900/40 dark:border-green-800 py-2">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Venta Periodo
                      </p>
                      <p className="font-bold text-green-700 dark:text-green-300 text-lg">
                        ${valorPeriodo.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/40 dark:to-purple-900/40 dark:border-purple-800 py-2">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center">
                      <LogoScissors className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                        Servicios
                      </p>
                      <p className="font-semibold text-purple-700 dark:text-purple-300 text-lg">
                        {numServiciosPeriodo}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-lg-12">
              {verTabla ? (
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <Tableordenes ordenes={ordenesPag} />
                    <div className="mt-4">
                      <Paginacion
                        nPage={nPage}
                        currentPage={currentPage}
                        setCurrentePage={setCurrentePage}
                      />
                    </div>
                  </div>
                  {valorPeriodo &&
                  (userData.role === "SuperUser" ||
                    userData.role === "Administrador") ? (
                    <div className="w-full lg:w-80">
                      <FormPagosBarberos
                        onRefetch={onRefetch}
                        idBarbero={id}
                        valor={valorPeriodo}
                        ordenesperiodo={ordenesperiodo}
                      />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="py-5">
                  <FormOrdenes onRefetch={onRefetch} id={id} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoOrdenes;
