import React from "react";
import { DollarSign, MessageSquare } from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    key: "tipo",
    label: "Categoría",
    render: (item) => (
      <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/40">
        {item.tipo}
      </Badge>
    ),
  },
  {
    key: "nombre",
    label: "Servicio",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
          <LogoScissors className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium text-foreground">{item.nombre}</p>
          {item.comentario && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {item.comentario}
            </p>
          )}
        </div>
      </div>
    ),
  },
  {
    key: "valor",
    label: "Precio",
    render: (item) => (
      <div className="flex items-center gap-1 font-semibold text-green-600 dark:text-green-400">
        <DollarSign className="h-4 w-4" />
        {item.valor}
      </div>
    ),
  },
  {
    key: "PagarBarbero",
    label: "Compartido",
    render: (item) => (
      <Badge variant={item.PagarBarbero ? "success" : "secondary"}>
        {item.PagarBarbero ? "Sí" : "No"}
      </Badge>
    ),
  },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <Badge variant={item.estado === "Activa" ? "success" : "secondary"}>
        {item.estado === "Activa" ? "Activo" : "Inactivo"}
      </Badge>
    ),
  },
];

const TableServicios = ({ servicios, activarServicio, updateServicio }) => {
  const handleDelete = (item) => {
    console.log("Delete servicio", item);
  };

  return (
    <ModernTable
      data={servicios}
      columns={columns}
      onEdit={updateServicio}
      onDelete={handleDelete}
      onToggle={activarServicio}
      emptyMessage="No hay servicios registrados"
    />
  );
};

export default TableServicios;