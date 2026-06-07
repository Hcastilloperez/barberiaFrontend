import React, { useEffect, useState } from "react";

import Cabecera from "@/components/Layout/Private/Cabezera";
import TableConfig from "@/components/Admin/Config/tableConfig/TableConfig";
import ListConfig from "@/components/Admin/Config/listConfig/ListConfig";
import FormConfig from "@/components/Admin/Config/formConfig/FormConfig";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { GetAllComodines, UpdateComodin } from "@/Hooks/useComodines";
import Paginacion from "@/components/paginacion/Paginacion";

import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfigPage = () => {
  const [configs, setConfigs] = useState([]);
  const [config, setConfig] = useState(null);

  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verTabla, setVerTabla] = useState(true);

  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    isAuth ? getInitialData() : navigate("/login");
  }, [refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const result = await GetAllComodines();
      console.log("Configuraciones cargadas:", result);
      setConfigs(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const toggleConfig = async (config) => {
    try {
      const newEstado = config.estado === "Activa" ? "In Activa" : "Activa";
      await UpdateComodin(config.id, { ...config, estado: newEstado });
      getInitialData();
    } catch (error) {
      console.log(error);
    }
  };

  const editConfig = (data) => {
    setConfig(data);
    setVerTabla(false);
  };

  const addConfig = () => {
    setConfig(null);
    verTabla ? setVerTabla(false) : setVerTabla(true);
  };

  const cancelForm = () => {
    setConfig(null);
    setVerTabla(true);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent={
              verTabla ? "Configuración del Sistema" : config?.id ? "Editar Configuración" : "Agregar Configuración"
            }
            nomBoton1={verTabla ? "Agregar Configuración" : "Listado Configuración"}
            linkBoton1={addConfig}
          />
          {loading ? (
            <Loader active inline="centered">
              Cargando...
            </Loader>
          ) : (
            <div className="col-lg-12 py-10">
              {verTabla ? (
                <>
                  <Tabs defaultValue="table" className="mb-4">
                    <TabsList>
                      <TabsTrigger value="table">Tabla</TabsTrigger>
                      <TabsTrigger value="cards">Tarjetas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="table">
                      <TableConfig
                        configs={configs}
                        onEdit={editConfig}
                        onToggle={toggleConfig}
                      />
                    </TabsContent>
                    <TabsContent value="cards">
                      <ListConfig
                        configs={configs}
                        onEdit={editConfig}
                      />
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <div className="py-5">
                  <FormConfig
                    config={config}
                    onRefetch={onRefetch}
                    onCancel={cancelForm}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfigPage;