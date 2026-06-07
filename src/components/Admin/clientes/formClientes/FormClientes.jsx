import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { map } from "lodash";
import { z } from "zod";
import { format } from "date-fns";
import { CreateClientes, UpdateClientes } from "@/Hooks/useClientes";
import { GetComodin } from "@/Hooks/useComodines.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { User, Phone, Mail, FileText, Loader2, CreditCard, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
  tipoDocumento: z.string({
    required_error: "Seleccione tipo de documento",
  }),
  noDocumento: z
    .string()
    .min(5, { message: "El documento debe tener al menos 5 caracteres" })
    .max(15, { message: "El documento no puede exceder 15 caracteres" }),

  nombres: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" }),

  apellidos: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
    .max(50, { message: "El apellido no puede exceder 50 caracteres" }),

  telefono: z
    .string()
    .min(8, { message: "El teléfono debe tener al menos 8 caracteres" })
    .max(15, { message: "El teléfono no puede exceder 15 caracteres" }),

  correo: z
    .string()
    .email({ message: "Ingrese un correo electrónico válido" })
    .min(1, { message: "El correo electrónico es requerido" }),

  fechaCumple: z.string().optional().or(z.literal("")),
});

const FormClientes = ({ cliente, onRefetch, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [comodinTipos, setComodinTipos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth || { userData: { tenantId: null } });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoDocumento: cliente?.tipoDocumento || "Cédula",
      noDocumento: cliente?.noDocumento || "",
      nombres: cliente?.nombres || "",
      apellidos: cliente?.apellidos || "",
      telefono: cliente?.telefono || "",
      correo: cliente?.correo || "",
      fechaCumple: cliente?.fechaCumple || "",
    },
  });

  /***************
   *
   *   PROCESOS PÁRA LLENAR LOS SELECT
   *
   *
   ***************/
  const getTiposUsuarios = async () => {
    try {
      const result = await GetComodin("tiposDocumentos");
      setComodinTipos(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTiposUsuarios();
  }, []);

  useEffect(() => {
    setTipos(formatDropdownTipos(comodinTipos));
  }, [comodinTipos]);

  /************************************************ */

  async function onSubmit(data) {
    setLoading(true);
    try {
      const payload = { ...data, tenantId: userData.tenantId };
      if (cliente?.id) {
        await UpdateClientes(cliente.id, payload);
        toast.success("Cliente actualizado correctamente");
      } else {
        await CreateClientes(payload);
        toast.success("Cliente creado correctamente");
      }
      onRefetch?.();
      navigate("/clientes");
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
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl">
              {cliente?.id ? "Editar Cliente" : "Nuevo Cliente"}
            </CardTitle>
            <CardDescription>
              {cliente?.id
                ? "Actualice los datos del cliente"
                : "Complete los datos para registrar un nuevo cliente"}
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
                name="tipoDocumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Tipo Documento
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Seleccionar tipo de documento" />
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
                name="noDocumento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      Número Documento
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: 12345678"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombres del cliente"
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
                        placeholder="Apellidos del cliente"
                        {...field}
                        className="h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Teléfono
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Ej: 04121234567"
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
            </div>

            <FormField
              control={form.control}
              name="fechaCumple"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-1">
                    <Cake className="h-3 w-3" />
                    Fecha de Cumpleaños
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-11 pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                          <Cake className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                {cliente?.id ? "Actualizar Cliente" : "Crear Cliente"}
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

function formatDropdownTipos(data) {
  return map(data, (item) => ({
    key: item._id,
    text: item.text,
    value: item.value,
  }));
}

export default FormClientes;
