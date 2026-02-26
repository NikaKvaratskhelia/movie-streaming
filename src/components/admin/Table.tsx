type TableProps<T extends Record<string, string | unknown>> = {
  data?: T[];
  hiddenKeys?: (keyof T)[];
  primaryKey?: keyof T;
  onDelete?: (id: string | number) => void;
};

function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (s) => s.toUpperCase());
}

export function DynamicTable<T extends Record<string, string | unknown>>({
  data,
  hiddenKeys = [],
  primaryKey,
  onDelete,
}: TableProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded border border-neutral-800 bg-neutral-950 px-10 py-12 text-center text-xs uppercase tracking-widest text-neutral-700">
        — No data available —
      </div>
    );
  }

  const firstRow = data[0];
  if (!firstRow) return null;
  console.log(data);

  const headers = (Object.keys(firstRow) as (keyof T)[]).filter(
    (key) => !hiddenKeys.includes(key),
  );

  return (
    <div className="overflow-hidden rounded border border-neutral-800 bg-neutral-950 shadow-xl shadow-black/40 text-white max-w-300 mx-auto mt-10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-800 bg-neutral-900">
              <th className="w-10 border-r border-neutral-800 px-4 py-3" />

              {headers.map((key) => {
                const isNum = typeof data[0]?.[key] === "number";
                return (
                  <th
                    key={String(key)}
                    className={`whitespace-nowrap px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500 ${
                      isNum ? "text-right" : "text-left"
                    }`}
                  >
                    {formatKey(String(key))}
                  </th>
                );
              })}

              {onDelete && <th className="w-10 px-3 py-3" />}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="group border-b border-neutral-800/60 transition-colors last:border-0 hover:bg-neutral-900/60"
              >
                <td className="select-none border-r border-neutral-800/60 px-4 py-3.5 text-right text-xs tabular-nums text-neutral-700">
                  {rowIndex + 1}
                </td>

                {headers.map((key) => {
                  const value = row[key];
                  const isPrimary = primaryKey === key;
                  const isNumber = typeof value === "number";
                  const display =
                    typeof value === "string" && value.length > 70
                      ? value.slice(0, 70) + "…"
                      : String(value ?? "—");

                  return (
                    <td
                      key={String(key)}
                      className={`whitespace-nowrap px-5 py-3.5 align-middle ${
                        isNumber
                          ? "text-right tabular-nums font-normal text-emerald-500/80"
                          : isPrimary
                            ? "font-medium text-neutral-100"
                            : "font-light text-neutral-400"
                      }`}
                    >
                      {isPrimary ? (
                        <span className="inline-block rounded-sm bg-neutral-100 px-2 py-0.5 text-xs text-neutral-900">
                          {display}
                        </span>
                      ) : (
                        display
                      )}
                    </td>
                  );
                })}

                {onDelete && (
                  <td className="px-3 py-3.5 text-center align-middle">
                    <button
                      onClick={() => onDelete(row.id as string)}
                      title="Delete row"
                      aria-label="Delete row"
                      className="inline-flex h-7 w-7 items-center justify-center rounded opacity-100 transition-all hover:scale-110 hover:bg-red-950 active:scale-95 cursor-pointer"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </button>
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
