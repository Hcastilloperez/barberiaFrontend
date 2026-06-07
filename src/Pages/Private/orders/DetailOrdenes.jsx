import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Scissors, DollarSign, User, Calendar, Loader2 } from "lucide-react";
import ListServicios from "@/components/Private/servicios/ListServicios/ListServicios";
import {
  GetOrdenServiciobyOrden,
  DeleteOrdenServicio,
} from "@/Hooks/useOrdenServicio";
import { GetUsuariosbyId } from "@/Hooks/useUsuarios";
import { GetOrdenesInfo } from "@/Hooks/useOrdenes";
import TableOrdenServicio from "@/components/Private/ordenServicio/TablaOrdenServicio/TableOrdenServicio";
import FormPagarOrden from "@/components/Private/ordenServicio/FormPagarOrden/FormPagarOrden";
import { toast } from "sonner";
import Cabecera from "@/components/Layout/Private/Cabezera";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DetailOrdenes = () => {
  const { idOrder } = useParams();
  const [loading, setLoading] = useState(true);
  const { isAuth, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [refetch, setRefetch] = useState(false);
  const [ordenServicios, setOrdenServicios] = useState([]);
  const [orden, setOrden] = useState(null);
  const [barbero, setBarbero] = useState(null);
  const [verTabla, setVerTabla] = useState(true);
  const [totalOrden, setTotalOrden] = useState(0);

  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    setVerTabla(true);
    getInitialData();
  }, [refetch, idOrder]);

  const getInitialData = async () => {
    await Promise.all([GetOrdenServiciosAll(idOrder), GetOrdenInfo(idOrder)]);
  };

  const GetOrdenServiciosAll = async (id) => {
    try {
      setLoading(true);
      const result = await GetOrdenServiciobyOrden(id);
      setOrdenServicios(result);
      CalcualarTotalOrden(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GetOrdenInfo = async (id) => {
    try {
      const result = await GetOrdenesInfo(id);
      setOrden(result);
      if (result?.puesto) {
        const barberoResult = await GetUsuariosbyId(result.puesto);
        setBarbero(barberoResult);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CalcualarTotalOrden = (data) => {
    if (!data || data.length === 0) {
      setTotalOrden(0);
      return;
    }
    const total = data.reduce(
      (sum, orden) =>
        sum +
        parseFloat(orden.Servicio?.valor || 0) *
          parseFloat(orden.cantidad || 0),
      0,
    );
    setTotalOrden(total);
  };

  const listadoOrdenes = () => {
    navigate(`/infoOrdenes/${barbero?.id}`);
  };

  const nuevoServicio = () => {
    setVerTabla((prev) => !prev);
  };

  const deleteServicio = async (ordenServicio) => {
    try {
      await DeleteOrdenServicio(ordenServicio.id);
      toast.success("Servicio eliminado");
      getInitialData();
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar servicio");
    }
  };

  const showPayment =
    ordenServicios.length > 0 &&
    (userData.role === "SuperUser" || userData.role === "Administrador");

  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        <Cabecera
          currentComponent={
            verTabla ? (
              <span className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-yellow-600" />
                Servicios de la Orden
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-yellow-600" />
                Seleccionar Servicio
              </span>
            )
          }
          nomBoton1={verTabla ? "Agregar Servicio" : "Ver Servicios"}
          linkBoton1={nuevoServicio}
          nomBoton2="Listado Ordenes"
          linkBoton2={listadoOrdenes}
        />

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
          </div>
        ) : (
          <>
            {orden && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950/40 dark:to-blue-900/40 dark:border-blue-800">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          Cliente
                        </p>
                        <p className="font-semibold text-foreground">
                          {orden.Cliente?.nombres} {orden.Cliente?.apellidos}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/40 dark:to-purple-900/40 dark:border-purple-800">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center">
                        <Scissors className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                          Barbero
                        </p>
                        <p className="font-semibold text-foreground">
                          {barbero?.nombres} {barbero?.apellidos}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950/40 dark:to-green-900/40 dark:border-green-800">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Total
                        </p>
                        <p className="font-bold text-green-700 dark:text-green-400 text-xl">
                          ${totalOrden.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="col-lg-12">
              {verTabla ? (
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <TableOrdenServicio
                      ordenesServicio={ordenServicios}
                      deleteServicio={deleteServicio}
                    />
                  </div>
                  {showPayment && (
                    <div className="w-full lg:w-80">
                      <FormPagarOrden
                        onRefetch={onRefetch}
                        idOrder={idOrder}
                        totalOrden={totalOrden}
                        idBarbero={orden?.puesto}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-5">
                  <ListServicios
                    onRefetch={onRefetch}
                    onClose={() => setVerTabla(true)}
                    idOrder={idOrder}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailOrdenes;
