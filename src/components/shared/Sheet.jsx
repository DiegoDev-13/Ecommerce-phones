import { useEffect, useRef } from "react"
import { useGlobalStore } from "../../store/global.store"
import { Cart } from "./Cart"
import { Search } from "./Search"

export const Sheet = () => {

  const sheetContent = useGlobalStore(state => state.sheetContent)
  const closeSheet = useGlobalStore(state => state.closeSheet)

  const sheetRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // funcion para manejar clicks fuera del sheet 
    const handleOutsideClick = (e) => {
      if(sheetRef.current && !sheetRef.current.contains(e.target)) {
        closeSheet()
      }
    }

    // Agregar event listenner 
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [closeSheet])
  

  // funcion para saber el componente a renderizar 
  const renderContent = () => {
    switch (sheetContent) {
      case 'cart':
        return <Cart />

       case 'search':
        return <Search />
    
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end animated-fadeIn">
      <div ref={sheetRef} className="bg-white text-black h-screen w-125 shadow-lg animated-slideIn">
        {
          renderContent()
        }
      </div>
    </div>
  )
}