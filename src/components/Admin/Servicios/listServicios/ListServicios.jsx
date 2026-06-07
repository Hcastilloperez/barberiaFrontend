import React from "react";
import { DollarSign } from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ServicioCard = ({ servicio, onEdit }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all cursor-pointer h-full"
      onClick={() => onEdit?.(servicio)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
              <LogoScissors className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm text-foreground">{servicio.nombre}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {servicio.tipo}
              </Badge>
            </div>
          </div>
          <Badge variant={servicio.estado === "Activa" ? "success" : "secondary"}>
            {servicio.estado === "Activa" ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 text-xl font-bold text-green-600 dark:text-green-400">
          <DollarSign className="h-5 w-5" />
          {servicio.valor}
        </div>
        {servicio.comentario && (
          <CardDescription className="mt-2 text-xs text-muted-foreground">
            {servicio.comentario}
          </CardDescription>
        )}
        <div className="mt-2">
          <Badge variant={servicio.PagarBarbero ? "success" : "secondary"}>
            {servicio.PagarBarbero ? "Compartido" : "No compartido"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const ListServicios = ({ servicios, onEdit }) => {
  if (!servicios || servicios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-lg bg-muted/30 dark:bg-muted/50">
        <p className="text-muted-foreground">No hay servicios registrados</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {servicios.map((servicio) => (
        <ServicioCard 
          key={servicio.id} 
          servicio={servicio}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ListServicios;