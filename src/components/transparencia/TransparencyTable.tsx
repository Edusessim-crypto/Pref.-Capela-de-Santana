import type { ReactNode } from "react";

export interface TransparencyColumn<T> {
  key: string;
  header: string;
  accessor: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  emphasis?: boolean;
}

export interface TransparencyTableProps<T> {
  columns: TransparencyColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  caption?: string;
  captionVisible?: boolean;
  emptyMessage?: string;
}

const ALIGN_CLASSES: Record<NonNullable<TransparencyColumn<unknown>["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export default function TransparencyTable<T>({
  columns,
  data,
  rowKey,
  caption,
  captionVisible = false,
  emptyMessage = "Nenhum registro encontrado.",
}: TransparencyTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-12 text-center text-sm text-neutral-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-neutral-200 md:block">
        <table className="w-full border-collapse text-sm">
          {caption ? (
            <caption className={captionVisible ? "px-4 py-3 text-left text-sm text-neutral-600" : "sr-only"}>
              {caption}
            </caption>
          ) : null}
          <thead>
            <tr className="bg-neutral-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-4 py-3 font-semibold text-neutral-700 ${ALIGN_CLASSES[column.align ?? "left"]}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={rowKey(row)} className="even:bg-neutral-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 text-neutral-700 ${ALIGN_CLASSES[column.align ?? "left"]} ${
                      column.emphasis ? "font-semibold text-neutral-900" : ""
                    }`}
                  >
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 md:hidden">
        {data.map((row) => (
          <li
            key={rowKey(row)}
            className="rounded-xl border border-neutral-200 bg-neutral-0 p-4 shadow-soft"
          >
            <dl className="flex flex-col gap-2">
              {columns.map((column) => (
                <div key={column.key} className="flex flex-col gap-0.5">
                  <dt className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    {column.header}
                  </dt>
                  <dd
                    className={`text-sm text-neutral-800 ${column.emphasis ? "font-semibold text-neutral-900" : ""}`}
                  >
                    {column.accessor(row)}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
