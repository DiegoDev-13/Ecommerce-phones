import { NavLink, useNavigate } from "react-router-dom"
import { dashboardLinks } from "../../constants/link"
import { Logo } from "../shared/Logo"
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "../../actions/auth";
import { useEffect } from "react";
import { supabase } from "../../supabase/Client";

export const Sidebar = () => {

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

  return (
    <div className="w-30 bg-stone-800 text-white flex flex-col gap-10 items-center p-5 fixed h-screen lg:w-62.5 transition-all duration-200">
        <Logo isDashboard={true} />

        <nav className="w-full space-y-5 flex-1">
            {
                dashboardLinks.map(link => (
                    <NavLink key={link.id} to={link.href} className={({isActive}) => `flex items-center justify-center gap-3 pl-0 py-3 transition-all duration-300 rounded-md ${isActive ? 'text-white bg-cyan-600' : 'hover:text-white hover:bg-cyan-600'} lg:pl-5 lg:justify-start`}>
                        {link.icon}
                        <p className="font-semibold hidden lg:block">
                            {link.title}
                        </p>
                    </NavLink>
                ))
            }
        </nav>

        <button className="bg-red-500 w-full py-2.5 rounded-md flex items-center justify-center gap-2 font-semibold text-sm hover:underline cursor-pointer" onClick={handleLogout}>
            <span className="hidden lg:block">Cerrar Sessión</span>
            <IoLogOutOutline size={20} className="inline-block" />
        </button>
    </div>
  )
}