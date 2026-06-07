import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

import Cabecera from "@/components/Layout/Private/Cabezera";
import FormUsuarios from "@/components/Admin/Usuarios/formUsuarios/FormUsuario";
import FormCambioPass from "@/components/Admin/Usuarios/formCambioPass/FormCambioPass";
import { GetUsuariosbyId } from "@/Hooks/useUsuarios";

const PerfilUsuario = () => {
  const { isAuth, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [verTabla, setVerTabla] = useState(true);
  const [refetch, setRefetch] = useState(false);

  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    isAuth ? getInitialData() : navigate("/login");
  }, [refetch]);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const result = await GetUsuariosbyId(userData.id);
      setUsuario(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cambPass = () => {
    verTabla ? setVerTabla(false) : setVerTabla(true);
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-4">
          <Cabecera
            currentComponent={
              verTabla ? (
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5 text-yellow-600" />
                  Mi Perfil
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-yellow-600" />
                  Cambiar Contraseña
                </span>
              )
            }
            nomBoton1={verTabla ? "Cambiar Contraseña" : "Ver Perfil"}
            linkBoton1={cambPass}
          />

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
            </div>
          ) : (
            <div className="col-lg-12 py-10">
              {verTabla ? (
                <FormUsuarios
                  usuario={usuario}
                  onRefetch={onRefetch}
                  onCancel={() => navigate("/")}
                />
              ) : (
                <div className="max-w-md mx-auto">
                  <FormCambioPass idUsuario={userData.id} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PerfilUsuario;