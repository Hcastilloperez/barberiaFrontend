import React from "react";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import LogoScissors from "@/components/common/LogoScissors";

import {
  Users,
  Settings,
  CalendarPlus,
  Clock,
  DollarSign,
  Armchair,
  LayoutDashboard,
  User,
  Gauge,
  Receipt,
  Shield,
  Sparkles,
} from "lucide-react";

function SideMenu(props) {
  const { className } = props;
  const location = useLocation();
  const { userData } = useSelector((state) => state.auth);

  const menuItemClass = (path) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
      location.pathname === path
        ? "bg-yellow-50 text-yellow-700 border-l-4 border-yellow-500"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
    );

  const MenuLink = ({ to, icon: Icon, children, ...props }) => (
    <Link to={to} className={menuItemClass(to)} {...props}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="font-medium text-sm">{children}</span>
    </Link>
  );

  const SectionHeader = ({ icon: Icon, label, color }) => (
    <div className="flex items-center gap-2 px-2 mb-3">
      <div className={cn("p-1.5 rounded-md", color)}>
        <Icon className="h-3.5 w-3.5 text-white" />
      </div>
      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );

  if (userData.role === "SuperUser") {
    return (
      <aside
        className={cn(
          "flex flex-col h-full bg-gradient-to-b from-white to-gray-50 border-r border-gray-200",
          className,
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-6 bg-white">
          <LogoScissors className="h-8 w-8" />
          <span className="text-yellow-600 font-bold text-xl tracking-tight">
            {userData?.tenantName || userData?.name || "Barbería"}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          <div>
            <SectionHeader icon={Gauge} label="Gestión" color="bg-yellow-500" />
            <div className="space-y-1 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <MenuLink to="/Dashboard" icon={LayoutDashboard}>
                Dashboard
              </MenuLink>
              <MenuLink to="/barberos" icon={CalendarPlus}>
                Registrar Servicio
              </MenuLink>
              <MenuLink to="/InfoBarbero" icon={Users}>
                Info Barbero
              </MenuLink>
              <MenuLink to="/historicoOrdenes" icon={Clock}>
                Historico Ordenes
              </MenuLink>
            </div>
          </div>

          <div>
            <SectionHeader
              icon={Receipt}
              label="Órdenes y Pagos"
              color="bg-green-500"
            />
            <div className="space-y-1 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <MenuLink to="/historicoOrdenes" icon={Clock}>
                Citas
              </MenuLink>
              <MenuLink to="/pagos" icon={DollarSign}>
                Registrar Pagos
              </MenuLink>
            </div>
          </div>

          <div>
            <SectionHeader icon={Shield} label="Sistema" color="bg-blue-500" />
            <div className="space-y-1 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <MenuLink to="/Configuracion" icon={Settings}>
                Parametrizacion
              </MenuLink>

              {/*  <MenuLink to="/perfil" icon={User}>
                Mi Perfil
              </MenuLink> */}

              <MenuLink to="/servicios" icon={Sparkles}>
                Servicios
              </MenuLink>
              <MenuLink to="/puestos" icon={Armchair}>
                Puestos
              </MenuLink>
              <MenuLink to="/clientes" icon={Users}>
                Clientes
              </MenuLink>
              <MenuLink to="/usuarios" icon={User}>
                Usuarios
              </MenuLink>
            </div>
          </div>
        </nav>

        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 border border-yellow-200 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">
                {userData?.nombres} {userData?.apellidos}
              </p>
              <p className="text-xs text-yellow-700 capitalize font-medium">
                {userData?.role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  } else if (userData.role === "Barbero") {
    return (
      <aside
        className={cn(
          "flex flex-col h-full bg-gradient-to-b from-white to-gray-50 border-r border-gray-200",
          className,
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-6 bg-white">
          <LogoScissors className="h-8 w-8" />
          <span className="text-yellow-600 font-bold text-xl tracking-tight">
            {userData?.tenantName || userData?.name || "Barbería"}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          <div>
            <SectionHeader icon={Gauge} label="Barbero" color="bg-yellow-500" />
            <div className="space-y-1 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <MenuLink to="/Dashboard" icon={LayoutDashboard}>
                Dashboard
              </MenuLink>
              <MenuLink to={`/infoOrdenes/${userData.id}`} icon={Users}>
                Mi Barbero
              </MenuLink>
              <MenuLink to="/historicoOrdenes" icon={Clock}>
                Mis Órdenes
              </MenuLink>
              <MenuLink to="/perfil" icon={User}>
                Mi Perfil
              </MenuLink>
            </div>
          </div>
        </nav>

        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 border border-yellow-200 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">
                {userData?.nombres} {userData?.apellidos}
              </p>
              <p className="text-xs text-yellow-700 capitalize font-medium">
                {userData?.role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  } else {
    return (
      <aside
        className={cn(
          "flex flex-col h-full bg-gradient-to-b from-white to-gray-50 border-r border-gray-200",
          className,
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-gray-100 px-6 bg-white">
          <LogoScissors className="h-8 w-8" />
          <span className="text-yellow-600 font-bold text-xl tracking-tight">
            {userData?.tenantName || userData?.name || "Barbería"}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          <div>
            <SectionHeader icon={Gauge} label="Gestión" color="bg-yellow-500" />
            <div className="space-y-1 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <MenuLink to="/Dashboard" icon={LayoutDashboard}>
                Dashboard
              </MenuLink>
              <MenuLink to="/barberos" icon={CalendarPlus}>
                Registrar Servicio
              </MenuLink>
              <MenuLink to="/InfoBarbero" icon={Users}>
                Info Barbero
              </MenuLink>
              <MenuLink to="/historicoOrdenes" icon={Clock}>
                Historico Ordenes
              </MenuLink>
            </div>
          </div>

          <div>
            <SectionHeader
              icon={Receipt}
              label="Órdenes y Pagos"
              color="bg-green-500"
            />
            <div className="space-y-1 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <MenuLink to="/historicoOrdenes" icon={Clock}>
                Citas
              </MenuLink>
              <MenuLink to="/pagos" icon={DollarSign}>
                Registrar Pagos
              </MenuLink>
            </div>
          </div>

          <div>
            <SectionHeader icon={Shield} label="Sistema" color="bg-blue-500" />
            <div className="space-y-1 bg-white rounded-lg p-2 shadow-sm border border-gray-100">
              <MenuLink to="/Configuracion" icon={Settings}>
                Parametrizacion
              </MenuLink>
              <MenuLink to="/servicios" icon={Sparkles}>
                Servicios
              </MenuLink>
              <MenuLink to="/puestos" icon={Armchair}>
                Puestos
              </MenuLink>
              <MenuLink to="/clientes" icon={Users}>
                Clientes
              </MenuLink>
              <MenuLink to="/usuarios" icon={User}>
                Usuarios
              </MenuLink>
            </div>
          </div>
        </nav>

        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-3 border border-yellow-200 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">
                {userData?.nombres} {userData?.apellidos}
              </p>
              <p className="text-xs text-yellow-700 capitalize font-medium">
                {userData?.role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

export default SideMenu;
