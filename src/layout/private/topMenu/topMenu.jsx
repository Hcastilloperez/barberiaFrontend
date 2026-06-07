import React from "react";
import { useSelector } from "react-redux";
import { Icon, Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

import "./topMenu.css";

export function TopMenu() {
  const { isAuth, userData } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  return (
    <>
    <Menu fixed="top" className="p-2 mb-2 bg-success text-white">
      <Menu.Item  className="text-white fs-5">
        <Icon name="blogger b" />
        <p> Royal Barber & Lounge</p>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item className="text-white fs-5"> Hola, {isAuth && <> {userData.name}</>} </Menu.Item>
        <Menu.Item as={Link} to={"/login"} active={pathname === "/home"}>
          <Icon name="sign-out" size="big" color="red" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    </>

  );
}
