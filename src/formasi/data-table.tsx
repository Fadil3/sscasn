import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pagination } from "./columns"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination?: Pagination,
  onNextPage?: () => void,
  onPrevPage?: () => void,
  loading?: boolean,
  onSort?: (sortBy: string, sortOrder: string) => void,
  query?: {
    sortBy: string,
    sortOrder: string,
    search: string,
    page: number,
    limit: number,
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onNextPage,
  onPrevPage,
  loading,
  onSort,
  query,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pagination?.totalCount,
    pageCount: pagination?.totalPages,
    autoResetPageIndex: true,
  })

  const sortingIcons: { [key: string]: JSX.Element } = {
    asc: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M18 11l-6 -6" />
        <path d="M6 11l6 -6" />
      </svg>
    ),
    desc: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-down"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M18 13l-6 6" />
        <path d="M6 13l6 6" />
      </svg>
    ),
  };

  return (
    <div className="relative">
      <div className="rounded-md border">
        {loading && (
          <div className=" z-10 rounded-md absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 min-h-screen min-w-full">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-1'
                            : '',
                          // onClick: header.column.getToggleSortingHandler(),
                          onClick: () => {
                            header.column.getToggleSortingHandler()
                            // Call the onSort callback with the appropriate parameters
                            onSort?.(
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore
                              header.column.columnDef.accessorKey,
                              query?.sortOrder === 'asc' ? 'desc' : 'asc'
                            );
                          },
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          header.column.columnDef.accessorKey === query?.sortBy && (
                            sortingIcons[query?.sortOrder as 'asc' | 'desc'] ?? null
                          )
                        }
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 text-white">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {pagination?.currentPage.toLocaleString()} of {pagination?.totalPages.toLocaleString()}
          </strong>
        </span>
        <Button
          variant='secondary'
          size="sm"
          onClick={onPrevPage}
          disabled={
            pagination?.currentPage === 1
          }
        >
          Previous
        </Button>
        <Button
          variant='secondary'
          size="sm"
          onClick={onNextPage}
          disabled={
            pagination?.currentPage === pagination?.totalPages
          }
        >
          Next
        </Button>
      </div>
    </div >
  )
}
