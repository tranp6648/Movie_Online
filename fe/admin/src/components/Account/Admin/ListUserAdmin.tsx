"use client"
import { Column, DataTable, SortState } from "@/components/ui/table/DataTable";
import Pagination from "@/components/ui/table/Pagination";
import { getAll } from "@/service/api/Authenticate";
import { AccountResponse } from "@/type/Account/AccountResponse";
import { useEffect, useMemo, useState } from "react";
import CustomSelect, { Option } from "@/components/ui/CustomSelect";

const genderOptions: Option[] = [
  { value: "", label: "Giới tính (Tất cả)" },
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
];

const statusOptions: Option[] = [
  { value: "", label: "Trạng thái (Tất cả)" },
  { value: "ACTIVE", label: "Hoạt động" },
  { value: "INACTIVE", label: "Chưa kích hoạt" },
  { value: "BLOCKED", label: "Bị khóa" },
];

const ListUserAdmin = () => {
  const [users, setUsers] = useState<AccountResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<Option | null>(genderOptions[0]);
  const [status, setStatus] = useState<Option | null>(statusOptions[0]);
  const [sort, setSort] = useState<SortState>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      let filters = ["role.id==1"];
      if (gender?.value) filters.push(`gender==${gender.value}`);
      if (status?.value) filters.push(`status==${status.value}`);

      const res = await getAll({
        page,
        size: pageSize,
        filter: filters.join(";"),
        sort: sort ? `${sort.key},${sort.dir}` : "id,desc",
        search: search || undefined,
      });

      const list: AccountResponse[] = (res?.data?.content || []).map((item: any) => ({
        id: item.id,
        fullName: item.fullName,
        phone: item.phone,
        birthday: item.birthday,
        email: item.email,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
        gender: item.gender === "MALE" ? "Nam" : "Nữ",
        status:
          item.status === "ACTIVE"
            ? "Hoạt động"
            : item.status === "INACTIVE"
            ? "Chưa kích hoạt"
            : item.status === "BLOCKED"
            ? "Bị khóa"
            : "Không xác định",
      }));

      setUsers(list);
      setTotalElements(res?.data?.totalElements ?? list.length);
    } catch (e: any) {
      setError(e?.message || "Không thể tải dữ liệu");
      setUsers([]);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, sort, search, gender, status]);

  const columns = useMemo<Column<AccountResponse>[]>(() => [
    {
      key: "index",
      header: "#",
      className: "w-16 text-gray-400 text-center",
      cell: (_, rowIndex) => (page - 1) * pageSize + (rowIndex! + 1),
    },
    { key: "fullName", header: "HỌ VÀ TÊN", className: "min-w-[200px] font-medium" },
    { key: "email", header: "EMAIL", className: "min-w-[200px] text-gray-300" },
    { key: "phone", header: "SỐ ĐIỆN THOẠI", className: "w-40 text-gray-300" },
    { key: "gender", header: "GIỚI TÍNH", className: "w-28 text-gray-300" },
    { key: "birthday", header: "NGÀY SINH", className: "w-32 text-gray-300" },
    {
      key: "status",
      header: "TRẠNG THÁI",
      className: "w-40",
      cell: (r) => (
        <span
          className={`px-2.5 py-1 rounded-md text-xs font-semibold
            ${r.status.includes("Hoạt động")
              ? "text-green-400 bg-green-400/10"
              : r.status.includes("Chưa")
              ? "text-yellow-400 bg-yellow-400/10"
              : "text-red-400 bg-red-400/10"}`}
        >
          {r.status}
        </span>
      ),
    },
    { key: "created_at", header: "NGÀY TẠO", className: "w-40 text-gray-300", sortable: true },
    { key: "updated_at", header: "CẬP NHẬT LẦN CUỐI", className: "w-40 text-gray-300" },
  ], [page, pageSize, sort]);

  return (
    <div className="min-h-screen text-white">
      <section className="w-full rounded-2xl border border-[#151f30] overflow-hidden p-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, email hoặc số điện thoại"
            className="px-3 py-2 rounded bg-[#151821] text-sm text-white border border-[#2a2f3d] focus:outline-none focus:ring-1 focus:ring-sky-500"
          />

          <div className="w-48">
            <CustomSelect
              instanceId="gender-select"
              options={genderOptions}
              value={gender}
              onChange={setGender}
              placeholder="Giới tính (Tất cả)"
            />
          </div>

          <div className="w-56">
            <CustomSelect
              instanceId="status-select"
              options={statusOptions}
              value={status}
              onChange={setStatus}
              placeholder="Trạng thái (Tất cả)"
            />
          </div>
        </div>

        <DataTable<AccountResponse>
          columns={columns}
          data={loading || error || users.length === 0 ? [] : users}
          sort={sort}
          onSortChange={setSort}
          caption={<div className="font-semibold">Danh sách người dùng</div>}
          className="border-0"
          loading={loading}
          error={error}
        />

        <Pagination
          page={page}
          pageSize={pageSize}
          total={totalElements}
          onChange={setPage}
        />
      </section>
    </div>
  );
};

export default ListUserAdmin;
