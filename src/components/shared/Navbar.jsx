import { Link, NavLink } from "react-router-dom"
import { navbarLinks } from "../../constants/link"
import { HiOutlineSearch, HiOutlineShoppingBag  } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/cart.store";
import { useUser } from "../../hooks/auth/useUser";
import { LuLoaderCircle } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";

export const Navbar = () => {

    const openSheet = useGlobalStore(state => state.openSheet)
    const setActiveMobile = useGlobalStore(state => state.setActiveMobile)
    
    const totalItemsInCart = useCartStore(state => state.totalItemsInCart)

    const {session, isLoading} = useUser()

    const useId = session?.session?.user.id


  return (
    <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12 ">
        <Logo />

        <nav className="space-x-5 hidden md:flex">
            {
            navbarLinks.map(link => (
                 <NavLink key={link.id} to={link.href} className={({isActive}) => `${isActive ? 'text-cyan-600 underline' : ''} transition-all duration-300 font-medium hover:text-cyan-600 hover:underline`}>
                    {link.title}
                 </NavLink>
                ))
            }
        </nav>

        <div className="flex gap-5 items-center">
            <button className="cursor-pointer" onClick={() => openSheet('search')}>
                <HiOutlineSearch size={25} />
            </button>

            {
                isLoading ? (
                    <LuLoaderCircle className="animate-spin" size={30} />
                ) : session.session ? (
                    <div className="relative">
                        <Link to='/account' className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold">
                            D
                        </Link>
                    </div>
                ) : (
                    <Link to='/login' >
                        <HiOutlineUser size={25} />
                    </Link>
                )
            }

            <button className="relative cursor-pointer" onClick={() => openSheet('cart')}>
                <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">{totalItemsInCart}</span>
                <HiOutlineShoppingBag size={25} />
            </button>
        </div>

        <button className="md:hidden cursor-pointer" onClick={() => setActiveMobile(true)}>
            <FaBarsStaggered size={25} />
        </button>

    </header>
  )
}