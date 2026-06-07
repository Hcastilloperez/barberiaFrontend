import React, { useEffect, useState } from "react";

import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormClientes from "@/components/Admin/clientes/formClientes/FormClientes";
import Cabecera from "@/components/Layout/Private/Cabezera";

const FormClientePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const verCliente = () => {
    navigate("/Clientes");
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent="Agregar Clientes"
            nomBoton1="Listado Clientes"
            linkBoton1={verCliente}
          />

          <div className="col-lg-12 py-5">
            {/**
             *  tabla para mostrar los puestos
             *
             */}
            <FormClientes />;
          </div>

          {/**
           *  modal para ADD && EDIR
           *
           */}
        </div>
      </div>
    </>
  );
};

export default FormClientePage;
