import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

import { updatePass } from "@/Hooks/useUsuarios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  clave: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no puede exceder 50 caracteres" }),
  clave2: z.string(),
}).refine((data) => data.clave === data.clave2, {
  message: "Las contraseñas no coinciden",
  path: ["clave2"],
});

const FormCambioPass = ({ idUsuario, onRefetch }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clave: "",
      clave2: "",
    },
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      await updatePass(idUsuario, data);
      toast.success("Contraseña actualizada correctamente");
      onRefetch?.();
      navigate("/perfil");
    } catch (error) {
      console.log("error al guardar", error);
      toast.error("Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mx-auto mb-2">
          <Lock className="h-6 w-6 text-yellow-600" />
        </div>
        <CardTitle className="text-xl text-center">Cambiar Contraseña</CardTitle>
        <CardDescription className="text-center">
          Ingrese su nueva contraseña
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clave"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Nueva Contraseña
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingrese nueva contraseña"
                        {...field}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clave2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Confirmar Contraseña
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword2 ? "text" : "password"}
                        placeholder="Repita la contraseña"
                        {...field}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword2(!showPassword2)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword2 ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
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
                  Cambiando...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Cambiar Contraseña
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormCambioPass;