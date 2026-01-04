import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { signOut } from "../actions/auth"
import { useUser } from "../hooks/auth/useUser"
import { supabase } from "../supabase/Client"
import { useEffect } from "react"
import { Loader } from "../components/shared/Loader"

export const ClientLayout = () => {

    const {session, isLoading: isLoadingSession} = useUser()

    const navigate = useNavigate()


    useEffect(() => {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if(event === 'SIGNED_OUT' || !session) {
            navigate('/login')
        }
      })
    }, [navigate])
    

    const handleLogout = async () => {
        await signOut()
    }

    if(isLoadingSession) return <Loader />

  return (
    <div className="flex flex-col gap-5">
        {/* Menu  */}
        <nav className="flex justify-center text-sm gap-10 font-medium">
            <NavLink to='account/pedidos' className={({isActive}) => `${isActive ? 'underline' : 'hover:underline'}  `}>
                Pedidos
            </NavLink>

            {/* TODO: LINCK DASHBOARD  */}


            <button className="hover:underline cursor-pointer" onClick={handleLogout}>
                Cerrar Sessión
            </button>
        </nav>

        <main className="container mt-12 flex-1">
            <Outlet />
        </main>
    </div>
  )
}