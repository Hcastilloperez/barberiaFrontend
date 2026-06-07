import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreditCard, DollarSign, Plus, Loader2 } from "lucide-react";

import Cabecera from "@/components/Layout/Private/Cabezera";
import TablaPagos from "@/components/Private/pagos/tablePagos/TablePagos";
import FormPagos from "@/components/Private/pagos/formPagos/FormPagos";
import Paginacion from "@/components/paginacion/Paginacion.jsx";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

import { GetPagosbyFecha } from "@/Hooks/usePagos";

const PagosPage = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [pago, setPago] = useState(null);

  const onRefetch = () => setRefetch((prev) => !prev);
  const navigate = useNavigate();

  const [dataQt] = useState(5);
  const [currentPage, setCurrentePage] = useState(1);
  const [pagosPag, setPagosPag] = useState([]);
  const [nPage, setNPage] = useState(1);

  const indexFin = currentPage * dataQt;
  const indexIni = indexFin - dataQt;

  const [verTabla, setVerTabla] = useState(true);

  useEffect(() => {
    setVerTabla(true);
    getInitialData();
  }, [indexIni, refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const result = await GetPagosbyFecha();
      setPagos(result);
      setPagosPag(result.slice(indexIni, indexFin));
      setNPage(Math.ceil(result.length / dataQt));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoPago = (data) => {
    setPago(data);

    verTabla ? setVerTabla(false) : setVerTabla(true);
  };

  const totalPagos = pagos.reduce(
    (sum, p) => sum + parseFloat(p.valor || 0),
    0,
  );

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <Cabecera
          currentComponent={
            verTabla ? (
              <span className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-yellow-600" />
                Listado de Pagos
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-yellow-600" />
                {pago?.id ? "Editar Pago" : "Nuevo Pago"}
              </span>
            )
          }
          nomBoton1={verTabla ? "Nuevo Pago" : "Listado de Pagos"}
          linkBoton1={() => nuevoPago(null)}
        />

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
          </div>
        ) : (
          <div className="col-lg-12 py-10">
            {verTabla ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 py-2">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium">
                            Total Pagos
                          </p>
                          <p
                            className={
                              totalPagos < 0
                                ? "font-bold text-red-600 text-lg"
                                : "font-bold text-green-700 text-lg"
                            }
                          >
                            {totalPagos < 0 ? "-" : ""}$
                            {Math.abs(totalPagos).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 py-2">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-600 font-medium">
                            Cantidad
                          </p>
                          <p className="font-semibold text-blue-700 text-lg">
                            {pagos.length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <TablaPagos pagos={pagosPag} updatePago={nuevoPago} />
                <div className="mt-4">
                  <Paginacion
                    nPage={nPage}
                    currentPage={currentPage}
                    setCurrentePage={setCurrentePage}
                  />
                </div>
              </>
            ) : (
              <div className="py-5 max-w-md mx-auto">
                <FormPagos onRefetch={onRefetch} pago={pago} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PagosPage;
