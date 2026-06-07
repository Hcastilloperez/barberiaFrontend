import React from "react";

const MenuPublico = () => {
  return (
    <>
      <nav className="navbar navbar-expand bg-dark navbar-dark rounded">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <a className="nav-link icon-link" href="/">
                Servicios
              </a>
              <a className="nav-link" href="/">
                Talento humano
              </a>
              <a className="nav-link" href="/servicios">
                Servicios
              </a>
              <a className="nav-link" href="/login">
                Entrar
              </a>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MenuPublico;
