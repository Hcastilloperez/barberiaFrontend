import { useEffect, useState } from "react";
import {
  CreateOrdenServicio,
  buscarServicioOrden,
  UpdateOrdenServicio,
} from "@/Hooks/useOrdenServicio";
import { GetServiciosEstado } from "@/Hooks/useServicio";
import { toast } from "sonner";
import { DollarSign, Plus, Loader2 } from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ServicioCard = ({ servicio, onAdd }) => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      await onAdd(servicio.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md">
      <div className="relative h-40 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {servicio.foto ? (
          <img
            src={servicio.foto}
            alt={servicio.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40">
            <LogoScissors className="h-16 w-16 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white/90 dark:bg-muted dark:text-foreground">
            {servicio.tipo}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-yellow-600 transition-colors">
            {servicio.nombre}
          </h3>
          {servicio.comentario && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {servicio.comentario}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-xl font-bold text-green-600 dark:text-green-400">
            <DollarSign className="h-5 w-5" />
            <span>{servicio.valor}</span>
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ListServicios = ({ onRefetch, onClose, idOrder }) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetServiciosAll();
  }, []);

  const GetServiciosAll = async () => {
    try {
      setLoading(true);
      const result = await GetServiciosEstado();
      setServicios(result);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar servicios");
    } finally {
      setLoading(false);
    }
  };

  const addServicioToOrder = async (idServicio) => {
    try {
      const result = await buscarServicioOrden(idOrder, idServicio);

      if (result.length > 0) {
        const servicio = result[0];
        const data = {
          idOrden: idOrder,
          idServicio: idServicio,
          cantidad: parseFloat(servicio.cantidad) + 1,
        };
        await UpdateOrdenServicio(servicio.id, data);
        toast.success("Servicio actualizado (+1)");
      } else {
        const data = {
          idOrden: idOrder,
          idServicio: idServicio,
          cantidad: 1,
        };
        await CreateOrdenServicio(data);
        toast.success("Servicio agregado");
      }
      onRefetch?.();
      onClose?.();
    } catch (error) {
      console.log(error);
      toast.error("Error al agregar servicio");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
      </div>
    );
  }

  if (servicios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-xl bg-muted/30 dark:bg-muted/50">
        <LogoScissors className="h-12 w-12 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No hay servicios disponibles</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LogoScissors className="h-5 w-5" />
          <span className="font-medium text-foreground">
            Seleccionar Servicio
          </span>
        </div>
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-300">
          {servicios.length} servicio{servicios.length !== 1 ? "s" : ""}
        </Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {servicios.map((servicio) => (
          <ServicioCard
            key={servicio.id}
            servicio={servicio}
            onAdd={addServicioToOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default ListServicios;