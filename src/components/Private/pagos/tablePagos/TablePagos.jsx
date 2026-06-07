import React from "react";
import { Calendar, DollarSign, Pencil, Receipt } from "lucide-react";
import moment from "moment";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const columns = [
  {
    key: "fechaPago",
    label: "Fecha",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="font-medium text-sm text-foreground">
          {moment(item.fechaPago).format("DD/MM/YYYY HH:mm")}
        </span>
      </div>
    ),
  },
  {
    key: "conceptoId",
    label: "Concepto",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center">
          <Receipt className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        </div>
        <span className="font-medium text-sm text-foreground">{item.conceptoId}</span>
      </div>
    ),
  },
  {
    key: "valor",
    label: "Valor",
    render: (item) => (
      <span className={item.valor < 0 ? "text-red-600 dark:text-red-400 font-bold" : "text-green-600 dark:text-green-400 font-bold"}>
        {item.valor < 0 ? "-" : ""}${Math.abs(item.valor).toFixed(2)}
      </span>
    ),
  },
  {
    key: "medioPago",
    label: "Medio",
    render: (item) => (
      <Badge
        variant={item.medioPago === "Efectivo" ? "default" : "outline"}
        className="text-center bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 hover:bg-green-100"
      >
        {item.medioPago}
      </Badge>
    ),
  },
];

const ActionsCell = ({ pago, updatePago }) => (
  <Button
    size="icon"
    variant="ghost"
    onClick={() => updatePago(pago)}
    className="hover:bg-yellow-100 dark:hover:bg-yellow-900/40 hover:text-yellow-600 dark:hover:text-yellow-400"
  >
    <Pencil className="h-4 w-4" />
  </Button>
);

const TablePagos = ({ pagos, updatePago }) => {
  if (!pagos || pagos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-lg bg-muted/30 dark:bg-muted/50">
        <Receipt className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No hay pagos registrados</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <ModernTable
        data={pagos}
        columns={columns}
        actionsColumn={(item) => <ActionsCell pago={item} updatePago={updatePago} />}
        emptyMessage="No hay pagos en la lista"
      />
    </div>
  );
};

export default TablePagos;