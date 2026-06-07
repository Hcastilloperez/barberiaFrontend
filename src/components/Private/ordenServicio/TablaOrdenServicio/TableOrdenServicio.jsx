import React from "react";
import { X, DollarSign, User } from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import { Button } from "@/components/ui/button";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    key: "Servicio.nombre",
    label: "Servicio",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
          <LogoScissors className="h-4 w-4" />
        </div>
        <span className="font-medium text-foreground">{item.Servicio.nombre}</span>
      </div>
    ),
  },
  {
    key: "Servicio.valor",
    label: "Valor Unit.",
    render: (item) => (
      <span className="text-green-600 dark:text-green-400 font-medium">${item.Servicio.valor}</span>
    ),
  },
  {
    key: "cantidad",
    label: "Cantidad",
    render: (item) => (
      <Badge variant="outline" className="text-center">
        {item.cantidad}
      </Badge>
    ),
  },
  {
    key: "total",
    label: "Total",
    render: (item) => (
      <span className="font-bold text-green-700 dark:text-green-300">
        ${(parseFloat(item.Servicio.valor) * parseFloat(item.cantidad)).toFixed(2)}
      </span>
    ),
  },
];

const TableOrdenServicio = ({ ordenesServicio, deleteServicio }) => {
  if (!ordenesServicio || ordenesServicio.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-lg bg-muted/30 dark:bg-muted/50">
        <LogoScissors className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No hay servicios agregados</p>
      </div>
    );
  }

  return (
    <ModernTable
      data={ordenesServicio}
      columns={columns}
      onDelete={deleteServicio}
      emptyMessage="No hay servicios en esta orden"
    />
  );
};

export default TableOrdenServicio;