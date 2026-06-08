import { createBrowserRouter } from "react-router-dom";

import PrivateLayout from "@/components/Layout/Private/layoutPrivate";
import PublicLayout from "@/components/Layout/Public/layoutPublic";
import LayoutBarbero from "@/components/Layout/Private/layoutBarbero";
import SuperLayout from "@/components/Layout/SuperAdmin/SuperLayout";

import Homepage from "@/Pages/Public/Home";
import LoginPage from "@/Pages/Public/Login";
import TenantSelectorPage from "@/Pages/Public/TenantSelector";

import SuperLoginPage from "@/Pages/SuperAdmin/SuperLoginPage";
import SuperDashboardPage from "@/Pages/SuperAdmin/SuperDashboardPage";
import SuperProfilePage from "@/Pages/SuperAdmin/SuperProfilePage";
import SuperConfigPage from "@/Pages/SuperAdmin/SuperConfigPage";
import TenantLoginPage from "@/Pages/Public/TenantLogin";

import PuestosPage from "@/Pages/Admin/Puesto/Puesto";
import ClientePage from "@/Pages/Admin/Clientes/Clientes";
import ServiciosPage from "@/Pages/Admin/Servicios/Servicios";
import UsuariosPage from "@/Pages/Admin/Usuarios/Usuarios";
import PagosPage from "./Pages/Private/pagos/pagos";

import BarberosPage from "@/Pages/Private/barberos/barberos";
import InfoBarberoPage from "@/Pages/Private/barberos/InfoBarbero";

import InfoOrdenesPage from "@/Pages/Private/orders/InfoOrdenes";
import DetailOrdenesPage from "@/Pages/Private/orders/DetailOrdenes";
import HistoricoOrdenesPage from "@/Pages/Private/orders/HistoricoOrdenes";

import DashboardPage from "./Pages/Private/Dashboard/Dashboard";
import ConfigPage from "./Pages/Admin/Config/config";

import PerfilUsuarioPage from "./Pages/Admin/Usuarios/PerfilUsuario";

import AgendarPage from "./Pages/Public/Agendar";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/login/:slug", element: <TenantLoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/AgendarCita", element: <AgendarPage /> },
      { path: "/select-tenant", element: <TenantSelectorPage /> },
      { path: "/super-login", element: <SuperLoginPage /> },
    ],
  },

  {
    path: "/",
    element: <SuperLayout />,
    children: [
      { path: "/super-dashboard", element: <SuperDashboardPage /> },
      { path: "/super-perfil", element: <SuperProfilePage /> },
      { path: "/super-configuracion", element: <SuperConfigPage /> },
    ],
  },

  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      { path: "/usuarios", element: <UsuariosPage /> },
      { path: "/clientes", element: <ClientePage /> },
      { path: "/puestos", element: <PuestosPage /> },
      { path: "/servicios", element: <ServiciosPage /> },
      { path: "/pagos", element: <PagosPage /> },
      { path: "/perfil", element: <PerfilUsuarioPage /> },
      { path: "/dashboard", element: <DashboardPage /> },

      { path: "/barberos", element: <BarberosPage /> },
      { path: "/perfil", element: <PerfilUsuarioPage /> },
      { path: "/Configuracion", element: <ConfigPage /> },
    ],
  },

  {
    path: "/",
    element: <LayoutBarbero />,
    children: [
      { path: "/infoOrdenes/:id", element: <InfoOrdenesPage /> },
      { path: "/detailOrdenes/:idOrder", element: <DetailOrdenesPage /> },
      { path: "/InfoBarbero", element: <InfoBarberoPage /> },
      { path: "/historicoOrdenes", element: <HistoricoOrdenesPage /> },
    ],
  },
]);

export default routes;
