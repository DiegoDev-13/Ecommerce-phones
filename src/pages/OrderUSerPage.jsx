import { useNavigate, useParams } from "react-router-dom"
import { useOrder } from "../hooks/orders/useOrder"
import { Loader } from "../components/shared/Loader"
import { IoChevronBack } from "react-icons/io5";
import { formatDateLong, formatPrice } from "../helpers";

const tableHeaders = [
    'Producto',
    'Cantidad',
    'Total'
]

export const OrderUSerPage = () => {

  const {id} = useParams()

  const {data: order, isLoading, isError} = useOrder(Number(id))

  const navigate = useNavigate()

  if(isError) return <div>Error al encontrar la orden</div>
  
  if(isLoading || !order) return <Loader />

  return (
    <div className="">
        <div className="flex flex-col justify-between items-center gap-5 md:flex-row md:gap-0">
          <button onClick={() => navigate(-1)} className="border rounded-full py-2 border-slate-200 px-5 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest hover:bg-stone-100 transition-all cursor-pointer">
            <IoChevronBack size={30} />
            Volver a los pedidos
          </button>
          <div className="flex flex-col items-center gap-1.5">
            <h2 className="text-3xl font-bold">
              Pedido #{id}
            </h2>
            <p className="text-sm">{formatDateLong(order.created_at)}</p>
          </div>
          <div></div>
          <div></div>
        </div>   

        <div className="flex flex-col mt-10 mb-5 gap-10">
          <table className="text-sm w-full caption-bottom overflow-auto">
            <thead>
              <tr>
                {
                  tableHeaders.map((header, index) => (
                    <th key={index} className="h-12 text-center uppercase tracking-wide text-stone-600 font-medium">
                        {header}
                    </th>
                  ))
                }
              </tr>
            </thead>

            <tbody>
                {
                  order.orderItems.map((product, index) => (
                    <tr key={index} className="bordr-b border-gray-200">
                      <td className="p-4 font-medium tracking-tighter gap-3 flex items-center">
                        <img src={product.productImage} alt={product.productName} className="h-20 w-20 object-contain rounded-lg" />
                        <div className="space-y-2">
                          <h3 className="">
                            {product.productName}
                          </h3>
                          <p className="text-xs">
                            {product.storage} / {product.colorName}
                          </p>
                          <p className="text-sm">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 font-medium tracking-tighter text-center">
                        {product.quantity}
                      </td>
                      <td className="p-4 font-medium tracking-tighter text-center">
                        {formatPrice(product.price * product.quantity)}
                      </td>
                    </tr>
                  ))
                }
            </tbody>
          </table>

          <div className="flex flex-col gap-3 text-slate-600 text-sm self-end w-1/2">
            <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>{formatPrice(order.totalAmount)}</p>
            </div>
            <div className="flex justify-between">
                <p>Envio (Standard):</p>
                <p>{formatPrice(0)}</p>
            </div>
            <div className="flex justify-between text-black font-semibold">
                <p>Total:</p>
                <p>{formatPrice(order.totalAmount)}</p>
            </div>
          </div>

          <div className="flex-flex-col gap-3">
            <h3 className="text-lg font-bold">Dirección</h3>

            <div className="border border-stone-300 p-5 flex flex-col gap-5">
                <div className="space-y-1">
                  <h3 className="font-medium">Cliente:</h3>
                  <p>{order.customer.full_name}</p>
                </div>

                <div className="flex flex-col gap-1 text-sm">
                  <h3 className="font-medium text-base">
                    Envio:
                  </h3>
                  <p>{order.addresses.addressLine1}</p>
                  <p>{order.addresses.addressLine2 && order.addresses.addressLine2}</p>
                  <p>{order.addresses.city}</p>
                  <p>{order.addresses.state}</p>
                  <p>{order.addresses.postalCode}</p>
                  <p>{order.addresses.country}</p>
                </div>
            </div>
          </div>

        </div>

    </div>
  )
}