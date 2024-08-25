import { useEffect, useState, useRef } from "react"
import { columns, Response } from "./columns"
import { DataTable } from "./data-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatDateWithOffset } from "@/utils"


export default function Formasi() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [response, setResponse] = useState<Response | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState({
    sortBy: "created_at",
    sortOrder: "desc",
    search: "",
    page: 1,
    limit: 10
  })

  const params = new URLSearchParams({
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
    search: query.search,
    page: query.page?.toString(),
    limit: query.limit?.toString(),
  });

  useEffect(() => {
    setIsLoadingPage(true)
    fetch(`${apiUrl}/formasi?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => setResponse(data))
      .finally(() => {
        setIsLoading(false)
        setIsLoadingPage(false)
      })
  }, [query])

  return (
    <div className="container mx-auto py-10 bg-stone-900 text-white">
      <h1 className="text-3xl font-bold mb-5 text-center tracking-wide">Formasi SSCASN</h1>
      <p className="text-center text-white mb-4 text-sm">
        Data formasi diambil dari <a className="underline italic" href="https://sscasn.bkn.go.id/" target="_blank" rel="noreferrer">sscasn.bkn.go.id</a> dan diupdate setiap tiga jam sekali.
        Terakhir diambil pada {
          formatDateWithOffset(response?.data[0].updated_at ?? "", 0)
        } WIB. <br />
        Mention tweet ke <a className="underline italic" href="https://twitter.com/mrayhanfadil" target="_blank" rel="noreferrer">@mrayhanfadil</a> untuk request program studi lainnya.
      </p>

      <div className="flex w-full items-center space-x-2 mb-5 text-black">
        <Input ref={inputRef} type="text" placeholder="Cari berdasarkan jabatan" />
        {
          query.search && (
            <Button variant='destructive' onClick={() => {
              setQuery((prev) => ({ ...prev, page: 1, search: "" }))
              inputRef.current!.value = ""
            }}>Clear</Button>
          )
        }
        <Button type="submit" variant='secondary' onClick={() => {
          setQuery((prev) => ({ ...prev, page: 1, search: inputRef.current!.value }))
        }}>Search</Button>
      </div>
      {
        isLoading ? (
          <div className=" w-full text-white text-center font-bold animate-bounce">Loading...</div>
        ) : (
          <>
            <p className="text-right text-white text-sm">
              <span className="font-bold">
                Klik header kolom {' '}
              </span>
              untuk mengurutkan data gaji min, gaji max, dan jumlah kebutuhan.
            </p>
            <DataTable
              columns={columns}
              data={response?.data ?? []}
              pagination={response?.pagination}
              onNextPage={() => setQuery((prev) => ({ ...prev, page: prev.page + 1 }))}
              onPrevPage={() => setQuery((prev) => ({ ...prev, page: prev.page - 1 }))}
              loading={isLoadingPage}
              onSort={(sortBy, sortOrder) => setQuery((prev) => ({ ...prev, page: 1, sortBy, sortOrder }))}
              query={query}
            />
          </>
        )
      }
    </div>
  )
}
