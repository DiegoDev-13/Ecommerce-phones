import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useProducts } from "../../../hooks/products/useProducts";
import { Loader } from '../../shared/Loader'
import { formatDateShort, formatPrice } from "../../../helpers";
import { Pagination } from "../../shared/Pagination";
import { CellTableProduct } from "./CellTableProduct";
import { useDeleteProduct } from "../../../hooks/products/useDeleteProduct";

const tableHeaders = [
  '',
  'Nombre',
  'Variante',
  'Precio',
  'Stock',
  'Fecha de creación',
  ''
]

export const TableProducts = () => {

  const [openMenuIndex, setOpenMenuIndex] = useState(null)
  const [page, setPage] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState({})

  const {products, totalProducts, isLoading} = useProducts({page})

  const {mutate, isPending} = useDeleteProduct()

  const handleDeleteProduct = (id) => {
    mutate(id)
    setOpenMenuIndex(null)
  }

  const handleVariantChange = (productId, variantIndex) => {
    setSelectedVariants({...selectedVariants, [productId]: variantIndex})
  }

  const handleMenuTogle = (index) => {
    if(openMenuIndex === index) {
      setOpenMenuIndex(null)
    } else {
      setOpenMenuIndex(index)
    }
  }

  if(isLoading || !products || !totalProducts || isPending) return <Loader />

  return (
    <div className="flex flex-col flex-1 border border-slate-200 rounded-lg p-5 bg-white">
        <h2 className="font-bold text-xl">
          Productos
        </h2>

        <p className="text-sm mt-1 mb-8 text-gray-500 ">
          Gestiona tus productos y mira las estadísticas de tus ventas
        </p>

        <div className="relative w-full h-full">
          <table className="text-sm w-full caption-bottom overflow-auto">
            <thead className="border-b border-t-gray-200 pb-3">
              <tr className="text-sm font-bold">
                {
                  tableHeaders.map((item, index) => (
                    <th key={index} className="h-12 px-4 text-left">
                      {item}
                    </th>
                  ))
                }
              </tr>
            </thead>

            <tbody>
              {
                products.map((product, index) => {

                  const seletedVariantIndex = selectedVariants[product.id] ?? 0
                  const seletedVariant = product.variants[seletedVariantIndex] || {}

                  return (
                    <tr key={product.id}>
                      <td className="p-4 align-middle sm:table-cell">
                        <img src={product.images[0]} alt="Imagen Product" loading="lazy" decoding="async" className="w-16 h-16 aspect-square rounded-md object-contain" />
                      </td>
                      <CellTableProduct content={product.name} />
                      <td className="p-4 font-medium tracking-tighter">
                        <select className="border border-gray-300 rounded-md p-1 w-full" onChange={e => handleVariantChange(product.id, Number(e.target.value))} value={seletedVariantIndex}>
                          {
                            product.variants.map((variant, variantIndex) => (
                              <option key={variant.id} value={variantIndex}>
                                {variant.color_name} - {variant.storage}
                              </option>
                            ))
                          }
                        </select>
                      </td>
                      <CellTableProduct content={formatPrice(seletedVariant?.price)} />
                      <CellTableProduct content={seletedVariant.stock || 0} />
                      <CellTableProduct content={formatDateShort(product.created_at)} />
                      <td className="relative" onClick={() => handleMenuTogle(index)}>
                        <button className="text-slate-900 cursor-pointer">
                          <FaEllipsis />
                        </button>
                        {
                          openMenuIndex === index && (
                            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-xl z-10 w-30" role="menu">
                              <Link to={`/dashboard/products/edit/${product.slug}`} className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100">
                                Editar
                                <HiOutlineExternalLink size={13} className="inline-block" />
                              </Link>
                              <button className="block w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleDeleteProduct(product.id)}>
                                Eliminar

                              </button>
                            </div>
                          )
                        }
                      </td>
                      
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        {/* Paginacion  */}
        <Pagination totalItems={totalProducts} page={page} setPage={setPage} />
    </div>
  )
}