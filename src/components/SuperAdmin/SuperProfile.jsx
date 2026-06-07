import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Lock, Save, Loader2 } from "lucide-react";

const SuperProfile = () => {
  const { userData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [profileData, setProfileData] = useState({
    nombres: userData.name || "",
    apellidos: userData.apellido || "",
    correo: userData.username || "",
  });

  const [passwordData, setPasswordData] = useState({
    claveActual: "",
    claveNueva: "",
    confirmarClave: "",
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: "success", text: "Perfil actualizado correctamente" });
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar el perfil" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setMessage({ type: "", text: "" });

    if (passwordData.claveNueva !== passwordData.confirmarClave) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden" });
      setPasswordLoading(false);
      return;
    }

    if (passwordData.claveNueva.length < 6) {
      setMessage({ type: "error", text: "La nueva contraseña debe tener al menos 6 caracteres" });
      setPasswordLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPasswordData({ claveActual: "", claveNueva: "", confirmarClave: "" });
      setMessage({ type: "success", text: "Contraseña actualizada correctamente" });
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar la contraseña" });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Mi Perfil</h1>
        <p className="text-zinc-500">Gestiona tu información y seguridad</p>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
          <CardDescription>Datos de tu cuenta de Super Administrador</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nombres</label>
                <Input
                  value={profileData.nombres}
                  onChange={(e) => setProfileData({ ...profileData, nombres: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Apellidos</label>
                <Input
                  value={profileData.apellidos}
                  onChange={(e) => setProfileData({ ...profileData, apellidos: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Correo electrónico</label>
              <Input
                type="email"
                value={profileData.correo}
                onChange={(e) => setProfileData({ ...profileData, correo: e.target.value })}
                required
                disabled
              />
              <p className="text-xs text-zinc-500 mt-1">El correo no puede ser modificado</p>
            </div>

            <div>
              <label className="text-sm font-medium">Rol</label>
              <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-lg">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="font-medium text-emerald-700">{userData.role}</span>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="bg-emerald-500 hover:bg-emerald-600">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Cambiar Contraseña
          </CardTitle>
          <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Contraseña actual</label>
              <Input
                type="password"
                value={passwordData.claveActual}
                onChange={(e) => setPasswordData({ ...passwordData, claveActual: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nueva contraseña</label>
                <Input
                  type="password"
                  value={passwordData.claveNueva}
                  onChange={(e) => setPasswordData({ ...passwordData, claveNueva: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Confirmar nueva contraseña</label>
                <Input
                  type="password"
                  value={passwordData.confirmarClave}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmarClave: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" disabled={passwordLoading} className="bg-emerald-500 hover:bg-emerald-600">
              {passwordLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Actualizar contraseña
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperProfile;