import React from "react";
import { Mail, ShieldCheck, User } from "lucide-react";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    key: "nombres",
    label: "Nombre",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <User className="h-4 w-4 text-yellow-600" />
        </div>
        <div>
          <p className="font-medium">
            {item.nombres} {item.apellidos}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "correo",
    label: "Correo",
    render: (item) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-gray-400" />
        <span className="text-sm">{item.correo}</span>
      </div>
    ),
  },
  {
    key: "role",
    label: "Rol",
    render: (item) => (
      <Badge
        variant={item.role === "SuperUser" ? "default" : "secondary"}
        className="capitalize"
      >
        <ShieldCheck className="h-3 w-3 mr-1" />
        {item.role}
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

const TableUsuarios = ({ usuarios, activarUsuario, updateBarbero }) => {
  const handleDelete = (item) => {
    console.log("Delete", item);
  };

  return (
    <ModernTable
      data={usuarios}
      columns={columns}
      onEdit={updateBarbero}
      onDelete={handleDelete}
      onToggle={activarUsuario}
      emptyMessage="No hay usuarios registrados"
    />
  );
};

export default TableUsuarios;
