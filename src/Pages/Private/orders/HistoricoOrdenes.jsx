import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { History, DollarSign, Scissors, Calendar, Loader2 } from "lucide-react";
import moment from "moment/moment";

import Cabecera from "@/components/Layout/Private/Cabezera";
import TableOrdenesHistorico from "@/components/Private/ordenes/TableOrdenes/TableOrdenesHistorico";
import Paginacion from "@/components/paginacion/Paginacion";

import {
  GetOrdenesbyEstadoBarbero,
  GetOrdenesbyHistoricoMes,
} from "@/Hooks/useOrdenes";
import { GetOrdenServiciobyOrden } from "@/Hooks/useOrdenServicio";
import { Card, CardContent } from "@/components/ui/card";
import { get } from "lodash";

const HistoricoOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [numServiciosPeriodo, setNumeroServiciosPeriodo] = useState(0);
  const [valorPeriodo, setValorPeriodo] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.auth);

  const [dataQt] = useState(5);
  const [currentPage, setCurrentePage] = useState(1);
  const [ordenesPag, setOrdenesPag] = useState([]);
  const [nPage, setNPage] = useState(1);

  const indexFin = currentPage * dataQt;
  const indexIni = indexFin - dataQt;

  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    getInitialData();
  }, [indexIni, refetch, userData.id]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      let result;

      if (userData.role === "SuperUser" || userData.role === "Administrador") {
        result = await GetOrdenesbyHistoricoMes();
        getValorVentaTotalPeriodo(result);
      } else {
        result = await GetOrdenesbyEstadoBarbero(userData.id);
        getValorVentaTotalBarbero(result);
      }

      setOrdenes(result);
      setOrdenesPag(result.slice(indexIni, indexFin));
      setNPage(Math.ceil(result.length / dataQt));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para calcular el valor total de ventas del periodo ventas totales de la barberia seria la suma de todos
  //  los servicios que tengan PagarBarbero en true, multiplicado por la cantidad de cada servicio,
  // para el barbero seria la suma de todos los servicios que tengan PagarBarbero en true,
  // multiplicado por la cantidad de cada servicio, pero solo para las ordenes que tenga el id del barbero

  /* 
  const getValorVentaPeriodo = async () => {
    try {
      const result = await GetOrdenesbyEstadoBarbero(userData.id);
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
        console.log("Valor Total: ", valorT);
      }

      setValorPeriodo(valorT);
      setNumeroServiciosPeriodo(num);
    } catch (error) {
      console.log(error);
    }
  }; */

  /*********************************
   *
   *
   *  CALCULO DE VALOR VENTA PERIODO DE UN BARBERO
   *  PARA SABER CUANTO SE LE DEBE PAGAR AL BARBERO POR SUS SERVICIOS EN UN PERIODO
   *  POR EL MOMENTO SE CONDICIONA EL PAGO A 50 / 50 DE LOS SERVICIOS QUE TENGAN LA OPCION DE
   *  PAGARBARBERO EN TRUE, PERO SE PUEDE CAMBIAR LA LOGICA PARA QUE PORCENTAJE PUEDA CAMBIAR
   *
   */

  const getValorVentaTotalBarbero = async (ordenes) => {
    try {
      // const result = await GetOrdenesbyEstadoBarbero(userData.id);
      const servicios = await Promise.all(
        ordenes.map(async (data) => {
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
        console.log("Valor Total: ", valorT);
      }

      setValorPeriodo(parseFloat(valorT / 2));
      setNumeroServiciosPeriodo(num);
    } catch (error) {
      console.log(error);
    }
  };

  /***************************************
   *
   *  calculo de valor venta total periodo,
   *  que es la suma del total de todas las ordenes del periodo,
   *
   *
   */

  const getValorVentaTotalPeriodo = async (ordenes) => {
    let valorT = 0;
    let num = 0;

    try {
      for (let i = 0; i < ordenes.length; i++) {
        valorT = valorT + parseFloat(ordenes[i].valorOrden || 0);

        num = num + 1;
        console.log("Valor Total itinerante: ", valorT);
      }

      setValorPeriodo(valorT);
      setNumeroServiciosPeriodo(num);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <Cabecera
          currentComponent={
            <span className="flex items-center gap-2">
              <History className="h-5 w-5 text-yellow-600" />
              Histórico de Ordenes
            </span>
          }
        />

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 py-2">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium">
                        {userData.role === "SuperUser" ||
                        userData.role === "Administrador"
                          ? "Total Historico Barberia"
                          : "Total Historico Barbero"}
                      </p>
                      <p
                        className={
                          valorPeriodo < 0
                            ? "font-bold text-red-600 text-lg"
                            : "font-bold text-blue-700 text-lg"
                        }
                      >
                        {valorPeriodo < 0 ? "-" : ""}$
                        {Math.abs(valorPeriodo).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 py-2">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center">
                      <Scissors className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium">
                        Servicios
                      </p>
                      <p className="font-semibold text-green-700 text-lg">
                        {numServiciosPeriodo}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 py-2">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-600 font-medium">
                        Ordenes
                      </p>
                      <p className="font-semibold text-purple-700 text-lg">
                        {ordenes.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-lg-12">
              <TableOrdenesHistorico ordenes={ordenesPag} />
              <div className="mt-4">
                <Paginacion
                  nPage={nPage}
                  currentPage={currentPage}
                  setCurrentePage={setCurrentePage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoricoOrdenes;
