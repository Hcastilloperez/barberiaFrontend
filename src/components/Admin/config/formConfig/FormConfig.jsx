import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateComodin, UpdateComodin } from "@/Hooks/useComodines.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Settings, Type, Hash, ToggleLeft } from "lucide-react";
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

const CONFIG_TYPES = [
  { value: "tiposUsuarios", label: "Tipos de Usuario" },
  { value: "tiposPuesto", label: "Tipos de Puesto" },
  { value: "estadoPuesto", label: "Estado Puesto" },
  { value: "estadoServicio", label: "Estado Servicio" },
  { value: "medioPago", label: "Medio de Pago" },
  { value: "estadoOrden", label: "Estado Orden" },
  { value: "tiposDocumentos", label: "Tipos de Documento" },
  { value: "tiposServicio", label: "Tipos de Servicio" },
];

const formSchema = z.object({
  comodin: z.string({
    required_error: "Seleccione tipo de configuración",
  }),
  text: z
    .string()
    .min(2, { message: "El texto debe tener al menos 2 caracteres" })
    .max(100, { message: "El texto no puede exceder 100 caracteres" }),
  value: z
    .string()
    .min(1, { message: "El valor es requerido" })
    .max(100, { message: "El valor no puede exceder 100 caracteres" }),
});

const FormConfig = ({ config, onRefetch, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comodin: config?.comodin || "",
      text: config?.text || "",
      value: config?.value || "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      if (config?.id) {
        await UpdateComodin(config.id, data);
        toast.success("Configuración actualizada");
      } else {
        await CreateComodin(data);
        toast.success("Configuración creada");
      }
      onRefetch?.();
      navigate("/Configuracion");
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
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <CardTitle className="text-xl">
              {config?.id ? "Editar Configuración" : "Nueva Configuración"}
            </CardTitle>
            <CardDescription>
              {config?.id
                ? "Actualice los valores de configuración"
                : "Agregue nuevas opciones de configuración al sistema"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="comodin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    Tipo de Configuración
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
                      {CONFIG_TYPES.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
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
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Type className="h-3 w-3" />
                    Texto Visible
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Texto que se mostrará"
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    Valor
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Valor de la configuración"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
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
                {config?.id ? "Actualizar" : "Crear Configuración"}
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

export default FormConfig;