import React from "react";
import { Play, Pause, Pencil, Trash2, Eye, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const StatusBadge = ({ status, activeText = "Activo", inactiveText = "Inactivo" }) => {
  const isActive = status === "Activa" || status === "Activo" || status === true;
  return (
    <Badge variant={isActive ? "success" : "secondary"}>
      {isActive ? activeText : inactiveText}
    </Badge>
  );
};

export const ActionsCell = ({ 
  item, 
  onEdit, 
  onDelete, 
  onToggle, 
  toggleField = "estado",
  toggleActiveValue = "Activa",
  editLabel = "Editar",
  deleteLabel = "Eliminar",
  showEdit = true,
  showDelete = true,
  showToggle = true,
}) => {
  const isActive = item[toggleField] === toggleActiveValue;
  
  return (
    <div className="flex items-center gap-2">
      {showToggle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(item)}
          className="hover:bg-yellow-100"
        >
          {isActive ? (
            <Pause className="h-4 w-4 text-yellow-600" />
          ) : (
            <Play className="h-4 w-4 text-green-600" />
          )}
        </Button>
      )}
      {showEdit && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(item)}
          className="hover:bg-blue-100"
        >
          <Pencil className="h-4 w-4 text-blue-600" />
        </Button>
      )}
      {showDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item)}
          className="hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      )}
    </div>
  );
};

export const ActionsMenu = ({
  item,
  onEdit,
  onDelete,
  onToggle,
  onView,
  toggleField = "estado",
  toggleActiveValue = "Activa",
}) => {
  const isActive = item[toggleField] === toggleActiveValue;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {onView && (
          <DropdownMenuItem onClick={() => onView(item)}>
            <Eye className="mr-2 h-4 w-4" />
            Ver Detalles
          </DropdownMenuItem>
        )}
        {onToggle && (
          <DropdownMenuItem onClick={() => onToggle(item)}>
            {isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4 text-yellow-600" />
                Desactivar
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4 text-green-600" />
                Activar
              </>
            )}
          </DropdownMenuItem>
        )}
        {onEdit && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(item)}>
              <Pencil className="mr-2 h-4 w-4 text-blue-600" />
              {editLabel || "Editar"}
            </DropdownMenuItem>
          </>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(item)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              {deleteLabel || "Eliminar"}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default {
  StatusBadge,
  ActionsCell,
  ActionsMenu,
};