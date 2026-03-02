import { Plus, Pencil, Trash2, Eye } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function Table<T extends { id: number | string }>({
  title,
  data,
  columns,
  onAdd,
  onView,
  onEdit,
  onDelete,
}: TableProps<T>) {
  return (
    <div className="space-y-4 max-w-7xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center justify-center rounded-lg px-3 py-1 bg-red-600 text-primary-foreground hover:bg-red-600/90 gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New
          </button>
        )}
      </div>
      <div className="border-[#737b8c]/50 border rounded-xl overflow-hidden">
        <table className="w-full bg-[#14161c]">
          <thead>
            <tr className="border-b border-b-[#737b8c]/50 hover:bg-transparent">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`text-sm text-[#737b8c] font-medium p-4 text-left ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="w-32">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-white/30 hover:bg-[#1a1e26]/50 transition-all duration-500 px-4 text-left"
              >
                {columns.map((col, i) => (
                  <td key={i} className={`${col.className} px-4 py-2 text-sm`}>
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : String(row[col.accessor] ?? "")}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td>
                    <div className="flex gap-1">
                      {onView && (
                        <button
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => onView(row)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => onEdit(row)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => onDelete(row)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
