import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, AlertCircle } from "lucide-react";

const SuperConfigPage = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Configuración</h1>
        <p className="text-zinc-500">Configuraciones generales del sistema</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración General
          </CardTitle>
          <CardDescription>
            Las opciones de configuración se habilitarán en futuras actualizaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-amber-700">
              Esta sección está en desarrollo. Próximamente podrás configurar
              opciones como: métodos de pago, plantillas de facturación,
              integraciones y más.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperConfigPage;