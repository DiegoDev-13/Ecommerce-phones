import { formatDateLong, formatPrice } from "../../../helpers"
import {useNavigate} from 'react-router-dom'
import { useChangeOrderStatus } from "../../../hooks/orders/useChangeOrderStatus"
import {Loader} from '../../shared/Loader'

const tableHeader = ['Cliente', 'Fecha', 'Estado', 'Total']

const statusOption = [
    {
        value: 'Pending', 
        label: 'Pendiente'
    },
    {
        value: 'Paid', 
        label: 'Pagado'
    },
    {
        value: 'Shipped', 
        label: 'Enviado'
    },
    {
        value: 'Delivered', 
        label: 'Entregado'
    },
]

export const TableOrdersAdmin = ({orders}) => {

    const navigate = useNavigate()

    const {mutate} = useChangeOrderStatus()

    const handleChangeStatus = (id, status) => {
        mutate({id, status})

    }

  return (
    <div className="relative w-full h-full">
        <table className="text-sm w-full caption-bottom overflow-auto">
            <thead className="border-b border-gray-200 pb-3">
                <tr className="text-sn font-bold">
                    {
                        tableHeader.map((header, index) => (
                            <th key={index} className="h-12 px-4 text-left">
                                {header}
                            </th>
                        ))
                    }
                </tr>
            </thead>

            <tbody className="[&_tr:last-child]:border-0">
                {
                    orders.map(order => (
                        <tr key={order.id} className="cursor-pointer hover:bg-gray-200 transition-colors duration-200" onClick={() => navigate(`${order.id}`)}>
                            <td className="p-4 font-medium tracking-tighter flex flex-col gap-1">
                                <span className="font-semibo">
                                    {order.customers.full_name}
                                </span>
                                <span>{order.customers.email}</span>
                            </td>
                            <td className="p-4 font-medium tracking-tighter">
                                {formatDateLong(order.created_at)}
                            </td>
                            <td className="p-4 font-medium tracking-tighter">
                                <select value={order.status} onClick={e => e.stopPropagation()} className="border border-gray-300 p-2 rounded" onChange={e => handleChangeStatus(order.id, e.target.value)}>
                                    {statusOption.map(option => (
                                        <option value={option.value} key={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="p-4 font-medium tracking-tighter">
                                {formatPrice(order.total_amount)}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}