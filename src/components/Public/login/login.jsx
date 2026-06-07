import { useState, useEffect } from "react";
import { IntentLogin } from "@/Hooks/useLogin";
import { setLoginAction } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchService } from "@/Config/Axios.jsx";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Lock,
  ChevronRight,
  Building2,
  Loader2,
  Sparkles,
  BarChart3,
  Clock,
  Users,
  ArrowLeft,
} from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";

const Login = () => {
  const [tenants, setTenants] = useState([]);
  const [loadingTenants, setLoadingTenants] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tenantId: "",
    correo: "",
    clave: "",
  });

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
      setLoadingTenants(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTenantChange = (value) => {
    setForm({ ...form, tenantId: value });
  };

  const handleSubmit = async () => {
    if (!form.tenantId) {
      setError("Selecciona una barbería");
      return;
    }
    if (!form.correo || !form.clave) {
      setError("Ingresa tu correo y contraseña");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const result = await IntentLogin(form);
      localStorage.setItem("token", JSON.stringify(result.jwt));
      dispatch(setLoginAction(result));

      if (
        result.userData.role === "Administrador" ||
        result.userData.role === "SuperUser"
      ) {
        navigate("/dashboard");
      } else {
        navigate(`/infoOrdenes/${result.userData.id}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Credenciales inválidas");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loadingTenants) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-700 border-t-yellow-500 animate-spin" />
            <LogoScissors className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-slate-400 text-sm">Cargando BarberControl...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="w-full lg:w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="relative">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <LogoScissors className="h-6 w-6" />
              </div>
              <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1" />
            </div>
            <div>
              <span className="text-white font-bold text-2xl tracking-tight">
                BarberControl
              </span>
              <p className="text-slate-500 text-xs font-medium">SaaS de Barberías</p>
            </div>
          </div>

          {/* Main message */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Gestión inteligente para tu barbería
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Controla citas, empleados y clientes. Todo en un solo lugar, desde cualquier dispositivo.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Citas Online</p>
                <p className="text-slate-500 text-xs">Gestiona agenda</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Clientes</p>
                <p className="text-slate-500 text-xs">Base de datos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Reportes</p>
                <p className="text-slate-500 text-xs">Estadísticas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Multi-tenant</p>
                <p className="text-slate-500 text-xs">Varias barberías</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="hidden lg:block relative z-10 mt-auto pt-8">
          <p className="text-slate-600 text-sm">
            © 2025 BarberControl. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-7/12 bg-slate-50 p-8 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center">
              <LogoScissors className="h-5 w-5" />
            </div>
            <span className="text-slate-900 font-bold text-xl">BarberControl</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Iniciar sesión
            </h2>
            <p className="text-slate-500">
              Accede a tu cuenta para gestionar tu barbería
            </p>
          </div>

          <div className="space-y-6">
            {/* Select de Barbería */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Barbería
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
                <Select value={form.tenantId} onValueChange={handleTenantChange}>
                  <SelectTrigger className="pl-10 h-12 bg-white border-slate-200 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500">
                    <SelectValue placeholder="Selecciona tu barbería" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
                <Input
                  id="correo"
                  placeholder="admin@tu-barberia.com"
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={(e) => handleChange(e)}
                  className="pl-10 h-12 bg-white border-slate-200 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
                <Input
                  id="password"
                  type="password"
                  name="clave"
                  placeholder="••••••••"
                  value={form.clave}
                  onChange={(e) => handleChange(e)}
                  className="pl-10 h-12 bg-white border-slate-200 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <Lock className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Recordarme
              </label>
            </div>
            <Link
              to={"/"}
              className="text-sm font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button
            className="mt-6 w-full h-12 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/20 transition-all"
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              <>
                Entrar al dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="mt-8 text-center pb-8 lg:pb-0">
            <span className="text-sm text-slate-400">
              Registrar nueva barbería (próximamente)
            </span>
          </div>

          <div className="mt-6 text-center">
            <Link
              to={"/"}
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-yellow-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Regresar al inicio
            </Link>
          </div>

          {/* Mobile version info */}
          <div className="lg:hidden mt-8 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
            <p>© 2025 BarberControl. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
