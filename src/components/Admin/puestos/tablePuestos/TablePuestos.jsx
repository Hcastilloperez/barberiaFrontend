import React from "react";
import { Armchair, User } from "lucide-react";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    key: "tipo",
    label: "Tipo",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
          <Armchair className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        <Badge variant="outline">{item.tipo}</Badge>
      </div>
    ),
  },
  {
    key: "usuario",
    label: "Barbero/Usuario",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
          <User className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <p className="font-medium text-foreground">
            {item.usuario?.nombres} {item.usuario?.apellidos}
          </p>
          <p className="text-xs text-muted-foreground">{item.usuario?.correo}</p>
        </div>
      </div>
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

const TablePuestos = ({ puestos, activarPuestos }) => {
  const handleDelete = (item) => {
    console.log("Delete puesto", item);
  };

  return (
    <ModernTable
      data={puestos}
      columns={columns}
      onEdit={null}
      onDelete={handleDelete}
      onToggle={activarPuestos}
      emptyMessage="No hay puestos registrados"
    />
  );
};

export default TablePuestos;