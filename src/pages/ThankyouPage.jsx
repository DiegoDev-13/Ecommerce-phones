import { Link, useNavigate, useParams } from "react-router-dom"
import {Loader} from '../components/shared/Loader'
import { useOrder } from '../hooks/orders/useOrder'
import { CiCircleCheck } from "react-icons/ci";
import { formatPrice } from "../helpers";
import { useEffect } from "react";
import { supabase } from "../supabase/Client";
import { useUser } from "../hooks/auth/useUser";

export const ThankyouPage = () => {

    const {id} = useParams()

    const {data, isLoading, isError} = useOrder(Number(id))

    const {isLoading: isLoadingSession} = useUser()

    const navigate = useNavigate()


    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if(event === 'SIGNED_OUT' || !session){
                navigate('/login')
            }
        })
    }, [navigate])

    if(isError) return <div>Error al cargar la orden!</div>

    if(isLoading || !data || isLoadingSession) return <Loader />

  return (
    <div className="flex flex-col h-screen">
        <header className="text-black flex items-center justify-center flex-col px-10 py-12 ">
            <Link to='/' className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start">
                <p>
                    Celulares
                    <span className="text-cyan-600">Baratos</span>
                </p>
            </Link>
        </header>   

        <main className="container flex-1 flex flex-col items-center gap-10">
            <div className="flex items-center gap-3">
                <CiCircleCheck size={40} />

                <p className="text-5xl">¡Gracias, {data.customer.full_name}!</p>
            </div>

            <div className="border border-slate-200 w-full md:w-150 p-5 rounded-md space-y-3">
                <h3 className="font-medium">Tu pedido está confirmado</h3>

                <p className="text-sm">
                    Gracias por realizar tu compra en CelularesBaratos. Para realizar la transferencia te compartimos los siguientes datos
                </p>

                <div className="space-y-0.5 text-sm">
                    <p>Compra a traves de transferencia bancaria</p>
                    <p>Banco de Venezuela</p>
                    <p>Razón Social: CelularesBaratos</p>
                    <p>Cedula: 179451656</p>
                    <p>Tipo de cuenta: Corriente</p>
                    <p>Numero de Cuenta: 0102-1441-14-1545658</p>
                </div>

                <p className="text-sm">
                    Una vez realizada la transferencia, comparte tu comprobante a ventas@celularesbaratos.com para procesarla y hacerte la entrega de tu pedido.
                </p>
            </div>

            <div className="border border-slate-200 w-full p-5 rounded-md space-y-3 md:w-150">

                <h3 className="font-medium">
                    Detalles del pedido
                </h3>


                <div className="flex flex-col gap-5">
                    <ul className="space-y-3">
                        {
                            data.orderItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center gap-3"> 
                                    <div className="flex">
                                        <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-contain" />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between">
                                            <p className="font-semibold">
                                                {item.productName}
                                            </p>
                                            <p className="text-sm font-medium text-gray-600 mt-1">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <p className="text-[13px] text-gray-600">
                                                {item.storage} / {item.colorName}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                    <div className="flex justify-between">
                        <span className="font-semibold">
                            Total:
                        </span>
                        <span className="font-semibold">
                            {
                                formatPrice(data.totalAmount)
                            }
                        </span>
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-5">    
                    <div className="flex flex-col text-sm">
                        <p className="font-semibold">
                            Información de contacto:
                        </p>
                        <p>{data.customer.email}</p>
                    </div>

                    <div className="flex-col text-sm">
                        <p className="font-semibold">
                            Métodos de pago:
                        </p>
                        <p className="">
                            Deposito Bancario - {formatPrice(data.totalAmount)}
                        </p>    
                    </div>

                    <div className="flex flex-col text-sm">
                        <p className="font-semibold">
                            Dirección de envio:
                        </p>
                        <p>{data.addresses.addressLine1}</p>
                        <p>{data.addresses.addressLine2 && data.addresses.addressLine2}</p>
                        <p>{data.addresses.city}</p>
                        <p>{data.addresses.state}</p>
                        <p>{data.addresses.postalCode}</p>
                        <p>{data.addresses.country}</p>
                    </div>

                    <div className="flex flex-col text-sm">
                        <p className="font-semibold">Método de envio:</p>
                        <p>Standard</p>
                    </div>

                </div>
            </div>

            <div className="flex flex-col justify-between items-center w-full mb-5 gap-3 sm:flex-row md:w-150 md:gap-0"> 
                <p className="font-semibold">
                    ¿Necesítas ayuda? Ponte en contacto con nosotros
                </p>
                <Link to='/celulares' className="text-white bg-black py-4 px-5 text-sm tracking-tight font-semibold rounded-md">
                    Seguir comprando
                </Link>
            </div>

        </main>
    </div>
  )
}
