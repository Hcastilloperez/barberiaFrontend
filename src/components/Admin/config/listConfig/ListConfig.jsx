import React from "react";
import { Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ListConfig = ({ configs, onEdit }) => {
  const groupedConfigs = configs.reduce((acc, config) => {
    const key = config.comodin;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(config);
    return acc;
  }, {});

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(groupedConfigs).map(([type, items]) => (
        <Card key={type} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Settings className="h-4 w-4 text-yellow-600" />
              </div>
              <Badge variant="outline" className="ml-auto">
                {items.length}
              </Badge>
              {type}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {items.map((config) => (
              <div
                key={config.id}
                onClick={() => onEdit(config)}
                className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{config.text}</span>
                  <span className="text-xs text-gray-500 font-mono">
                    {config.value}
                  </span>
                </div>
                {config.estado === "Activa" ? (
                  <ToggleRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ToggleLeft className="h-5 w-5 text-gray-400" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListConfig;