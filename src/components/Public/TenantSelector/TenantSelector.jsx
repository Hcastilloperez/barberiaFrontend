import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchService } from "@/Config/Axios.jsx";
import { setLoginAction } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Plus, Check, Loader2, User, Shield } from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TenantSelector = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    nombre: "",
    slug: "",
    correo: "",
    telefono: "",
    direccion: "",
  });
  const [adminData, setAdminData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    clave: "",
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [createdAdmin, setCreatedAdmin] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const response = await fetchService("tenants", "get");
      setTenants(response.data);
    } catch (err) {
      console.error("Error loading tenants", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTenantSelect = (tenant) => {
    setSelectedTenant(tenant);
    setStep(2);
    setError("");
    setAdminData({ nombres: "", apellidos: "", correo: "", clave: "" });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!adminData.nombres || !adminData.apellidos || !adminData.correo || !adminData.clave) {
      setError("Complete todos los campos del administrador");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...registerData,
        adminNombres: adminData.nombres,
        adminApellidos: adminData.apellidos,
        adminCorreo: adminData.correo,
        adminClave: adminData.clave,
      };
      const { data } = await fetchService("tenants", "post", payload);
      setCreatedAdmin(data.adminUser);
      setSelectedTenant(data.tenant);
      setShowRegister(false);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar tenant");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const { data } = await fetchService(
        `tenants/register-admin/${selectedTenant.id}`,
        "post",
        adminData
      );

      localStorage.setItem("token", JSON.stringify(data.jwt));
      dispatch(setLoginAction(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear administrador");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginWithTenant = async (correo, clave) => {
    setSubmitting(true);
    setError("");

    try {
      const { data } = await fetchService("tenants/login", "post", {
        correo,
        clave,
        tenantId: selectedTenant.id,
      });

      localStorage.setItem("token", JSON.stringify(data.jwt));
      dispatch(setLoginAction(data));

      if (data.userData.role === "Barbero") {
        navigate(`/infoOrdenes/${data.userData.id}`);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales inválidas");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToList = () => {
    setShowRegister(false);
    setStep(1);
    setRegisterData({ nombre: "", slug: "", correo: "", telefono: "", direccion: "" });
    setAdminData({ nombres: "", apellidos: "", correo: "", clave: "" });
    setCreatedAdmin(null);
    setError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8 pt-8">
          <LogoScissors className="h-10 w-10" />
          <span className="text-yellow-600 font-bold text-3xl tracking-tight">
            BarberControl
          </span>
        </div>

        {step === 1 && !showRegister && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Selecciona tu barbería
              </h1>
              <p className="text-zinc-400 text-lg">
                Elige la barbería a la que deseas acceder o registra una nueva
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {tenants.map((tenant) => (
                <Card
                  key={tenant.id}
                  className="bg-zinc-800/50 border-zinc-700 hover:border-yellow-500/50 cursor-pointer transition-all hover:bg-zinc-800"
                  onClick={() => handleTenantSelect(tenant)}
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-yellow-500" />
                      {tenant.nombre}
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      {tenant.direccion || "Sin dirección"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-500">{tenant.correo}</p>
                  </CardContent>
                </Card>
              ))}

              <Card
                className="bg-zinc-800/50 border-zinc-700 border-dashed hover:border-yellow-500/50 cursor-pointer transition-all hover:bg-zinc-800 flex items-center justify-center min-h-[140px]"
                onClick={() => setShowRegister(true)}
              >
                <CardContent className="text-center">
                  <Plus className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
                  <p className="text-zinc-400">Registrar barbería</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {showRegister && step === 1 && (
          <Card className="bg-zinc-800/50 border-zinc-700 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-yellow-500" />
                Registrar nueva barbería
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Completa los datos de tu barbería y crea el usuario administrador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <div className="border-b border-zinc-700 pb-4">
                  <h3 className="text-sm font-medium text-yellow-500 mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Datos de la Barbería
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Nombre</label>
                      <Input
                        value={registerData.nombre}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, nombre: e.target.value })
                        }
                        required
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Slug (URL)</label>
                      <Input
                        value={registerData.slug}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                          })
                        }
                        required
                        placeholder="mi-barberia"
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm text-zinc-400 mb-1 block">Correo</label>
                    <Input
                      type="email"
                      value={registerData.correo}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, correo: e.target.value })
                      }
                      required
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Teléfono</label>
                      <Input
                        value={registerData.telefono}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, telefono: e.target.value })
                        }
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Dirección</label>
                      <Input
                        value={registerData.direccion}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, direccion: e.target.value })
                        }
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-yellow-500 mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Datos del Administrador
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Nombres</label>
                      <Input
                        value={adminData.nombres}
                        onChange={(e) =>
                          setAdminData({ ...adminData, nombres: e.target.value })
                        }
                        required
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-400 mb-1 block">Apellidos</label>
                      <Input
                        value={adminData.apellidos}
                        onChange={(e) =>
                          setAdminData({ ...adminData, apellidos: e.target.value })
                        }
                        required
                        className="bg-zinc-700/50 border-zinc-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm text-zinc-400 mb-1 block">Correo</label>
                    <Input
                      type="email"
                      value={adminData.correo}
                      onChange={(e) =>
                        setAdminData({ ...adminData, correo: e.target.value })
                      }
                      required
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="text-sm text-zinc-400 mb-1 block">Contraseña</label>
                    <Input
                      type="password"
                      value={adminData.clave}
                      onChange={(e) =>
                        setAdminData({ ...adminData, clave: e.target.value })
                      }
                      required
                      minLength={6}
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackToList}
                    className="flex-1 border-zinc-600 text-zinc-400"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    {submitting ? "Registrando..." : "Crear Barbería"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 3 && selectedTenant && createdAdmin && (
          <Card className="bg-zinc-800/50 border-zinc-700 max-w-xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-white">¡Barbería creada exitosamente!</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Se ha creado la barbería y el usuario administrador
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-zinc-700/30 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-medium text-yellow-500 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Barbería: {selectedTenant.nombre}
                </h4>
                <p className="text-xs text-zinc-400">Slug: {selectedTenant.slug}</p>
              </div>

              <div className="bg-zinc-700/30 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-medium text-yellow-500 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Usuario Administrador Creado
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-zinc-400 text-xs">Nombres</p>
                    <p className="text-white">{createdAdmin.nombres}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs">Apellidos</p>
                    <p className="text-white">{createdAdmin.apellidos}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-zinc-400 text-xs">Correo</p>
                    <p className="text-white">{createdAdmin.correo}</p>
                  </div>
                </div>
                <p className="text-xs text-yellow-500 mt-2">
                  Contraseña: La que proporcionaste al registrar
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleBackToList}
                  className="flex-1 border-zinc-600 text-zinc-400"
                >
                  Volver al inicio
                </Button>
                <Button
                  onClick={() => {
                    setStep(2);
                    setAdminData({
                      nombres: createdAdmin.nombres,
                      apellidos: createdAdmin.apellidos,
                      correo: createdAdmin.correo,
                      clave: "",
                    });
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Iniciar sesión
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && selectedTenant && (
          <Card className="bg-zinc-800/50 border-zinc-700 max-w-xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-yellow-500" />
                <div>
                  <CardTitle className="text-white">{selectedTenant.nombre}</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Ingresa tus credenciales
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleLoginWithTenant(adminData.correo, adminData.clave);
              }} className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Correo</label>
                  <Input
                    type="email"
                    value={adminData.correo}
                    onChange={(e) =>
                      setAdminData({ ...adminData, correo: e.target.value })
                    }
                    required
                    className="bg-zinc-700/50 border-zinc-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Contraseña</label>
                  <Input
                    type="password"
                    value={adminData.clave}
                    onChange={(e) =>
                      setAdminData({ ...adminData, clave: e.target.value })
                    }
                    required
                    className="bg-zinc-700/50 border-zinc-600 text-white"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 border-zinc-600 text-zinc-400"
                  >
                    Cambiar barbería
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    {submitting ? "Iniciando..." : "Iniciar sesión"}
                  </Button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-zinc-700">
                <p className="text-center text-zinc-500 text-sm mb-4">
                  ¿Primera vez en {selectedTenant.nombre}?
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setStep(2.5)}
                  className="w-full text-yellow-500 hover:text-yellow-400"
                >
                  Crear cuenta de administrador
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2.5 && selectedTenant && (
          <Card className="bg-zinc-800/50 border-zinc-700 max-w-xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-yellow-500" />
                <div>
                  <CardTitle className="text-white">Crear administrador</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Configura tu cuenta para {selectedTenant.nombre}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-zinc-400 mb-1 block">Nombres</label>
                    <Input
                      value={adminData.nombres}
                      onChange={(e) =>
                        setAdminData({ ...adminData, nombres: e.target.value })
                      }
                      required
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-400 mb-1 block">Apellidos</label>
                    <Input
                      value={adminData.apellidos}
                      onChange={(e) =>
                        setAdminData({ ...adminData, apellidos: e.target.value })
                      }
                      required
                      className="bg-zinc-700/50 border-zinc-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Correo</label>
                  <Input
                    type="email"
                    value={adminData.correo}
                    onChange={(e) =>
                      setAdminData({ ...adminData, correo: e.target.value })
                    }
                    required
                    className="bg-zinc-700/50 border-zinc-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Contraseña</label>
                  <Input
                    type="password"
                    value={adminData.clave}
                    onChange={(e) =>
                      setAdminData({ ...adminData, clave: e.target.value })
                    }
                    required
                    minLength={6}
                    className="bg-zinc-700/50 border-zinc-600 text-white"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 border-zinc-600 text-zinc-400"
                  >
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    {submitting ? "Creando..." : "Crear cuenta"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TenantSelector;