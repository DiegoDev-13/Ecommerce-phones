import { Link } from "react-router-dom"
import { IoAddCircleOutline } from "react-icons/io5";
import { TableProducts } from "../../components/dashboard/products/TableProducts";

export const DashboardProductsPage = () => {
  return (
    <div className="h-full flex flex-col gap-3">
        <Link to='/dashboard/products/new' className="bg-black text-white flex items-center self-end py-1.5 px-2 rounded-md text-sm gap-1 font-semibold ">
          <IoAddCircleOutline size={20} className="inline-block" />
          Nuevo Producto
        </Link>

        <TableProducts />
    </div>
  )
}