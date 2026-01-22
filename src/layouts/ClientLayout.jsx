import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { signOut } from "../actions/auth"
import { useUser } from "../hooks/auth/useUser"
import { supabase } from "../supabase/Client"
import { useEffect } from "react"
import { Loader } from "../components/shared/Loader"
import { useGetRole } from "../hooks/auth/useGetRole"
import { HiOutlineExternalLink } from "react-icons/hi";

export const ClientLayout = () => {

    const {session, isLoading: isLoadingSession} = useUser()

    const {data: role, isLoading: isLoadingRole} = useGetRole(session?.session.user.id)

    const navigate = useNavigate()


    useEffect(() => {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if(event === 'SIGNED_OUT' || !session) {
            navigate('/login', {replace: true})
        }
      })
    }, [navigate])
    

    const handleLogout = async () => {
        await signOut()
    }

    if(isLoadingSession || isLoadingRole) return <Loader />

  return (
    <div className="flex flex-col gap-5">
        {/* Menu  */}
        <nav className="flex justify-center text-sm gap-10 font-medium">
            <NavLink to='account/pedidos' className={({isActive}) => `${isActive ? 'underline' : 'hover:underline'}  `}>
                Pedidos
            </NavLink>

            {/* TODO: LINCK DASHBOARD  */}
            {
                role === 'admin' && (
                    <NavLink to='/dashboard/products' className='hover:underline flex items-center gap-1'> 
                        Dashboard
                        <HiOutlineExternalLink size={16} className="inline-block" />
                    </NavLink>
                )
            }


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