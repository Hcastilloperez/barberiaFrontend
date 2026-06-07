import React from "react";
import { Outlet } from "react-router-dom";
import Footerpublic from "../footer/footer.public";
import MenuPublico from "../header/header.public";



function PublicLayout() {
  return (
    <>
      {/* header*/}
      <MenuPublico />

      {/* body */}
      <Outlet />

      {/* footer */}
   
    </>
  );
}

export default PublicLayout;
