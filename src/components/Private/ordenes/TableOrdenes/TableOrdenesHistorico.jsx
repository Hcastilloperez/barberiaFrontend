import React from "react";
import { Calendar, User, DollarSign, CreditCard, CheckCircle } from "lucide-react";
import moment from "moment";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    key: "fechaPedido",
    label: "Fecha Pedido",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="font-medium text-sm text-foreground">
          {moment(item.fechaPedido).format("DD/MM/YYYY HH:mm")}
        </span>
      </div>
    ),
  },
  {
    key: "fechaCierre",
    label: "Fecha Cierre",
    render: (item) => (
      <span className="text-sm text-muted-foreground">
        {moment(item.fechaCierre).format("DD/MM/YYYY HH:mm")}
      </span>
    ),
  },
  {
    key: "barbero",
    label: "Barbero",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
          <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        <span className="font-medium text-sm text-foreground">
          {item.Usuarios?.nombres} {item.Usuarios?.apellidos}
        </span>
      </div>
    ),
  },
  {
    key: "cliente",
    label: "Cliente",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
          <User className="h-4 w-4 text-green-600 dark:text-green-400" />
        </div>
        <span className="font-medium text-sm text-foreground">
          {item.Cliente?.nombres} {item.Cliente?.apellidos}
        </span>
      </div>
    ),
  },
  {
    key: "valorOrden",
    label: "Valor",
    render: (item) => (
      <span className="text-green-600 dark:text-green-400 font-bold">$ {item.valorOrden}</span>
    ),
  },
  {
    key: "medioPago",
    label: "Metodo",
    render: (item) => (
      <Badge variant="outline" className="text-center">
        {item.medioPago}
      </Badge>
    ),
  },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <Badge
        variant={item.estado === "Cerrada" ? "default" : "secondary"}
        className="text-center"
      >
        <CheckCircle className="h-3 w-3 mr-1" />
        {item.estado}
      </Badge>
    ),
  },
];

const TableOrdenesHistorico = ({ ordenes }) => {
  if (!ordenes || ordenes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-lg bg-muted/30 dark:bg-muted/50">
        <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No hay ordenes historicas</p>
      </div>
    );
  }

  return (
    <ModernTable
      data={ordenes}
      columns={columns}
      emptyMessage="No hay ordenes en el historico"
    />
  );
};

export default TableOrdenesHistorico;