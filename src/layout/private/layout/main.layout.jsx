import React from "react";
import { Outlet } from "react-router-dom";

//import Header from "../../components/header";
import SideMenu from "../sideMenu/sideMenu";
import { TopMenu } from "../topMenu/topMenu";


import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="mainLayout">
      <div className="mainLayout__menu">
        <TopMenu />{" "}
      </div>

      <div className="mainLayout__main-content">
        <SideMenu>
          <Outlet />
        </SideMenu>
      </div>
    </div>
  );
}

export default MainLayout;
