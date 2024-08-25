import { formatCurrency } from "@/utils";
import { ColumnDef } from "@tanstack/react-table"

export interface FormasiType {
  formasi_id: string;
  ins_nm: string;
  jp_nama: string;
  formasi_nm: string;
  jabatan_nm: string;
  lokasi_nm: string;
  jumlah_formasi: number;
  disable: number;
  gaji_min: string;
  gaji_max: string;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export interface Sort {
  sortBy: string;
  sortOrder: string;
}

export interface Response {
  data: FormasiType[];
  pagination: Pagination;
  sort: Sort;
  search: string;
}

export const columns: ColumnDef<FormasiType>[] = [
  {
    accessorKey: "ins_nm",
    header: () => <div className="font-bold text-white">Instansi</div>,
    enableSorting: false,
  },
  {
    accessorKey: "jp_nama",
    header: () => <div className="font-bold text-white">Jalur</div>,
    enableSorting: false,


  },
  {
    accessorKey: "formasi_nm",
    header: () => <div className="font-bold text-white">Formasi</div>,
    enableSorting: false,
  },
  {
    accessorKey: "jabatan_nm",
    header: () => <div className="font-bold text-white">Jabatan</div>,
    enableSorting: false,
  },
  {
    accessorKey: "lokasi_nm",
    header: () => <div className="font-bold text-white">Lokasi</div>,
    enableSorting: false,
  },
  {
    accessorKey: "jumlah_formasi",
    header: () => <div className="font-bold text-white"
      onClick={() => console.log('clicked')}
    >Jumlah Kebutuhan</div>,
    enableSorting: true,
  },
  {
    accessorKey: "gaji_min",
    header: () => <div className="font-bold text-white">Gaji Min</div>,
    cell: ({ row }) => {
      return formatCurrency(Number(row.original.gaji_min));
    },
    enableSorting: true,

  },
  {
    accessorKey: "gaji_max",
    header: () => <div className="font-bold text-white">Gaji Max</div>,
    cell: ({ row }) => {
      return formatCurrency(Number(row.original.gaji_max));
    },
    enableSorting: true,
  },
  {
    accessorKey: "formasi_id",
    header: () => <div className="font-bold text-white">Action</div>,
    cell: ({ row }) => {
      return (
        <a target="_blank" rel="noreferrer nofollow" href={`https://sscasn.bkn.go.id/detailformasi/${row.original.formasi_id}`} className="text-blue-500 underline flex gap-1 items-center">Detail <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-external-link"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg></a>
      );
    },
    enableSorting: true,
  },
  // {
  //   accessorKey: "created_at",
  //   header: () => <div className="font-bold text-white">Created At</div>,
  //   cell: ({ row }) => {
  //     return formatDateWithOffset(row.original.created_at);
  //   }
  // },
  // {
  //   accessorKey: "updated_at",
  //   header: () => <div className="font-bold text-white">Updated At</div>,
  //   cell: ({ row }) => {
  //     return formatDateWithOffset(row.original.updated_at);
  //   }
  // }
]
