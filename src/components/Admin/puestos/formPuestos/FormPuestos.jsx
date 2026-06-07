import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GetComodin } from "@/Hooks/useComodines.js";
import { GetUsuarios } from "@/Hooks/useUsuarios.js";
import { CreatePuestos } from "@/Hooks/usePuesto.js";

import { map } from "lodash";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Armchair, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  idusuario: z.string({
    required_error: "Seleccione un usuario",
  }),
  tipo: z.string({
    required_error: "Seleccione tipo de puesto",
  }),
  estado: z.string({
    required_error: "Seleccione estado",
  }),
});

const ESTADO_OPTIONS = [
  { value: "Activa", label: "Activo" },
  { value: "In Activa", label: "Inactivo" },
];

const FormPuestos = ({ onRefetch, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [comodinTipos, setComodinTipos] = useState([]);
  const [comodinEstado, setComodinEstado] = useState([]);
  const [comodinUsuario, setComodinUsuario] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estado, setEstado] = useState([]);
  const [usuario, setUsuario] = useState([]);

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth || { userData: { tenantId: null } });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idusuario: "",
      tipo: "",
      estado: "Activa",
    },
  });

  /***************
   *
   *   PROCESOS PÁRA LLENAR LOS SELECT
   *
   *
   ***************/
  useEffect(() => {
    getTiposPuesto();
    getEstadoPuesto();
    getEstadoUsuario();
  }, []);

  const getTiposPuesto = async () => {
    try {
      const result = await GetComodin("tiposPuesto");
      setComodinTipos(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getEstadoPuesto = async () => {
    try {
      const result = await GetComodin("estadoPuesto");
      setComodinEstado(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getEstadoUsuario = async () => {
    try {
      const result = await GetUsuarios();
      setComodinUsuario(result);
      console.log("COMODIN USUARIO", comodinUsuario);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTipos(formatDropdownTipos(comodinTipos));
    setEstado(formatDropdownEstado(comodinEstado));
    setUsuario(formatDropdownUsuario(comodinUsuario));
  }, [comodinTipos, comodinEstado, comodinUsuario]);

  /************************************************ */

  async function onSubmit(data) {
    setLoading(true);
    try {
      const payload = { ...data, tenantId: userData.tenantId };
      await CreatePuestos(payload);
      toast.success("Puesto creado correctamente");
      onRefetch?.();
      navigate("/puestos");
    } catch (error) {
      console.log("error al guardar", error);
      toast.error("Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <Armchair className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Nuevo Puesto</CardTitle>
            <CardDescription>
              Asigne un puesto de trabajo a un usuario
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="idusuario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Funcionario
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccionar funcionario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usuario.map((usuario) => (
                        <SelectItem key={usuario.value} value={usuario.value}>
                          {usuario.text}
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
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Armchair className="h-3 w-3" />
                    Tipo de Puesto
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccionar tipo" />
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
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccionar estado" />
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

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crear Puesto
              </Button>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

function formatDropdownUsuario(data) {
  return map(data, (item) => ({
    key: item._id,
    text: item.nombres + " " + item.apellidos,
    value: item.id,
  }));
}

function formatDropdownTipos(data) {
  return map(data, (item) => ({
    key: item._id,
    text: item.text,
    value: item.value,
  }));
}

function formatDropdownEstado(data) {
  return map(data, (item) => ({
    key: item._id,
    text: item.text,
    value: item.value,
  }));
}

export default FormPuestos;
