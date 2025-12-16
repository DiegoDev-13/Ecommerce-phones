import { Brands } from "../components/home/Brands"
import { FeatureGrid } from "../components/home/FeatureGrid"
import { ProductGrid } from "../components/home/ProductGrid"
import { popularCelulares, recentCelulares } from "../data/initialData"
import { prepareProducts } from "../helpers"

export const Home = () => {

  const prepareRecentProducts = prepareProducts(recentCelulares)
  const preparePopularProducts = prepareProducts(popularCelulares)

  return (
    <div className="">
        <FeatureGrid />

        <ProductGrid title="Nuevos Productos" products={prepareRecentProducts}/>

        <ProductGrid title="Productos Destacados" products={preparePopularProducts}/>

        <Brands />
    </div>
  )
}