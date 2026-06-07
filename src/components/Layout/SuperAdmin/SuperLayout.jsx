import { Outlet, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Shield,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SuperLayout = () => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/super-login");
  };

  const navItems = [
    { path: "/super-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/super-perfil", label: "Perfil", icon: User },
    { path: "/super-configuracion", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <aside className="hidden md:flex w-64 flex-col bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        <div className="flex items-center gap-3 h-16 px-6 border-b border-slate-700">
          <Shield className="h-8 w-8 text-emerald-500" />
          <div>
            <span className="font-bold text-lg">BarberControl</span>
            <p className="text-xs text-slate-400">Super Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-400 border-l-4 border-emerald-500"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-3">
            <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="font-bold text-sm">
                {userData.name?.charAt(0)}
                {userData.apellido?.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{userData.name}</p>
              <p className="text-xs text-emerald-400">{userData.role}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between px-6 bg-white border-b">
          <div className="flex items-center gap-4 md:hidden">
            <Shield className="h-6 w-6 text-emerald-500" />
            <span className="font-bold">BarberControl</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="hidden sm:flex h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 items-center justify-center">
                    <span className="font-bold text-sm">
                      {userData.name?.charAt(0)}
                      {userData.apellido?.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden sm:inline">{userData.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{userData.name}</span>
                    <span className="text-xs text-muted-foreground">{userData.username}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/super-perfil")}>
                  <User className="mr-2 h-4 w-4" />
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/super-configuracion")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperLayout;