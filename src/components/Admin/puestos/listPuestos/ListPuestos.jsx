import React from "react";
import PuestoCard from "./Puestos";

const ListPuestos = ({ puestos }) => {
  if (!puestos || puestos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 border rounded-lg bg-muted/30 dark:bg-muted/50">
        <p className="text-muted-foreground">No hay puestos registrados</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {puestos.map((puesto) => (
        <PuestoCard key={puesto.idusuario} puesto={puesto} />
      ))}
    </div>
  );
};

export default ListPuestos;