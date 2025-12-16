import {prepareProducts} from '../helpers/index'
import {allCelulares} from '../data/initialData'
import { CardProduct } from '../components/Products/CardProduct'
import { ContainerFilter } from '../components/Products/ContainerFilter'

export const CellPhones = () => {

  const prepareAllProducts = prepareProducts(allCelulares)

  return (
    <>
      <h1 className="text-5xl font-semibold text-center mb-12">Celulcares</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Filtros */}
        <ContainerFilter />

        <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
          <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
            {
              prepareAllProducts.map((product) => (
                <CardProduct key={product.id} name={product.name} price={product.price} colors={product.colors} img={product.images} slug={product.slug} variants={product.variants} />
              ))
            }
          </div>

          {/*TODO: Paginacion */}

        </div>

      </div>
    </>
  )
}