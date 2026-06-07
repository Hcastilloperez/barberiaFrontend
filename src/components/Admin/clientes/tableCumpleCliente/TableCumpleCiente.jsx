import React, { useState, useEffect } from "react";
import { getClienteCumpleByfecha } from "@/Hooks/useClientes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Phone, Mail, User, Cake } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    key: "noDocumento",
    label: "Documento",
    className: "font-mono",
    render: (item) => (
      <span className="text-sm text-foreground">{item.noDocumento}</span>
    ),
  },
  {
    key: "nombres",
    label: "Cliente",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center">
          <User className="h-4 w-4 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <p className="font-medium text-foreground">{item.nombres} {item.apellidos}</p>
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
];

const TableCumpleClientes = ({ fecha }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [dataQt] = useState(5);
  const [currentPage, setCurrentePage] = useState(1);
  const [clientesPag, setClientesPag] = useState([]);
  const [nPage, setNPage] = useState();

  const indexFin = currentPage * dataQt;
  const indexIni = indexFin - dataQt;

  useEffect(() => {
    if (isAuth) {
      GetClientesCumple();
    } else {
      navigate("/login");
    }
  }, [indexIni]);

  const GetClientesCumple = async () => {
    try {
      setLoading(true);
      const result = await getClienteCumpleByfecha(fecha);
      setClientes(result);
      setClientesPag(result.slice(indexIni, indexFin));
      setNPage(Math.ceil(result.length / dataQt));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Cake className="h-5 w-5 text-pink-500" />
        <h3 className="text-lg font-semibold">Clientes que cumplen años hoy</h3>
        {clientes.length > 0 && (
          <Badge variant="success" className="ml-auto">
            {clientes.length} cliente{clientes.length > 1 ? "s" : ""}
          </Badge>
        )}
      </div>
      <ModernTable
        data={clientesPag}
        columns={columns}
        loading={loading}
        emptyMessage="No hay clientes cumpliendo años hoy"
      />
    </div>
  );
};

export default TableCumpleClientes;