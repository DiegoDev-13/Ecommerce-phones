import { TableOrdersAdmin } from "../../components/dashboard/orders/TableOrdersAdmin"
import { useAllOrders } from "../../hooks/orders/useAllOrders"
import {Loader} from '../../components/shared/Loader'

export const DashboardOrdersPage = () => {

    const {data, isLoading} = useAllOrders()

    if(isLoading || !data) return <Loader />
 
  return (
    <div className="space-y-5">
        <h1 className="text-2xl font-bold">
            Órdenes
        </h1>

        <TableOrdersAdmin orders={data} />
    </div>
  )
}