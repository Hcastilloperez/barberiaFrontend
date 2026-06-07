import React, { useState, useEffect } from "react";

import ListPuestos from "@/components/Admin/puestos/listPuestos/ListPuestos";

import { GetPuestosbyEstado } from "@/Hooks/usePuesto";
import { GetOrdenesbyEstadobyPuesto } from "@/Hooks/useOrdenes";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BarberosPage = () => {
  const [puestos, setPuestos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    isAuth ? getInitialData() : navigate("/login");
  }, [refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const result = await GetPuestosbyEstado("Activa");
      console.log("barbero", result);
      setPuestos(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <ListPuestos puestos={puestos} />
    </div>
  );
};

export default BarberosPage;
