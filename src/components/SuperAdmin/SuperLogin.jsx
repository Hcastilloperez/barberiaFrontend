import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginAction } from "@/redux/slices/authSlice";
import { fetchService } from "@/Config/Axios.jsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, ChevronRight, Shield, Loader2 } from "lucide-react";
import LogoScissors from "@/components/common/LogoScissors";

const SuperLogin = () => {
  const [form, setForm] = useState({ correo: "", clave: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await fetchService("usuarios/super/login", "post", form);
      localStorage.setItem("token", JSON.stringify(data.jwt));
      dispatch(setLoginAction(data));
      navigate("/super-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="w-full lg:w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Shield className="h-6 w-6 text-black" />
            </div>
            <div>
              <span className="text-white font-bold text-2xl tracking-tight">
                BarberControl
              </span>
              <p className="text-slate-500 text-xs font-medium">Panel Super Admin</p>
            </div>
          </div>

          {/* Main message */}
          <div className="py-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Centro de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                administración
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Gestiona todos los tenants, usuarios y configuraciones del sistema BarberControl SaaS.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-slate-500 text-xs">Uptime</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-3xl font-bold text-white">Seguro</p>
              <p className="text-slate-500 text-xs">Encriptado</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-slate-500 text-xs">Soporte</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="hidden lg:block relative z-10 mt-auto pt-8">
          <p className="text-slate-600 text-sm">
            © 2025 BarberControl SaaS. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-7/12 bg-slate-50 p-8 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center">
              <Shield className="h-5 w-5 text-black" />
            </div>
            <span className="text-slate-900 font-bold text-xl">BarberControl</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Super Administrador
            </h2>
            <p className="text-slate-500">
              Ingresa tus credenciales para acceder al panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Correo */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
                <Input
                  id="correo"
                  placeholder="superadmin@barbercontrol.saas"
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  className="pl-10 h-12 bg-white border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
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
                  onChange={handleChange}
                  required
                  className="pl-10 h-12 bg-white border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-red-500" />
                </div>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-black font-semibold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  Acceder al panel
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="w-full text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <LogoScissors className="mr-2 h-4 w-4" />
              Regresar al inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperLogin;
