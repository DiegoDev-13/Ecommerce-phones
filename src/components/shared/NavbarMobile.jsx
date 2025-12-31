import { Link, NavLink } from "react-router-dom";
import { useGlobalStore } from "../../store/global.store"
import { IoMdClose } from "react-icons/io";
import { navbarLinks } from "../../constants/link";

export const NavbarMobile = () => {

    const setActiveMobile = useGlobalStore(state => state.setActiveMobile)

  return (
    <div className="fixed bg-white h-screen text-black w-full shadow-lg animated-slideInLeft z-50 flex justify-center py-32">
        <button className="absolute top-5 right-5" onClick={() => setActiveMobile(false)}>
            <IoMdClose size={30} />
        </button>

        {/* Contenido  */}
        <div className="flex flex-col gap-20">
            <Link to='/' className="text-4xl font-bold tracking-tighter transition-all" onClick={() => setActiveMobile(false)} >
                <p>Celulares<span className="text-cyan-600">Baratos</span></p>
            </Link>

            <nav className="flex flex-col items-center gap-5">
                {
                    navbarLinks.map(link => (
                        <NavLink key={link.id} to={link.href} className={({isActive}) => `${isActive ? 'text-cyan-600 underline' : ''} transition-all duration-300 font-semibold text-xl hover:text-cyan-600 hover:underline `} onClick={() => setActiveMobile(false)}>{link.title}</NavLink>
                    ))
                }
            </nav>

        </div>

    </div>
  )
}