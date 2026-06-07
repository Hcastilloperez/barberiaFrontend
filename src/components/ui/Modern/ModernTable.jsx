import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ModernTable = ({
  data = [],
  columns = [],
  onEdit,
  onDelete,
  onToggle,
  actionsColumn,
  emptyMessage = "No hay datos disponibles",
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-lg bg-muted/30 dark:bg-muted/50">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30 hover:bg-muted/30 dark:bg-muted/50 dark:hover:bg-muted/50">
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={`font-semibold ${col.className || ""}`}
            >
              {col.label}
            </TableHead>
          ))}
          {(onEdit || onDelete || onToggle || actionsColumn) && (
            <TableHead className="w-[100px] text-right">Acciones</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={item.id || index}
            className="hover:bg-muted/30 dark:hover:bg-muted/50 transition-colors"
          >
            {columns.map((col) => (
              <TableCell key={col.key} className={col.cellClassName || ""}>
                {col.render ? col.render(item) : item[col.key]}
              </TableCell>
            ))}
            {(onEdit || onDelete || onToggle || actionsColumn) && (
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {actionsColumn && actionsColumn(item)}
                  {onToggle && (
                    <button
                      onClick={() => onToggle(item)}
                      className={`p-2 rounded-full transition-colors ${
                        item.estado === "Activa" || item.estado === "Activo"
                          ? "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/40 dark:hover:bg-yellow-900/60"
                          : "bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60"
                      }`}
                    >
                      {item.estado === "Activa" || item.estado === "Activo" ? (
                        <span className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">ON</span>
                      ) : (
                        <span className="text-green-600 dark:text-green-400 text-xs font-medium">OFF</span>
                      )}
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 transition-colors"
                    >
                      <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">EDT</span>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 transition-colors"
                    >
                      <span className="text-red-600 dark:text-red-400 text-xs font-medium">DEL</span>
                    </button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ModernTable;