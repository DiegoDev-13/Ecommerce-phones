import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
import { Footer } from "../components/shared/Footer"
import { Banner } from "../components/home/Banner"
import { Newlastter } from "../components/home/Newlastter"
import { Sheet } from "../components/shared/Sheet"
import { useGlobalStore } from "../store/global.store"
import { NavbarMobile } from "../components/shared/NavbarMobile"

export const RootLayout = () => {
  
  // Para ver la locacion de donde estamos en la pagina
  const {pathname} = useLocation()
  // console.log(pathname)

  // Estos globales para los menu 
  const isSheetOpen = useGlobalStore((state) => state.isSheetOpen)
  const activeNavMobile = useGlobalStore(state => state.activeNavMobile)

  return (
    <div className="h-screen flex flex-col">
        <Navbar />

        {pathname === '/' && <Banner />}

        <main className="container mx-auto my-8 flex-1">
            <Outlet />
        </main>

        {pathname === '/' && <Newlastter />}

        {
          isSheetOpen && <Sheet />
        }

        {
          activeNavMobile && <NavbarMobile />
        }

        <Footer />
    </div>
  )
}