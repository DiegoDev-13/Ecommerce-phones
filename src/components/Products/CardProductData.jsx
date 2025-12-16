import { Link } from "react-router-dom"
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

export const CardProduct = ({img, name, price, slug, colors, variants}) => {

    const [activeColor, setActiveColor] = useState(colors)

    console.log(activeColor)

    // // Indentificar la variante seleccionada segun el color activo 
    // const selectedVarian = variants.find(variant => variant.color === activeColor.color)

    // const stock = selectedVarian.stock || 0

    // console.log(variants)

    // console.log(Array.isArray(colors))

  return (
    <div className="flex flex-col gap-6 relative ">
        <Link to={`/celulares/${slug}`} className="flex relative group">
            <div className="flex h-[350] w-full items-center justify-center py-2 lg:h-[250]">
                <img src={img} alt={name} className="object-contain h-full w-full" />
            </div>
            <button className="bg-white border border-slate-200 absolute w-full bottom-0 py-3 rounded-3xl flex items-center justify-center gap-1 text-sm font-medium hover:bg-stone-100 translate-[100] transition-all duration-300 group-hover:translate-y-0"><FiPlus /> Añadir</button>
        </Link>

        <div className="flex flex-col gap-1 items-center">
            <p className="text-[15px] font-medium">{name}</p>
            <p className="text-[15px] font-medium ">{price}</p>

            <div className="flex gap-3">

                {
                    Array.isArray(colors) && colors.map(item => (
                        <span key={item.color} className={`grid place-items-center h-5 w-5 rounded-full cursor-pointer`}>
                            <span className="w-[14] h-[14] rounded-full" style={{backgroundColor: item.color}} />
                        </span>
                    ))
                }

            </div>
        </div>

        <div className="absolute top-2 left-2">
            {
                variants === 0 && <span>Agotado</span>
            }
        </div>
    </div>
  )
}