import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Armchair, User, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GetOrdenesbyEstadobyPuesto } from "@/Hooks/useOrdenes.js";

const PuestoCard = ({ puesto }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServicios();
  }, []);

  const getServicios = async () => {
    try {
      const response = await GetOrdenesbyEstadobyPuesto(puesto.idusuario);
      setOrders(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasActiveOrders = orders.length > 0;

  return (
    <Link to={`/infoOrdenes/${puesto.idusuario}`}>
      <Card className="hover:shadow-lg transition-all hover:border-yellow-400 cursor-pointer h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                hasActiveOrders ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <Armchair
                className={`h-5 w-5 ${
                  hasActiveOrders ? "text-red-600" : "text-green-600"
                }`}
              />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">{puesto.tipo}</CardTitle>
              <CardDescription>
                {hasActiveOrders ? `${orders.length} orden(es) activa(s)` : "Libre"}
              </CardDescription>
            </div>
          </div>
          <Badge variant={hasActiveOrders ? "destructive" : "success"}>
            {hasActiveOrders ? "Ocupado" : "Libre"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <User className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium">
                {puesto.usuario?.nombres} {puesto.usuario?.apellidos}
              </p>
              <p className="text-xs text-gray-500">{puesto.usuario?.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PuestoCard;