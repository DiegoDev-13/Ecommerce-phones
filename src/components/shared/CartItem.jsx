import { formatPrice } from "../../helpers"
import { LuMinus, LuPlus } from "react-icons/lu";
import { useCartStore } from "../../store/cart.store";

export const CartItem = ({item}) => {

    const removeItem = useCartStore(state => state.removeItem)
    const updateQuantity = useCartStore(state => state.updateQuantity)

    // TODO: Add incrementCount and decrementCount functions 
    const incrementCount = () => {
        updateQuantity(item.variantId, item.quantity + 1)
    }

    const decrementCount = () => {
        if(item.quantity > 1) {
            updateQuantity(item.variantId, item.quantity - 1)
        }
    }

  return (
    <li className="flex justify-between items-center gap-5">
        <div className="flex">
            <img src={item.image} alt={item.name} className="h-20 w-20 object-contain" />
        </div>

        <div className="flex-1 space-y-3">
            <div className="flex justify-between">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm font-medium text-gray-600 mt-1">
                    {formatPrice(item.price)}
                </p>
            </div>

            <div className="flex gap-3">
                <p className="text-[13px] text-gray-600">
                    {item.storage} / {item.color}
                </p>
            </div>

            <div className="flex gap-4">
                <div className="flex items-center gap-5 px-2 py-1 border border-slate-200 w-fit rounded-full">
                    <button onClick={decrementCount} disabled={item.quantity === 1} className="cursor-pointer">
                        <LuMinus size={15} />
                    </button>
                    <span className="text-slate-500 text-sm">{item.quantity}</span>
                    <button onClick={incrementCount}  className="cursor-pointer">
                        <LuPlus size={15} />
                    </button>
                </div>

                <button className="underline font-medium text-[10px] cursor-pointer" onClick={() => removeItem(item.variantId)}>
                    Eliminar
                </button>
            </div>
        </div>
    </li>
  )
}