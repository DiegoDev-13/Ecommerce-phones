export const Pagination = ({totalItems, page, setPage}) => {

    const handleNexPage = () => {
        setPage(page + 1)
    }

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1))
    }

    const itemsPerPage = 10
    const totalPage = totalItems ? Math.ceil(totalItems / itemsPerPage) : 1
    const isLastpage = page >= totalPage

    const startItem = (page - 1) * itemsPerPage + 1
    const endItem = Math.min(page * itemsPerPage, totalItems)

  return (
    <div className="flex justify-between items-center">
        <p className="text-xs font-medium">
            Mostrando <span className="font-bold">
                {startItem} - {endItem}
            </span> de <span className="font-bold">{totalItems}</span> productos
        </p>

        <div className="flex gap-3">
            <button className={`btn-paginated ${isLastpage ? 'cursor-pointer' : ''}`} onClick={handlePrevPage} disabled={page === 1} >Anterior</button>

            <button className={`btn-paginated ${isLastpage ? '' : 'cursor-pointer'}`} onClick={handleNexPage} disabled={isLastpage}>Siguiente</button>
        </div>
    </div>
  )
}