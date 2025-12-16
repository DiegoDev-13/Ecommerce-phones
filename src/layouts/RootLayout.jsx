import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar"
import { Footer } from "../components/shared/Footer"
import { Banner } from "../components/home/Banner"
import { Newlastter } from "../components/home/Newlastter"

export const RootLayout = () => {
  
  const {pathname} = useLocation()

  console.log(pathname)

  return (
    <div className="h-screen flex flex-col">
        <Navbar />

        {pathname === '/' && <Banner />}

        <main className="container mx-auto my-8 flex-1">
            <Outlet />
        </main>

        {pathname === '/' && <Newlastter />}

        <Footer />
    </div>
  )
}