import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Play, Pause, Pencil } from "lucide-react";

function Actions(props) {
  const { usuario, activarUsuario, updateBarbero } = props;
  return (
    <TableCell textaling="rigth">
      <Button size="icon" onClick={() => activarUsuario(usuario)}>
        {usuario.estado === "Activa" ? <Pause /> : <Play />}
      </Button>

      <Button size="icon" onClick={() => updateBarbero(usuario)}>
        <Pencil />
      </Button>
    </TableCell>
  );
}

const TableUsuarios = (props) => {
  const { usuarios, activarUsuario, updateBarbero } = props;
  return (
    <>
      <Table className="table">
        <TableCaption>Listado de Usuario</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Nombres</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>role</TableHead>
            <TableHead>estado</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {usuarios.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>
                {data.nombres} {data.apellidos}
              </TableCell>
              <TableCell>{data.correo}</TableCell>
              <TableCell>{data.role}</TableCell>
              <TableCell>{data.estado}</TableCell>
              <TableCell>
                <Actions
                  usuario={data}
                  activarUsuario={activarUsuario}
                  updateBarbero={updateBarbero}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableUsuarios;
