import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginAction } from "@/redux/slices/authSlice";
import { fetchService } from "@/Config/Axios.jsx";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Lock,
  ChevronRight,
  Loader2,
  Sparkles,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";

const TenantLogin = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tenantValid, setTenantValid] = useState(null);
  const [checkingTenant, setCheckingTenant] = useState(true);

  useEffect(() => {
    validateTenant();
  }, [slug]);

  const validateTenant = async () => {
    try {
      const { data } = await axios.get(`http://192.168.1.54:4001/api/tenants/${slug}`);
      if (data && data.estado === "activo") {
        setTenantValid(data);
      } else {
        setTenantValid(false);
      }
    } catch (err) {
      setTenantValid(false);
    } finally {
      setCheckingTenant(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.correo || !form.clave) {
      setError("Ingresa tu correo y contraseña");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post(
        `http://192.168.1.54:4001/api/tenants/${slug}/login`,
        { correo: form.correo, clave: form.clave }
      );
      localStorage.setItem("token", JSON.stringify(data.jwt));
      localStorage.setItem("tenantSlug", slug);
      dispatch(setLoginAction(data));

      if (
        data.userData.role === "Administrador" ||
        data.userData.role === "SuperUser"
      ) {
        navigate("/dashboard");
      } else {
        navigate(`/infoOrdenes/${data.userData.id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales inválidas");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (checkingTenant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-700 border-t-yellow-500 animate-spin" />
            <LogoScissors className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-slate-400 text-sm">Verificando barbería...</p>
        </div>
      </div>
    );
  }

  if (!tenantValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-full max-w-md mx-4 p-8 rounded-2xl bg-slate-800/50 border border-slate-700 text-center">
          <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Barbería no encontrada
          </h2>
          <p className="text-slate-400 mb-6">
            La barbería "{slug}" no existe o no está activa.
          </p>
          <Link to="/">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
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

          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Bienvenido a {tenantValid.nombre}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Ingresa tus credenciales para acceder al sistema de gestión de tu
              barbería.
            </p>
          </div>
        </div>

        <div className="hidden lg:block relative z-10 mt-auto pt-8">
          <p className="text-slate-600 text-sm">
            © 2025 BarberControl. Todos los derechos reservados.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-7/12 bg-slate-50 p-8 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center">
              <LogoScissors className="h-5 w-5" />
            </div>
            <span className="text-slate-900 font-bold text-xl">
              {tenantValid.nombre}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Iniciar sesión
            </h2>
            <p className="text-slate-500">Accede a tu cuenta de {tenantValid.nombre}</p>
          </div>

          <div className="space-y-6">
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



          <div className="lg:hidden mt-8 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
            <p>© 2025 BarberControl. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;