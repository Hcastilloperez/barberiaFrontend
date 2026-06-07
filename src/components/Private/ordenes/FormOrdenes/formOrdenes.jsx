import React, { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateOrdenes } from "@/Hooks/useOrdenes";
import { GetClientes } from "@/Hooks/useClientes";

import { map } from "lodash";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Definir el esquema de validación con Zod
const formSchema = z.object({
  idCliente: z.string({
    required_error: "Por favor seleccione un Cleinte",
    invalid_type_error: "El Cliente seleccionado no es válida",
  }),
});

const FormOrdenes = (props) => {
  const { onRefetch, id } = props;
  const [clientes, setClientes] = useState([]);
  const [comodin, setComodin] = useState([]);
  const orden = null;
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth || { userData: { tenantId: null } });

  const [formData, setFormData] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idCliente: "",
    },
  });

  /*************************************
   *   PROCESOS PÁRA LLENAR LOS SELECT
   *
   **************************************/

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => {
    try {
      const result = await GetClientes();

      console.log(result);
      setComodin(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setClientes(formatDropdownClientes(comodin));
  }, [comodin]);

  /************************************************ */

  async function onSubmit(data) {
    console.log("Data", data);
    // Agregar la validacion de los datos manuales
    try {
      if (orden) {
        //await UpdateOrdenes(id, formValue);
      } else {
        const payload = {
          ...data,
          estado: "Abierta",
          ispagada: "NO",
          puesto: id,
          valorOrden: "0",
          medioPago: "",
          idUsuario: id,
          tenantId: userData.tenantId,
        };
        console.log("ordenes", payload);

        await CreateOrdenes(payload);
        toast("Orden Creada");
        navigate(`/infoOrdenes/${id}`);
      }
      onRefetch();
    } catch (error) {
      console.log("error al guardar", error);
      toast("Error");
    }
  }

  return (
    <div className="w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full "
        >
          <FormField
            control={form.control}
            name="idCliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona Cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clientes.map((clientes) => (
                      <SelectItem key={clientes.value} value={clientes.value}>
                        {clientes.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Crear
          </Button>
        </form>
      </Form>
    </div>
  );
};

function formatDropdownClientes(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.nombres + " " + item.apellidos,
    value: item.id,
  }));
}

export default FormOrdenes;
