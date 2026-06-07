import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { map } from "lodash";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CreditCard, DollarSign, Loader2, Receipt, User } from "lucide-react";

import { GetComodin } from "@/Hooks/useComodines";
import { CreatePagos } from "@/Hooks/usePagos";
import { liquidarOrdenes } from "@/Hooks/useOrdenes";


import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  medioPago: z.string().min(1, "Seleccione un medio de pago"),
});


const FormPagosBarberos = ({ onRefetch, idBarbero, valor, ordenesperiodo }) => {
  const [loading, setLoading] = useState(false);
  const [comodinMedioPago, setComodinMedioPago] = useState([]);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth || { userData: { tenantId: null } });

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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medioPago: "",
    },
  });

  const liquidarBarberos = async (formValue) => {
     for (const data of ordenesperiodo) {
      try {
        await liquidarOrdenes(data.id);
      } catch (error) {
        console.log("error", error);
      }
    } 
    await AddpagosBarberos(formValue);
  };

  const AddpagosBarberos = async (formValue) => {
    const payload = {
      ...formValue,
      conceptoId: "Pago Barberos",
      valor: (valor * -1).toString(),
      idusuario: idBarbero,
      tenantId: userData.tenantId,
      
    };

    console.log("formValue Addpagos", payload);
   await CreatePagos(payload); 
    toast.success("Barbero Liquidado");
  };

  async function onSubmit(data) {
    setLoading(true);
    try {
      await liquidarBarberos(data);
      onRefetch();
      navigate(`/infoOrdenes/${idBarbero}`);
    } catch (error) {
      console.log("error al guardar", error);
      toast.error("Error al liquidar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <Receipt className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Liquidar Barbero</CardTitle>
            <CardDescription>Pago del periodo activo</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-sm text-yellow-600 font-medium">Total a Pagar</p>
          <p className="text-3xl font-bold flex items-center justify-center gap-1">
            <DollarSign className="h-8 w-8" />
            <span className={valor < 0 ? "text-red-600" : "text-yellow-700"}>
              {valor < 0 ? "-" : ""}${Math.abs(valor).toFixed(2)}
            </span>
          </p>
        </div>

        <div className="bg-gray-50 border rounded-lg p-3">
          <p className="text-xs text-gray-500 text-center">
            {ordenesperiodo?.length || 0} ordenes en el periodo
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
                    defaultValue={field.value}
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
              disabled={loading || !valor}
              className="w-full bg-yellow-600 hover:bg-yellow-700"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Liquidar Barbero
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormPagosBarberos;
