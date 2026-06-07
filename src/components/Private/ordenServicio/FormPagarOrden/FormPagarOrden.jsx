import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GetComodin } from "@/Hooks/useComodines.js";
import { CierraOrdenes } from "@/Hooks/useOrdenes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreditCard, DollarSign, Loader2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { map } from "lodash";

const formSchema = z.object({
  medioPago: z.string().min(1, "Seleccione un medio de pago"),
});

const FormPagarOrden = ({ onRefetch, idOrder, totalOrden, idBarbero }) => {
  const [loading, setLoading] = useState(false);
  const [comodinMedioPago, setComodinMedioPago] = useState([]);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medioPago: "",
    },
  });

  useEffect(() => {
    getMedioPago();
  }, []);

  const getMedioPago = async () => {
    try {
      const result = await GetComodin("medioPago");
      setComodinMedioPago(result);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDropdownMedioPago = (data) => {
    return map(data, (item) => ({
      key: item.id,
      text: item.text,
      value: item.value,
    }));
  };

  const medioPagoOptions = formatDropdownMedioPago(comodinMedioPago);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const payload = {
        ...data,
        estado: "Cerrada",
        valorOrden: totalOrden?.toString() || "0",
      };
      await CierraOrdenes(idOrder, payload);
      toast.success("Orden pagada correctamente");
      navigate(`/infoOrdenes/${idBarbero}`);
    } catch (error) {
      console.log("error al guardar", error);
      toast.error("Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <Receipt className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Resumen</CardTitle>
            <CardDescription>Total a pagar</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-sm text-green-600 font-medium">Total a Pagar</p>
          <p className="text-3xl font-bold text-green-700 flex items-center justify-center gap-1">
            <DollarSign className="h-8 w-8" />
            {totalOrden?.toFixed(2) || "0.00"}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccionar medio de pago" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medioPagoOptions.map((medio) => (
                        <SelectItem key={medio.key} value={medio.value}>
                          {medio.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading || !totalOrden}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar Pago
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormPagarOrden;