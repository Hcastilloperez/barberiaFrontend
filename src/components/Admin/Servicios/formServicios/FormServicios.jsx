import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { map } from "lodash";
import { GetComodin } from "@/Hooks/useComodines.js";

import { CreateServicios, UpdateServicios } from "@/Hooks/useServicio";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  Loader2,
  Scissors,
  DollarSign,
  MessageSquare,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
  FormDescription,
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
  tipo: z.string({
    required_error: "Seleccione tipo de servicio",
  }),
  nombre: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),
  valor: z.string().min(1, { message: "El valor es requerido" }),
  comentario: z
    .string()
    .max(200, { message: "El comentario no puede exceder 200 caracteres" })
    .optional(),
  estado: z.string({
    required_error: "Seleccione estado",
  }),
  PagarBarbero: z.boolean().optional(),
});

const FormServicios = ({ servicio, onRefetch, onRefresh, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [comodinTipos, setComodinTipos] = useState([]);
  const [comodinEstado, setComodinEstado] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estado, setEstado] = useState([]);

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth || { userData: { tenantId: null } });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: servicio?.tipo || "",
      nombre: servicio?.nombre || "",
      valor: servicio?.valor || "",
      estado: servicio?.estado || "Activa",
      comentario: servicio?.comentario || "",
      PagarBarbero: servicio?.PagarBarbero || false,
    },
  });

  useEffect(() => {
    getTiposServicios();
    getEstadoServicios();
    getRutaFoto();
  }, []);

  useEffect(() => {
    setTipos(formatDropdownTipos(comodinTipos));
    setEstado(formatDropdownEstado(comodinEstado));
  }, [comodinTipos, comodinEstado]);

  const getTiposServicios = async () => {
    try {
      const result = await GetComodin("tiposServicio");
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

  const getRutaFoto = async () => {
    try {
      if (servicio?.foto) {
        setFoto(
          dir +
            "usuarios/usuarios/subir/subirImagen/bajarimagen/" +
            servicio.foto,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function onSubmit(data) {
    setLoading(true);
    try {
      const payload = { ...data, tenantId: userData.tenantId };
      if (servicio?.id) {
        await UpdateServicios(servicio.id, payload);
        toast.success("Servicio actualizado correctamente");
      } else {
        await CreateServicios(payload);
        toast.success("Servicio creado correctamente");
      }
      onRefetch?.();
      navigate("/servicios");
    } catch (error) {
      console.log("error al guardar", error);
      toast.error("Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <Scissors className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {servicio?.id ? "Editar Servicio" : "Nuevo Servicio"}
              </CardTitle>
              <CardDescription>
                {servicio?.id
                  ? "Actualice los datos del servicio"
                  : "Complete los datos para crear un nuevo servicio"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <Scissors className="h-3 w-3" />
                        Categoría
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Seleccionar categoría" />
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
              </div>

              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Servicio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Corte de cabello clásico"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="valor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Precio
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          type="text"
                          placeholder="0.00"
                          {...field}
                          className="h-11 pl-7"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comentario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      Descripción / Comentario
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Breve descripción del servicio (opcional)"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="PagarBarbero"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        Servicio Compartido
                      </FormLabel>
                      <FormDescription>
                        Si está activado, el servicio se comparte con los
                        barberos
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
                  {servicio?.id ? "Actualizar Servicio" : "Crear Servicio"}
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
    </>
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

export default FormServicios;
