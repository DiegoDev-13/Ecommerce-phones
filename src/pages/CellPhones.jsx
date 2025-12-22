import {prepareProducts} from '../helpers/index'
import { CardProduct } from '../components/Products/CardProduct'
import { ContainerFilter } from '../components/Products/ContainerFilter'
import { useFilteredProducts } from '../hooks/products/useFilteredProducts'
import { useState } from 'react'
import { Pagination } from '../components/shared/Pagination'

export const CellPhones = () => {

  const [page, setPage] = useState(1)
  const [selectedBrands, setSelectedBrands] = useState([])

  const {data: products = [], isLoading, totalProducts} = useFilteredProducts({page, brands: selectedBrands})

  const prepareAllProducts = prepareProducts(products)

  return (
    <>
      <h1 className="text-5xl font-semibold text-center mb-12">Celulcares</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Filtros */}
        <ContainerFilter selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} />

        {
          isLoading ? (
            <div className="col-span-2 flex items-center justify-center h-125">
              <p className='text-2xl'>Cargando...</p>
            </div>
          ) : (
            <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
              <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
                {
                  prepareAllProducts.map((product) => (
                    <CardProduct key={product.id} name={product.name} price={product.price} colors={product.colors} img={product.images} slug={product.slug} variants={product.variants} />
                  ))
                }
              </div>

              {/*TODO: Paginacion */}
              <Pagination totalItems={totalProducts} page={page} setPage={setPage}/>

            </div>
          )
        }

        

      </div>
    </>
  )
}