export const formatearDinero = (cantidad) => {
    console.log("cantidad", cantidad)
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "COP",
    });
  };
  