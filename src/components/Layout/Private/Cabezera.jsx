import React from "react";

import { Button } from "@/components/ui/button";

const cabecera = (props) => {
  const { currentComponent, nomBoton1, linkBoton1, nomBoton2, linkBoton2 } =
    props;

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-foreground">{currentComponent}</h1>
      <div className="flex items-center gap-2">
        {nomBoton1 && (
          <Button size="sm" onClick={linkBoton1}>
            {nomBoton1}
          </Button>
        )}
        {nomBoton2 && (
          <Button variant="outline" size="sm" onClick={linkBoton2}>
            {nomBoton2}
          </Button>
        )}
      </div>
    </div>
  );
};

export default cabecera;