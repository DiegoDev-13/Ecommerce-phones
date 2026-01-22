import { useNavigate, useParams } from "react-router-dom"
import { IoChevronBack } from "react-icons/io5";
import { useOrderAdmin } from "../../hooks/orders/useOrderAdmin";
import { Loader } from "../../components/shared/Loader";
import { formatPrice } from "../../helpers";


const tableHeader = ['Producto', 'Cantidad', 'Total']

export const DashboardOrderPage = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const {data: order, isLoading} = useOrderAdmin(id)

  if(isLoading || !order) return <Loader />

  return (
    <div className="">
        <div className="flex justify-between items-center">
          <button className="border rounded-full py-2 border-slate-200 px-5 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest hover:bg-stone-100 transition-all cursor-pointer" onClick={() => navigate(-1)}> 
            <IoChevronBack size={16} />
            Volver
          </button>

          <div className="flex flex-col items-center gap-1.5">
            <h1 className="text-3xl font-bold">
              Pedido #{id}
            </h1>
            <p className="text-sm">Fecha</p>
          </div>
          <div />
          <div />
        </div>

        <div className="flex flex-col mt-10 mb-5 gap-10">
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
                order.orderItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-4 font-medium tracking-tighter flex items-center gap-3 ">
                      <img src={item.productImage} alt={item.productName} className="h-20 w-20 object-contain rounded-lg" />

                      <div className="space-y-2">
                        <h3>{item.productName}</h3>
                        <p className="text-sm">
                          {item.colorName} / {item.storage}
                        </p>
                        <p className="text-sm">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 font-medium tracking-tighter text-center">
                      {item.quantity}
                    </td>
                    <td className="p-4 font-medium tracking-tighter text-center">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          <div className="flex flex-col gap-3 text-slate-600 text-sm self-end w-1/2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{formatPrice(order.totalAmount)}</p>
              </div>
              <div className="flex justify-between">
                <p>Envío (Standard)</p>
                <p>{formatPrice(0)}</p>
              </div>
              <div className="flex justify-between text-black font-semibold">
                <p>Total</p>
                <p>{formatPrice(order.totalAmount)}</p>
              </div>
          </div>

          <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold">
                Direccion
              </h2>

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