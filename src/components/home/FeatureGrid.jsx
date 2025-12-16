import { MdLocalShipping } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { FaHammer } from "react-icons/fa";
import { HiMiniReceiptRefund } from "react-icons/hi2";

export const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5">

        <div className="flex items-center gap-6">
            <MdLocalShipping size={40} className="text-slate-600"/>
            <div className="space-y-1">
                <p className="font-semibold ">
                    Envio Gratis
                </p>
                <p className="text-sm">
                    En todos nuestros productos
                </p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <HiMiniReceiptRefund size={70} className="text-slate-600"/>
            <div className="space-y-1">
                <p className="font-semibold ">
                    Devoluciones
                </p>
                <p className="text-sm">
                    Devuelve el equipo si no te satisface la compra en 72 horas
                </p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <FaHammer size={40} className="text-slate-600"/>
            <div className="space-y-1">
                <p className="font-semibold ">
                    Soporte 24/7
                </p>
                <p className="text-sm">
                    Soporte tecnico en cualquier momento
                </p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <BiWorld size={40} className="text-slate-600"/>
            <div className="space-y-1">
                <p className="font-semibold ">
                    Garantia
                </p>
                <p className="text-sm">
                    Garantia de 1 año en todos los equipos
                </p>
            </div>
        </div>
    </div>
  )
}