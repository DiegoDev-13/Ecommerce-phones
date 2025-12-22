import { Brands } from "../components/home/Brands"
import { FeatureGrid } from "../components/home/FeatureGrid"
import { ProductGrid } from "../components/home/ProductGrid"
import { ProductGridSkeleton } from "../components/skeletons/ProductGridSkeleton"
import { prepareProducts } from "../helpers"
import { useHomeProducts } from "../hooks/products/useHomeProducts"

export const Home = () => {

  const {recentProductsResult, popularProductsResult, isLoading} = useHomeProducts()

  const prepareRecentProducts = prepareProducts(recentProductsResult)
  const preparePopularProducts = prepareProducts(popularProductsResult)

  return (
    <div className="">
        <FeatureGrid />

        {
          isLoading ? (
            <ProductGridSkeleton numberOfProducts={4} />
          ) : (
            <ProductGrid title="Nuevos Productos" products={prepareRecentProducts}/>
          )
        }

        {
          isLoading ? (
            <ProductGridSkeleton numberOfProducts={4} />
          ) : (
            <ProductGrid title="Productos Destacados" products={preparePopularProducts}/>
          )
        }



        <Brands />
    </div>
  )
}