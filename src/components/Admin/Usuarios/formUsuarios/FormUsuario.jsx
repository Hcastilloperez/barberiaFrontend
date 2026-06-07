import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { map } from "lodash";
import { GetComodin } from "@/Hooks/useComodines.js";
import { CreateUsuarios, UpdateUsuarios } from "@/Hooks/useUsuarios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Mail, ShieldCheck, Briefcase, Loader2 } from "lucide-react";
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
  }),

  estado: z.string({
    required_error: "Por favor seleccione estado usuario",
  }),

  descripcion: z
    .string()
    .min(2, { message: "La descripción debe tener al menos 2 caracteres" })
    .max(100, { message: "La descripción no puede exceder 100 caracteres" }),

  clave: z.string().optional(),
});

const FormUsuario = ({ usuario, onRefetch }) => {
  const [comodinTipos, setComodinTipos] = useState([]);
  const [comodinEstado, setComodinEstado] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estado, setEstado] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth || { userData: { tenantId: null } });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: usuario?.nombres || "",
      apellidos: usuario?.apellidos || "",
      correo: usuario?.correo || "",
      role: usuario?.role || "",
      estado: usuario?.estado || "Activa",
      descripcion: usuario?.descripcion || "",
      clave: "123456",
    },
  });

  useEffect(() => {
    getTiposServicios();
    getEstadoServicios();
  }, []);

  useEffect(() => {
    setTipos(formatDropdownTipos(comodinTipos));
    setEstado(formatDropdownEstado(comodinEstado));
  }, [comodinTipos, comodinEstado]);

  const getTiposServicios = async () => {
    try {
      const result = await GetComodin("tiposUsuarios");
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

  async function onSubmit(data) {
    setLoading(true);
    try {
      console.log("DEBUG FormUsuario - data:", JSON.stringify(data, null, 2));
      const payload = { ...data, tenantId: userData.tenantId };
      console.log("DEBUG FormUsuario - payload:", JSON.stringify(payload, null, 2));
      if (usuario?.id) {
        await UpdateUsuarios(usuario.id, payload);
        toast.success("Usuario actualizado correctamente");
      } else {
        await CreateUsuarios(payload);
        toast.success("Usuario creado correctamente");
      }
      onRefetch?.();
      navigate("/usuarios");
    } catch (error) {
      console.log("error al guardar", error);
      console.log("error response:", error.response?.data);
      const errorMsg = error.response?.data?.message || error.message || "Error al guardar";
      toast.error(errorMsg);
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
              <User className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {usuario?.id ? "Editar Usuario" : "Nuevo Usuario"}
              </CardTitle>
              <CardDescription>
                {usuario?.id
                  ? "Actualice los datos del usuario"
                  : "Complete los datos para crear un nuevo usuario"}
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
                  name="nombres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Nombres
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombres del usuario"
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
                  name="apellidos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apellidos del usuario"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Rol
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Seleccionar rol" />
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
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      Habilidades / Descripción
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Cortar cabello, barbería clásica"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!usuario?.id && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    La contraseña por defecto será: <strong>123456</strong>
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {usuario?.id ? "Actualizar" : "Crear Usuario"}
                </Button>
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

export default FormUsuario;
