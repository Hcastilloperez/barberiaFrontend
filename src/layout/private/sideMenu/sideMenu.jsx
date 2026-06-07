import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./sideMenu.css";

function SideMenu(props) {
  const { children } = props;
  const { pathname } = useLocation();
  

  return (
    <div className="side-menu-admin">
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props) {
  const { pathname } = props;
  const { isAuth, userData } = useSelector((state) => state.auth);

  if (userData.role === "SuperUser" ) {

    /*************************
     * 
     * 
     * *********** MENU PARA LOS SUPER USERS ************
     * 
     * 
     **************************/

  return (
    <Menu fixed="left" borderless className="side" vertical>
      <Menu.Item as={Link} to={"/barberos"} active={pathname === "/"}>
        <Icon name="home" /> Registrar Servicio
      </Menu.Item>

      <Menu.Item
          as={Link}
          to={"/historicoOrdenes"}
          active={pathname === "/admin/payments-history"}>
          <Icon name="configure" /> Historico Servicios Mes
        </Menu.Item>



      <Menu.Item
        as={Link}
        to={"/perfil"}
        active={pathname === "/admin/payments-history"}>
        <Icon name="configure" /> Mi Perfil
      </Menu.Item>

      <Menu.Item
        as={Link}
        to={"/pagos"}
        active={pathname === "/admin/tables"}>
        <Icon name="configure" color="black" size="large" /> Registrar Pagos
      </Menu.Item>


      <Menu.Item
        as={Link}
        to={"/dashboard"}
        active={pathname === "/admin/tables"}>
        <Icon name="bars" color="black" size="large" /> Dashboard
      </Menu.Item>


    

      <Menu.Item>---------admin Services-----------</Menu.Item>

      <Menu.Item as={Link} to={"/puestos"} active={pathname === "/prueba"}>
        <Icon name="asterisk" color="brown" size="large" /> Puestos
      </Menu.Item>

      <Menu.Item
        as={Link}
        to={"/usuarios"}
        active={pathname === "/admin/tables"}>
        <Icon name="users" color="yellow" size="large" /> Usuarios
      </Menu.Item>

      <Menu.Item
        as={Link}
        to={"/clientes"}
        active={pathname === "/admin/categorias"}>
        <Icon name="folder open" color="orange" size="large" /> Clientes
      </Menu.Item>

      <Menu.Item as={Link} to={"/servicios"} active={pathname === "/servicios"}>
        <Icon name="chess" color="red" size="large" /> servicios
      </Menu.Item>

      <Menu.Item disabled active={pathname === "/admin/products"}>
        <Icon name="cogs" /> Config
      </Menu.Item>

      <Menu.Item disabled active={pathname === "/admin/users"}>
        <Icon name="users" /> Usuarios
      </Menu.Item>
      
    </Menu>
  );
  }else if(userData.role === "Barbero" ) {

    /*************************
     * 
     * 
     * *********** MENU PARA LOS BARBEROS ************
     * 
     * 
     **************************/


    return (
      <Menu fixed="left" borderless className="side" vertical>
        
  
        <Menu.Item
        as={Link}
        to={`/infoOrdenes/${userData.id}`}
        active={pathname === "/InfoBarbero"}>
        <Icon name="blogger b" /> Mis Servicios
      </Menu.Item>

      <Menu.Item
        as={Link}
        to={`/infoOrdenes/${userData.id}`}
        active={pathname === "/InfoBarbero"}>
        <Icon name="blogger b" /> Nuevo Servicio
      </Menu.Item>
  

      <Menu.Item
          as={Link}
          to={"/historicoOrdenes"}
          active={pathname === "/admin/payments-history"}>
          <Icon name="configure" /> Historico Servicios Mes
        </Menu.Item>
        


  
        <Menu.Item
          as={Link}
          to={"/blogs/user"}
          active={pathname === "/admin/payments-history"}>
          <Icon name="configure" /> Mi Perfil
        </Menu.Item>
        </Menu>
    )

  }
}

export default SideMenu;
