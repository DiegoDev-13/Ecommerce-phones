import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetProduct } from "../hooks/products/useGetProduct"
import { formatPrice } from "../helpers"
import { Separator } from "../components/shared/Separator"
import { LuMinus, LuPlus } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsChatLeftText } from "react-icons/bs";
import { ProductDescription } from "../components/one-product/ProductDescription";
import { GridImages } from "../components/one-product/GridImages";
import { useEffect, useMemo, useState } from "react";
import { Tag } from "../components/shared/Tag";
import { Loader } from "../components/shared/Loader";
import { useConunterStore } from "../store/counter.store";
import { useEditorState } from "@tiptap/react";
import { useCartStore } from "../store/cart.store";
import toast from "react-hot-toast";

export const CellPhonePage = () => {

    const {slug} = useParams() 

    const [currentSlug, setCurrentSlug] = useState(slug)

    const {product, isLoading, isError} = useGetProduct(currentSlug || '')

    const navigate = useNavigate()

    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [selectedStorage, setSelectedStorage] = useState(null)

    // Stores del contador
    const count = useConunterStore((state) => state.count)
    const incrementCount = useConunterStore((state) => state.increment)
    const decrementCount = useConunterStore((state) => state.decrement)

    // store del carrito
    const addItem = useCartStore(state => state.addItem)


    // Agrupamos las variantes por color 
    const colors = useMemo(() => {
        return product?.variants.reduce((acc, variant) => {
            const {color, color_name, storage} = variant
            if(!acc[color]) {
                acc[color] = {
                    name: color_name,
                    storages: []
                }
            }

            if(!acc[color].storages.includes(storage)){
                acc[color].storages.push(storage)
            }

            return acc;
        }, {}) || {}
    }, [product])

    // Obtener el primer color predeterminado si no se a selecionado ninguno 
    const avalibleColors = Object.keys(colors)

    useEffect(() => {
      if(!selectedColor && avalibleColors.length > 0) {
        setSelectedColor(avalibleColors[0])
      }
    }, [avalibleColors, selectedColor])

    // Actualizar el almacenamiendoto seleccionado cuando cambia el color 
    useEffect(() => {
      if(selectedColor && colors[selectedColor] && !selectedStorage){
        setSelectedStorage(colors[selectedColor].storages[0])
      }
    }, [selectedColor, colors, selectedStorage])

    // obtener la variante seleccionada
    useEffect(() => {
      if(selectedColor && selectedStorage) {
        const variant = product?.variants.find(variant => variant.color === selectedColor && variant.storage === selectedStorage)

        setSelectedVariant(variant)

      }
    }, [selectedColor, selectedStorage, product?.variants])
    
    
    // Obtener el stock 
    const isOutStock = selectedVariant?.stock === 0

    // Funcion para agregar al carrito
    const addToCart = () => {
       if(selectedVariant) {
            addItem({
                variantId: selectedVariant.id,
                productId: product?.id || '',
                name: product?.name || '',
                image: product?.images[0],
                color: selectedVariant?.color_name,
                storage: selectedVariant?.storage,
                price: selectedVariant?.price,
                quantity: count
            });
            toast.success('Producto agregado al carrito');
        }
    }

    // funcion para comprar ahora 
    const buyNow = () => {
        if(selectedVariant) {
            addItem({
                variantId: selectedVariant.id,
                productId: product?.id || '',
                name: product?.name || '',
                image: product?.images[0],
                color: selectedVariant?.color_name,
                storage: selectedVariant?.storage,
                price: selectedVariant?.price,
                quantity: count
            });
            navigate('/checkout')
        }
    }


    // resetear el slug actual cuando cambia en la url
    useEffect(() => {
      setCurrentSlug(slug)

    //   reiniciar color, alamacenamiento y variante seleccionada
        setSelectedColor(null)
        setSelectedStorage(null)
        setSelectedVariant(null)

    }, [slug])
    

    if(isLoading) return <Loader />

    if(!product || isError) return (
        <div className="flex justify-center items-center h-[80vh]">
            <p>Producto no encontrado!</p>
        </div>
    )


  return (
    <>
        <div className="h-fit flex flex-col md:flex-row gap-16 mt-8">
            {/* TODO: Grid Imagenes*/}
            <GridImages images={product?.images} />

            <div className="flex-1 space-y-5">
                <h1 className="text-3xl font-bold tracking-tight">
                    {product.name}
                </h1>

                <div className="flex gap-5 items-center">
                    <span className={`tracking-wide text-lg font-semibold ${isOutStock ? 'line-through' : ''}`}>
                        {formatPrice(selectedVariant?.price || product.variants[0].price)}
                    </span>

                    <div className="relative">
                        {/* TAG: Agotado  */}
                        {isOutStock && <Tag type='agotado' />}
                    </div>
                </div>

                <Separator />

                {/* Caracteristicas  */}
                <ul className="space-y-2 ml-7 my-10">
                    {
                        product.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-center gap-2 tracking-tight font-medium"> 
                                <span className="bg-black w-1.25 h-1.25 rounded-full"/>
                                {feature}
                            </li>
                        ))
                    }
                </ul>

                <div className="flex flex-col gap-3">   
                    <p>
                        Color: {selectedColor && colors[selectedColor].name}
                    </p>
                    <div className="flex gap-3">
                        {
                            avalibleColors.map(color => (
                                <button key={color} className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer ${
                                    selectedColor === color ? 'border border-slate-800' : ''
                                }`} onClick={() => setSelectedColor(color)} >
                                    <span className="w-6.5 h-6.5 rounded-full" style={{backgroundColor: color}} />
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/* OPCIONES DE ALMACENAMIENTO  */}
                <div className="flex flex-col gap-3">
                    <p className="text-xs font-medium">
                        Almacenamiento Disponible
                    </p>
                    
                    {
                        selectedColor && (
                            <div className="flex gap-3">
                                <select className="border border-gray-300 rounded-lg px-3 py-1" value={selectedStorage || ''} onChange={e => setSelectedStorage(e.target.value)}>
                                    {
                                        colors[selectedColor].storages.map(storage => (
                                            <option key={storage} value="storage">{storage}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        )
                    }
                </div>

                {/* COMPRAR  */}
                {
                    isOutStock ? (
                        <button className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] w-full" disabled >Agotado</button>
                    ) : (
                        <>
                            {/* Contador  */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium">
                                    Cantidad:
                                </p>

                                <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                                    <button onClick={decrementCount} disabled={count === 1} className="cursor-pointer">
                                        <LuMinus size={15} />
                                    </button>
                                    <span className="text-slate-500 text-sm">{count}</span>
                                    <button onClick={incrementCount}  className="cursor-pointer">
                                        <LuPlus size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* BOTONES DE ACCION */}

                            <div className="flex flex-col gap-3">
                                <button className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all duration-300 hover:bg-[#e2e2e2] cursor-pointer" onClick={addToCart}>
                                    Agregar al carrito
                                </button>
                                <button className="text-white bg-black uppercase font-semibold tracking-widest text-xs py-4 rounded-full cursor-pointer" onClick={buyNow}>
                                    Comprar ahora
                                </button>
                            </div>
                        </>
                    )
                }

                <div className="flex pt-2">
                    <div className="flex flex-col gap-1 flex-1 items-center">
                        <CiDeliveryTruck size={35} />
                        <p className="text-xs font-semibold">
                            Envio gratis
                        </p>
                    </div>
                    
                    <Link to='#' className="flex flex-col gap-1 flex-1 items-center justify-center">
                        <BsChatLeftText size={30} />
                        <p className="flex flex-col items-center text-xs">
                            <span className="font-semibold">¿Necesitas ayuda?</span>
                            Contáctanos aqui
                        </p>
                    </Link>
                </div>

            </div>

        </div>

        {/* DESCRIPCION */}
        <ProductDescription content={product.description} />
    </>
  )
}