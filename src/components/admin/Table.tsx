type TableProps<T extends Record<string, unknown>> = {
  data: T[];
  hiddenKeys: (keyof T)[];
  onDelete?: (id: string | number) => void;
};

function formatKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (s) => s.toUpperCase());
}

export function DynamicTable<
  T extends { id?: string | number } & Record<string, unknown>,
>({ data, hiddenKeys = [], onDelete }: TableProps<T>) {


  
  if (!data || data.length === 0) {
    return (
      <div className="rounded border border-neutral-800 bg-neutral-950 px-6 py-10 text-center text-xs uppercase tracking-widest text-neutral-600 mt-8">
        — No data available —
      </div>
    );
  }

  const firstRow = data[0];
  if (!firstRow) return null;

  const headers = (Object.keys(firstRow) as (keyof T)[]).filter(
    (key) => !hiddenKeys.includes(key),
  );

  return (
    <div className="w-full mt-8 max-w-300 mx-auto">
      <div className="w-full overflow-x-auto rounded-xl bg-neutral-950 shadow-xl shadow-black/40">
        <table className="min-w-160 w-full border-collapse text-sm text-white">
          <thead className="bg-neutral-900">
            <tr className="border-b border-neutral-800">
              <th className="w-12 border-r border-neutral-800 px-4 py-3 text-xs text-neutral-500" />

              {headers.map((key) => {
                return (
                  <th
                    key={String(key)}
                    className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 text-center`}
                  >
                    {formatKey(String(key))}
                  </th>
                );
              })}

              {onDelete && <th className="w-14 px-3 py-3" />}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row.id ?? rowIndex}
                className="border-b border-neutral-800/60 transition-colors hover:bg-neutral-900/60 last:border-0"
              >
                <td className="border-r text-center border-neutral-800/60 px-4 py-3 text-xs text-neutral-600 tabular-nums">
                  {rowIndex + 1}
                </td>

                {headers.map((key) => {
                  const value = row[key];

                  const display =
                    typeof value === "string" && value.length > 70
                      ? value.slice(0, 70) + "…"
                      : String(value ?? "—");


                  return (
                    <td
                      key={String(key)}
                      className={`px-5 py-3 align-middle text-center`}
                    >
                      <div className="max-w-70 truncate">{display}</div>
                    </td>
                  );
                })}

                {onDelete && (
                  <td className="px-3 py-3 text-center">
                    <button
                      onClick={() => row.id && onDelete?.(row.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-red-950 hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Delete row"
                    >
                      <svg
                        width="16"
                        height="16"
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
