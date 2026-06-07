import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { map } from "lodash";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CreditCard, DollarSign, User, Receipt, Loader2 } from "lucide-react";

import { GetComodin } from "@/Hooks/useComodines";
import { GetUsuarios } from "@/Hooks/useUsuarios";
import { CreatePagos, UpdatePagos } from "@/Hooks/usePagos";

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

const FormPagos = ({ onRefetch, pago }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.auth || { userData: { tenantId: null } });

  const [comodinUsuario, setComodinUsuario] = useState([]);
  const [usuario, setUsuario] = useState([]);

  const [comodinConcepto, setComodinConcepto] = useState([]);
  const [conceptoPagos, setConceptoPagos] = useState([]);

  const [medioPago, setMedioPago] = useState([]);
  const [comodinMedioPago, setComodinMedioPago] = useState([]);

  useEffect(() => {
    getMedioPago();
    getConceptoPago();
    getUsuario();
  }, []);

  useEffect(() => {
    setMedioPago(formatDropdownMedioPago(comodinMedioPago));
  }, [comodinMedioPago]);

  useEffect(() => {
    setConceptoPagos(formatDropdownConcepto(comodinConcepto));
  }, [comodinConcepto]);

  useEffect(() => {
    setUsuario(formatDropdownUsuario(comodinUsuario));
  }, [comodinUsuario]);

  const getMedioPago = async () => {
    try {
      const result = await GetComodin("medioPago");
      setComodinMedioPago(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getConceptoPago = async () => {
    try {
      const result = await GetComodin("ConceptosPagos");
      setComodinConcepto(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsuario = async () => {
    try {
      const result = await GetUsuarios();
      setComodinUsuario(result);
    } catch (error) {
      console.log(error);
    }
  };

  const formSchema = z.object({
    medioPago: z
      .string()
      .min(1, { message: "Debe seleccionar el medio del pago" }),
    conceptoId: z
      .string()
      .min(1, { message: "Debe seleccionar el concepto del pago" }),
    valor: z.string().min(1, { message: "El valor debe ser mayor que 0" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conceptoId: pago?.conceptoId || "",
      valor: pago?.valor || "",
      medioPago: pago?.medioPago || "",
      idusuario: pago?.idusuario || "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const payload = {
        medioPago: data.medioPago,
        conceptoId: data.conceptoId,
        valor: data.valor,
        idusuario: data.idusuario || null,
        tenantId: userData.tenantId,
      };

      /*  if (data.idusuario) {
        payload.idusuario = data.idusuario;
      } */

      !pago?.id
        ? await CreatePagos(payload)
        : await UpdatePagos(pago.id, payload);
      toast.success(
        pago?.id
          ? "Pago actualizado correctamente"
          : "Pago creado correctamente",
      );
      onRefetch?.();
      navigate("/pagos");
    } catch (error) {
      console.log("error al guardar", error);
      toast.error("Error al guardar el pago");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <Receipt className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <CardTitle className="text-xl">
              {pago?.id ? "Editar Pago" : "Nuevo Pago"}
            </CardTitle>
            <CardDescription>
              {pago?.id
                ? "Actualice los datos del pago"
                : "Complete los datos para registrar un pago"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="conceptoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Receipt className="h-3 w-3" />
                    Concepto
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccione concepto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {conceptoPagos.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.text}
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
              name="idusuario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Destinatario
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccione destinatario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {usuario.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.text}
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
              name="medioPago"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    Medio de Pago
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccione medio de pago" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medioPago.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.text}
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
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Valor
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  {pago?.id ? "Actualizar Pago" : "Registrar Pago"}
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

function formatDropdownConcepto(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.text,
    value: item.value,
  }));
}

function formatDropdownMedioPago(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.text,
    value: item.value,
  }));
}

function formatDropdownUsuario(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.nombres + " " + item.apellidos,
    value: item.id,
  }));
}

export default FormPagos;
