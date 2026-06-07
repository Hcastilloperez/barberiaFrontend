import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { map } from "lodash";

import { GetComodin } from "@/Hooks/useComodines.js";

import { CreateUsuarios, UpdateUsuarios } from "@/Hooks/useUsuarios";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { Calendar } from "lucide-react";
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
import { Input } from "@/components/ui/input";

// Definir el esquema de validación con Zod
const formSchema = z.object({
  nombres: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),

  apellidos: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(50, { message: "El apellido no puede exceder 50 caracteres" }),

  correo: z
    .string()
    .email({ message: "Por favor ingrese un correo electrónico válido" })
    .min(1, { message: "El correo electrónico es requerido" }),

  role: z.string({
    required_error: "Por favor seleccione tipo usuario",
    invalid_type_error: "tipo usuario  seleccionada no es válida",
  }),

  estado: z.string({
    required_error: "Por favor seleccione estado usuario",
    invalid_type_error: "estado usuario  seleccionada no es válida",
  }),

  descripcion: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(50, { message: "El apellido no puede exceder 50 caracteres" }),

  clave: z.string(),
});

const FormUsuario = (props) => {
  const { usuario, onRefetch } = props;
  const [comodinTipos, setComodinTipos] = useState([]);
  const [comodinEstado, setComodinEstado] = useState([]);

  const [tipos, setTipos] = useState([]);
  const [estado, setEstado] = useState([]);
  // const [usuario, setUsuario] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema, usuario),
    defaultValues: {
      nombres: usuario.nombres || "",
      apellidos: usuario.apellidos || "",
      correo: usuario.correo || "",
      role: usuario.role || "",
      estado: usuario.estado || "",
      descripcion: usuario.descripcion || "",
      clave: usuario.descripcion || "123456",
    },
  });

  async function onSubmit(data) {
    console.log("Data Submit", data);
    // Agregar la validacion de los datos manuales
    try {
      !usuario.id
        ? await CreateUsuarios(data)
        : await UpdateUsuarios(usuario.id, data);

      toast("Datos Almacenados");
      onRefetch();
      navigate("/usuarios");
    } catch (error) {
      console.log("error al guardar", error);
      toast("Error");
    }

    setFormData(data);

    // setShowSummary(true);
  }

  /***************
   *
   *   PROCESOS PÁRA LLENAR LOS SELECT
   *
   *
   ***************/
  const getTiposServicios = async () => {
    try {
      const result = await GetComodin("tiposUsuarios"); //categorias
      setComodinTipos(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getEstadoServicios = async () => {
    try {
      const result = await GetComodin("estadoPuesto");
      setComodinEstado(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTiposServicios();
    getEstadoServicios();
  }, []);

  useEffect(() => {
    setTipos(formatDropdownTipos(comodinTipos));
    setEstado(formatDropdownEstado(comodinEstado));
  }, [comodinTipos, comodinEstado]);

  /**************************************** */

  return (
    <div className="w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full ">
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese su nombre"
                    {...field}
                    defaultValue={usuario?.nombres || ""}
                    className="h-10 sm:h-11"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Apellidos
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese su nombre"
                    {...field}
                    defaultValue={usuario?.apellidos || ""}
                    className="h-10 sm:h-11"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Correo Electronico
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese su Correo"
                    {...field}
                    defaultValue={usuario?.correo || ""}
                    className="h-10 sm:h-11"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Usuario</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={usuario?.role || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona Tipo Usuario" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tipos.map((tipos) => (
                      <SelectItem key={tipos.value} value={tipos.value}>
                        {tipos.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Servicio</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={usuario?.estado || ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona Estado Usuario" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {estado.map((estado) => (
                      <SelectItem key={estado.value} value={estado.value}>
                        {estado.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Habilidades
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="habilidades"
                    {...field}
                    defaultValue={usuario?.descripcion}
                    className="h-10 sm:h-11"
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
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

function formatDropdownTipos(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.text,
    value: item.value,
  }));
}

function formatDropdownEstado(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.text,
    value: item.value,
  }));
}

export default FormUsuario;
