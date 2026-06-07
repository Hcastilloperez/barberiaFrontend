import React from "react";
import { ShoppingCart, Calendar, User, DollarSign } from "lucide-react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Link } from "react-router-dom";

const columns = [
  {
    key: "fechaCierre",
    label: "Fecha",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="font-medium text-foreground">
          {moment(item.fechaCierre).format("DD/MM/YYYY HH:mm")}
        </span>
      </div>
    ),
  },
  {
    key: "Cliente",
    label: "Cliente",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
          <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        <span className="font-medium text-foreground">
          {item.Cliente?.nombres} {item.Cliente?.apellidos}
        </span>
      </div>
    ),
  },
  {
    key: "valorOrden",
    label: "Valor",
    render: (item) => (
      <span
        className={
          item.valorOrden < 0
            ? "text-red-600 dark:text-red-400 font-bold"
            : "text-green-600 dark:text-green-400 font-bold"
        }
      >
        {item.valorOrden < 0 ? "-" : ""}${Math.abs(item.valorOrden).toFixed(2)}
      </span>
    ),
  },
  {
    key: "medioPago",
    label: "Metodo Pago",
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
        variant={item.estado === "Abierta" ? "destructive" : "default"}
        className="text-center"
      >
        {item.estado}
      </Badge>
    ),
  },
];

const Actions = ({ orden }) => {
  if (orden.estado === "Cerrada") {
    return (
      <TableCell textaling="right">
        <ShoppingCart className="text-muted-foreground" />
      </TableCell>
    );
  }

  return (
    <TableCell textaling="right">
      <Link to={`/detailOrdenes/${orden.id}`}>
        <ShoppingCart className="text-red-500 dark:text-red-400" />
      </Link>
    </TableCell>
  );
};

const Tableordenes = ({ ordenes }) => {
  if (!ordenes || ordenes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-lg bg-muted/30 dark:bg-muted/50">
        <ShoppingCart className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No hay ordenes</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 dark:bg-muted/50 dark:hover:bg-muted/50">
            {columns.map((col) => (
              <TableHead key={col.key} className="font-semibold">
                {col.label}
              </TableHead>
            ))}
            <TableHead className="w-[80px] text-right">Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordenes.map((data) => (
            <TableRow
              key={data.id}
              className="hover:bg-muted/30 dark:hover:bg-muted/50 transition-colors"
            >
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(data) : data[col.key]}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <Actions orden={data} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tableordenes;