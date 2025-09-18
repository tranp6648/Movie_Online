"use client"
import { Genre } from "@/type/Genre/Genre"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react"
import CustomSelect, { Option } from "../ui/CustomSelect";
import { Column, DataTable, SortState } from "../ui/table/DataTable";
import { getAll } from "@/service/api/Genre";
import Pagination from "../ui/table/Pagination";
import { Pencil } from "lucide-react";
const searchFieldOptions: Option[] = [
  { value: "", label: "Tất cả" },
  { value: "name", label: "Thể loại" },
  { value: "slug", label: "Slug" },
];

const ListGenre = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<Option | null>(searchFieldOptions[0]);
  const [sort, setSort] = useState<SortState>(null);
  const router = useRouter();
  const fetchGenres = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAll({
        page,
        size: pageSize,
        searchField: `${searchField?.value}`,
        searchValue: `${search}`
      })
      const list: Genre[] = (res?.data?.content || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      }));
      setGenres(list);
      setTotalElements(res?.data?.totalElements ?? list.length);
    } catch (e: any) {
      setError(e?.message || "Không thể tải dữ liệu");
      setGenres([]);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchGenres();
  }, [page, pageSize, sort, search, searchField]);
  const columns = useMemo<Column<Genre>[]>(() => [
    {
      key: "index",
      header: "#",
      className: "w-16 text-gray-400 text-center",
      cell: (_, rowIndex) => (page - 1) * pageSize + (rowIndex! + 1),
    },
    {
      key: 'name',
      header: "Thể loại",
      className: "min-w-[200px] font-medium"
    },
    {
      key: 'slug',
      header: 'slug',
      className: "min-w-[200px] font-medium"
    },
    { key: "created_at", header: "NGÀY TẠO", className: "w-100 text-gray-300", sortable: true },
    { key: "updated_at", header: "CẬP NHẬT LẦN CUỐI", className: "w-100 text-gray-300" },
    {
      key: "actions",
      header: "Actions",
      className: "w-20 text-center",
      cell: (row) => (
        <button
          onClick={() => router.push(`/dashboard/genre/edit/${row.id}`)}
          className="p-2 rounded-md bg-sky-600 hover:bg-sky-500 text-white"
        >
          <Pencil size={18} />
        </button>
      )
    }
  ], [page, pageSize, sort])
  return (
    <div className="min-h-screen text-white">
      <section className="w-full rounded-2xl border border-[#151f30] overflow-hidden p-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">

          {/* search field + input */}
          <div className="flex items-center gap-2">
            <div className="w-44">
              <CustomSelect
                instanceId="search-field"
                options={searchFieldOptions}
                value={searchField}
                onChange={setSearchField}
                placeholder="Chọn trường"
              />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Tìm theo ${searchField?.label.toLowerCase()}`}
              className="px-3 py-2 rounded bg-[#151821] text-sm text-white border border-[#2a2f3d] focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="ml-auto">
            <button
              onClick={() => router.push('/dashboard/admin/add')}
              className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-500 text-sm font-medium"
            >
              + Tạo mới
            </button>
          </div>
        </div>

        <DataTable<Genre>
          columns={columns}
          data={loading || error || genres.length === 0 ? [] : genres}
          sort={sort}
          onSortChange={setSort}
          caption={<div className="font-semibold">Danh sách người dùng</div>}
          className="border-0"
          loading={loading}
          error={error}
          onRowClick={(row)=>router.push(`/dashboard/genre/edit/${row.id}`)}
        />

        <Pagination
          page={page}
          pageSize={pageSize}
          total={totalElements}
          onChange={setPage}
        />
      </section>
    </div>
  )
}
export default ListGenre;