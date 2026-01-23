import { CardProduct } from "../Products/CardProduct"

export const ProductGrid = ({title, products}) => {
  return (
    <div className="my-32 ">
        <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
            {title}
        </h2>

        <div className="grid grid-cols-2 gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {
                products.map(product => (
                    <div className="flex flex-col gap-6 relative" key={product.id}>
                        <CardProduct key={product.id} name={product.name} price={product.price} colors={product.colors} img={product.images} slug={product.slug} variants={product.variants} />
                    </div>
                ))
            }
        </div>  
    </div>
  )
}