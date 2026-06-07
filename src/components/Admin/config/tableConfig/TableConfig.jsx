import React, { useState, useMemo } from "react";
import { Settings, Hash } from "lucide-react";
import { ModernTable } from "@/components/ui/Modern/ModernTable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const columns = [
  {
    key: "comodin",
    label: "Tipo",
    render: (item) => (
      <Badge variant="outline" className="bg-gray-50">
        {item.comodin}
      </Badge>
    ),
  },
  {
    key: "text",
    label: "Texto",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Settings className="h-4 w-4 text-blue-600" />
        </div>
        <span className="font-medium">{item.text}</span>
      </div>
    ),
  },
  {
    key: "value",
    label: "Valor",
    render: (item) => (
      <div className="flex items-center gap-1 font-mono text-sm">
        <Hash className="h-4 w-4 text-gray-400" />
        {item.value}
      </div>
    ),
  },
];

const TableConfig = ({ configs, onEdit, onToggle }) => {
  const [activeTab, setActiveTab] = useState("all");

  const groupedConfigs = useMemo(() => {
    const groups = {};
    configs.forEach((config) => {
      const key = config.comodin || "Sin Tipo";
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(config);
    });
    return groups;
  }, [configs]);

  const uniqueTypes = useMemo(() => {
    return [...new Set(configs.map((c) => c.comodin).filter(Boolean))];
  }, [configs]);

  const handleDelete = (item) => {
    console.log("Delete config", item);
  };

  const renderTable = (data) => (
    <ModernTable
      data={data}
      columns={columns}
      onEdit={onEdit}
      onDelete={handleDelete}
      onToggle={onToggle}
      emptyMessage="No hay configuraciones registradas"
    />
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">Todos</TabsTrigger>
        {uniqueTypes.map((type) => (
          <TabsTrigger key={type} value={type}>
            {type}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all" className="mt-4">
        {renderTable(configs)}
      </TabsContent>

      {uniqueTypes.map((type) => (
        <TabsContent key={type} value={type} className="mt-4">
          {renderTable(groupedConfigs[type] || [])}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TableConfig;