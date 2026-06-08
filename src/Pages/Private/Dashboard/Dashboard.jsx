import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
  Calendar,
  Loader2,
  Wallet,
  Building2,
} from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TableCumpleClientes from "@/components/Admin/clientes/tableCumpleCliente/TableCumpleCiente";

import Reloj from "../../../components/Private/Reloj/Reloj.jsx";

import { GetOrdenesbyEstado, GetOrdenesbyVentaMes } from "@/Hooks/useOrdenes";
import { GetOrdenServiciobyOrden } from "@/Hooks/useOrdenServicio";
import { GetPagosbyFecha } from "@/Hooks/usePagos";

const Dashboard = () => {
  const [refetch, setRefetch] = useState(false);
  const onRefetch = () => setRefetch((prev) => !prev);

  const { isAuth } = useSelector((state) => state.auth);
  const [ordenesperiodo, setOrdenesPeriodo] = useState([]);
  const [ordenesMes, setOrdenesMes] = useState([]);
  const [pagos, setPagos] = useState([]);

  const [numServiciosPeriodo, setNumeroServiciosPeriodo] = useState(0);
  const [numServiciosMes, setNumeroServiciosMes] = useState(0);

  const [valorPeriodo, setValorPeriodo] = useState(0);
  const [valorMes, setValorMes] = useState(0);

  const [valorEfectivo, setValorEfectivo] = useState(0);
  const [valorBanco, setValorBanco] = useState(0);
  const [valorPagoMes, setValorPagoMes] = useState(0);
  const [valorPagoEfectivo, setValorPagoEfectivo] = useState(0);
  const [valorPagoBanco, setValorPagoBanco] = useState(0);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    isAuth ? getInitialData() : navigate("/login");
  }, [refetch]);

  const getInitialData = () => {
    getValorVentaPeriodo();
    getValorVentaMes();
    getValorPagosMes();
  };

  const getValorVentaMes = async () => {
    try {
      setLoading(true);
      const result = await GetOrdenesbyVentaMes();
      setOrdenesMes(result);

      const servicios = await Promise.all(
        result.map(async (data) => {
          return await GetOrdenServiciobyOrden(data.id);
        }),
      );

      let valorT = 0;
      let num = 0;

      for (let i = 0; i < servicios.length; i++) {
        valorT = valorT + parseFloat(result[i].valorOrden);
        num = num + 1;
      }

      calcularVentaDiscriminada(result);
      setValorMes(valorT);
      setNumeroServiciosMes(num);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getValorVentaPeriodo = async () => {
    try {
      setLoading(true);
      const result = await GetOrdenesbyEstado();
      setOrdenesPeriodo(result);

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

  const calcularVentaDiscriminada = (ordenes) => {
    let valorE = 0;
    let valorB = 0;

    ordenes.map((data) => {
      if (data.medioPago === "Efectivo") {
        valorE = valorE + parseFloat(data.valorOrden);
      } else {
        valorB = valorB + parseFloat(data.valorOrden);
      }
    });

    setValorBanco(valorB);
    setValorEfectivo(valorE);
  };

  const getValorPagosMes = async () => {
    try {
      let valorE = 0;
      let valorB = 0;

      const result = await GetPagosbyFecha();
      setPagos(result);

      result.map((data) => {
        if (data.medioPago === "Efectivo") {
          valorE = valorE + parseFloat(data.valor);
        } else {
          valorB = valorB + parseFloat(data.valor);
        }
      });

      setValorPagoBanco(valorB);
      setValorPagoEfectivo(valorE);
      setValorBanco(valorBanco - valorB);
      setValorEfectivo(valorEfectivo - valorE);
    } catch (error) {
      console.log("Error", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Reloj />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Ventas Totales del Mes
                </p>
                <p className="font-bold text-green-700 dark:text-green-300 text-2xl">
                  {valorMes < 0 ? "-" : ""}${Math.abs(valorMes).toFixed(2)}
                </p>
                <p className="text-xs text-green-500 dark:text-green-500">
                  {numServiciosMes} servicios
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Pendiente de Pago
                </p>
                <p className="font-bold text-blue-700 dark:text-blue-300 text-2xl">
                  {valorPeriodo < 0 ? "-" : ""}$
                  {Math.abs(valorPeriodo).toFixed(2)}
                </p>
                <p className="text-xs text-blue-500 dark:text-blue-500">
                  {numServiciosPeriodo} servicios
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/40 dark:to-yellow-900/40 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-yellow-200 dark:bg-yellow-800 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                  Valor Total En Efectivo
                </p>
                <p className="font-bold text-yellow-700 dark:text-yellow-300 text-xl">
                  {valorEfectivo + valorPagoEfectivo < 0 ? "-" : ""}$
                  {Math.abs(valorEfectivo + valorPagoEfectivo).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  Valor Total En Banco
                </p>
                <p className="font-bold text-purple-700 dark:text-purple-300 text-xl">
                  {valorBanco + valorPagoBanco < 0 ? "-" : ""}$
                  {Math.abs(valorBanco + valorPagoBanco).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              Resumen de Pagos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/40 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-foreground">Pagos en Efectivo</span>
                </div>
                <span
                  className={
                    valorPagoEfectivo < 0
                      ? "font-bold text-red-600 dark:text-red-400"
                      : "font-bold text-green-700 dark:text-green-300"
                  }
                >
                  {valorPagoEfectivo < 0 ? "-" : ""}$
                  {Math.abs(valorPagoEfectivo).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-foreground">Pagos en Banco</span>
                </div>
                <span
                  className={
                    valorPagoBanco < 0
                      ? "font-bold text-red-600 dark:text-red-400"
                      : "font-bold text-blue-700 dark:text-blue-300"
                  }
                >
                  {valorPagoBanco < 0 ? "-" : ""}$
                  {Math.abs(valorPagoBanco).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LogoScissors className="h-5 w-5" />
              Estadisticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Ordenes del Periodo
                </span>
                <span className="font-semibold text-foreground">{ordenesperiodo.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ordenes del Mes</span>
                <span className="font-semibold text-foreground">{ordenesMes.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Pagos</span>
                <span className="font-semibold text-foreground">{pagos.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <TableCumpleClientes fecha={new Date().toISOString().split("T")[0]} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;