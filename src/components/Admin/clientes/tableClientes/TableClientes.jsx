import React from "react";
import { Phone, Mail, User, FileText } from "lucide-react";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    key: "noDocumento",
    label: "Documento",
    className: "font-mono",
    render: (item) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{item.noDocumento}</span>
      </div>
    ),
  },
  {
    key: "nombres",
    label: "Cliente",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
          <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="font-medium text-foreground">
            {item.nombres} {item.apellidos}
          </p>
          <p className="text-xs text-muted-foreground">{item.tipoDocumento}</p>
        </div>
      </div>
    ),
  },
  {
    key: "telefono",
    label: "Teléfono",
    render: (item) => (
      <div className="flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{item.telefono}</span>
      </div>
    ),
  },
  {
    key: "correo",
    label: "Correo",
    render: (item) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{item.correo}</span>
      </div>
    ),
  },
  {
    key: "fechaCumple",
    label: "Cumpleaños",
    render: (item) =>
      item.fechaCumple ? (
        <Badge variant="outline" className="bg-pink-50 dark:bg-pink-950/40">
          🎂 {item.fechaCumple}
        </Badge>
      ) : (
        <span className="text-muted-foreground text-sm">No registrado</span>
      ),
  },
];

const TableClientes = ({ clientes, updatePersona }) => {
  const handleDelete = (item) => {
    console.log("Delete cliente", item);
  };

  return (
    <ModernTable
      data={clientes}
      columns={columns}
      onEdit={updatePersona}
      onDelete={handleDelete}
      onToggle={null}
      emptyMessage="No hay clientes registrados"
    />
  );
};

export default TableClientes;