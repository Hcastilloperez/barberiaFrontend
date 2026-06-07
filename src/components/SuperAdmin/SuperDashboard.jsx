import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchService, FRONTEND_URL } from "@/Config/Axios.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Plus,
  Search,
  ChevronRight,
  CheckCircle,
  XCircle,
  Crown,
  Edit,
  Copy,
  Check,
} from "lucide-react";

const SuperDashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createError, setCreateError] = useState("");
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [allCopied, setAllCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [newTenant, setNewTenant] = useState({
    nombre: "",
    slug: "",
    correo: "",
    telefono: "",
    direccion: "",
    adminNombres: "",
    adminApellidos: "",
    adminCorreo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const { data } = await fetchService("tenants", "get");
      setTenants(data);
    } catch (error) {
      console.error("Error loading tenants", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTenant = async (e) => {
    e.preventDefault();
    setCreateError("");
    try {
      const defaultPassword = "Barbero123!";
      const payload = {
        nombre: newTenant.nombre,
        slug: newTenant.slug,
        correo: newTenant.correo,
        telefono: newTenant.telefono,
        direccion: newTenant.direccion,
        adminNombres: newTenant.adminNombres,
        adminApellidos: newTenant.adminApellidos,
        adminCorreo: newTenant.adminCorreo,
        adminClave: defaultPassword,
      };
      const { data } = await fetchService("tenants", "post", payload);
      setShowCreateModal(false);
      setNewTenant({
        nombre: "", slug: "", correo: "", telefono: "", direccion: "",
        adminNombres: "", adminApellidos: "", adminCorreo: "",
      });
      if (data.adminUser) {
        setCreatedCredentials({
          slug: data.tenant.slug,
          correo: data.adminUser.correo,
          clave: defaultPassword,
          serviciosCount: data.servicios?.length || 0,
          clienteGenerico: true,
        });
        setShowCredentialsModal(true);
      }
      loadTenants();
    } catch (error) {
      console.error("Error creating tenant", error);
      const mensaje = error.response?.data?.message || "Error al crear tenant";
      const campo = error.response?.data?.campo;
      let errorMsg = mensaje;
      if (campo === "correo") {
        errorMsg = "El correo ya está registrado";
      } else if (campo === "slug") {
        errorMsg = "El slug ya está en uso";
      }
      setCreateError(errorMsg);
    }
  };

  const handleToggleEstado = async (tenant) => {
    const nuevoEstado = tenant.estado === "activo" ? "inactivo" : "activo";
    try {
      await fetchService(`tenants/${tenant.id}`, "put", { estado: nuevoEstado });
      loadTenants();
    } catch (error) {
      console.error("Error toggling estado", error);
    }
  };

  const filteredTenants = tenants.filter(
    (t) =>
      t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Tenants</h1>
          <p className="text-zinc-500">Gestiona todas las barberías registradas</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Tenant
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
        <Input
          placeholder="Buscar por nombre, slug o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tenant.nombre}</CardTitle>
                    <p className="text-sm text-zinc-500">/{tenant.slug}</p>
                  </div>
                </div>
                <Badge
                  variant={tenant.estado === "activo" ? "default" : "secondary"}
                  className={tenant.estado === "activo" ? "bg-emerald-500" : ""}
                >
                  {tenant.estado === "activo" ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" /> Activo
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1 h-3 w-3" /> Inactivo
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Correo:</span>
                  <span className="font-medium">{tenant.correo}</span>
                </div>
                {tenant.telefono && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Teléfono:</span>
                    <span className="font-medium">{tenant.telefono}</span>
                  </div>
                )}
                {tenant.direccion && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Dirección:</span>
                    <span className="font-medium text-right text-xs">{tenant.direccion}</span>
                  </div>
                )}
                {tenant._count && (
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-zinc-500">Usuarios:</span>
                    <span className="font-medium flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      {tenant._count.Usuarios || 0}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleToggleEstado(tenant)}
                >
                  {tenant.estado === "activo" ? (
                    <>
                      <XCircle className="mr-1 h-3 w-3" /> Desactivar
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" /> Activar
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/super-dashboard/tenant/${tenant.id}`)}
                >
                  <ChevronRight className="mr-1 h-3 w-3" />
                  Ver más
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-500">No se encontraron tenants</p>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle>Crear nuevo Tenant</CardTitle>
              <CardDescription>
                Registra una nueva barbería en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTenant} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre</label>
                  <Input
                    value={newTenant.nombre}
                    onChange={(e) =>
                      setNewTenant({
                        ...newTenant,
                        nombre: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/\ s+/g, "-"),
                      })
                    }
                    required
                    placeholder="Mi Barbería"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Slug (URL)</label>
                  <Input
                    value={newTenant.slug}
                    onChange={(e) =>
                      setNewTenant({ ...newTenant, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                    }
                    required
                    placeholder="mi-barberia"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Correo del administrador</label>
                  <Input
                    type="email"
                    value={newTenant.correo}
                    onChange={(e) =>
                      setNewTenant({ ...newTenant, correo: e.target.value })
                    }
                    required
                    placeholder="admin@ejemplo.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Teléfono</label>
                    <Input
                      value={newTenant.telefono}
                      onChange={(e) =>
                        setNewTenant({ ...newTenant, telefono: e.target.value })
                      }
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Dirección</label>
                    <Input
                      value={newTenant.direccion}
                      onChange={(e) =>
                        setNewTenant({ ...newTenant, direccion: e.target.value })
                      }
                      placeholder="Calle 123 #45-67"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium text-yellow-600 mb-3">Datos del Administrador</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nombres</label>
                      <Input
                        value={newTenant.adminNombres}
                        onChange={(e) =>
                          setNewTenant({ ...newTenant, adminNombres: e.target.value })
                        }
                        required
                        placeholder="Juan"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Apellidos</label>
                      <Input
                        value={newTenant.adminApellidos}
                        onChange={(e) =>
                          setNewTenant({ ...newTenant, adminApellidos: e.target.value })
                        }
                        required
                        placeholder="Pérez"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-medium">Correo</label>
                    <Input
                      type="email"
                      value={newTenant.adminCorreo}
                      onChange={(e) =>
                        setNewTenant({ ...newTenant, adminCorreo: e.target.value })
                      }
                      required
                      placeholder="admin@ejemplo.com"
                    />
                  </div>
                </div>

                {createError && (
                  <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded">
                    {createError}
                  </p>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                    Crear Tenant
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {showCredentialsModal && createdCredentials && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-emerald-600 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Tenant creado exitosamente
              </CardTitle>
              <CardDescription>
                Guarda estas credenciales - no se mostrarán nuevamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">Barbería creada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">Usuario Administrador Creado</span>
                </div>
                {createdCredentials.clienteGenerico && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Usuario Genérico Creado</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">
                    Servicios Genéricos Creados ({createdCredentials.serviciosCount})
                  </span>
                </div>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-2">
                <div>
                  <label className="text-xs font-medium text-zinc-500">Credenciales del Administrador</label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Correo:</span>
                  <span className="font-mono text-sm">{createdCredentials.correo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Contraseña:</span>
                  <span className="font-mono text-sm">{createdCredentials.clave}</span>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <div>
                  <label className="text-xs font-medium text-blue-500">Link de acceso para el tenant</label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 font-mono">
                    {FRONTEND_URL}/login/{createdCredentials.slug}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(`Correo: ${createdCredentials.correo}\nContraseña: ${createdCredentials.clave}`);
                    setAllCopied(true);
                    setTimeout(() => setAllCopied(false), 2000);
                  }}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                >
                  {allCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar credenciales
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(`${FRONTEND_URL}/login/${createdCredentials.slug}`);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  {linkCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar link
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SuperDashboard;
