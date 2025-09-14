"use client";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onChange: (p: number) => void;
};

export default function Pagination({ page, pageSize, total, onChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btn = (
    label: React.ReactNode,
    disabled: boolean,
    onClick: () => void,
    key?: string
  ) => (
    <button
      key={key ?? String(label)}
      disabled={disabled}
      onClick={onClick}
      className={`px-3 h-9 rounded-md border border-transparent text-gray-300 
        hover:text-white hover:bg-[#1a1e29]
        disabled:opacity-40 disabled:hover:bg-transparent`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#111318] border-t border-[#151f30]">
      <div className="px-3 py-1 rounded-md bg-[#1a1e29] text-gray-300 text-sm">
        {Math.min(page * pageSize, total)} of {total}
      </div>

      <nav className="flex items-center gap-1 bg-[#151821] rounded-xl p-1 border border-[#151f30]">
        {btn("‹", page <= 1, () => onChange(page - 1), "prev")}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-md text-gray-300 hover:text-white hover:bg-[#1a1e29] relative
              ${p === page ? "text-sky-300 ring-2 ring-sky-500/70" : ""}`}
          >
            {p}
          </button>
        ))}
        {btn("›", page >= totalPages, () => onChange(page + 1), "next")}
      </nav>
    </div>
  );
}
