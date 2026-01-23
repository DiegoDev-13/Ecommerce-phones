import { Link } from "react-router-dom"
import { BiChevronRight } from "react-icons/bi";
import { socialLinks } from "../../constants/link";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="py-16 bg-gray-950 px-12 flex justify-between gap-10 text-slate-200 flex-wrap mt-10 md:flex-nowrap ">

        <div className="flex flex-col gap-4 flex-1">
            <Link to='/' className={`text-3xl font-bold text-center tracking-tighter transition-all text-white flex-1`}>
                MasterCell
            </Link>
            
            <div className="flex flex-col gap-2 items-center pt-3">
                <p className="font-semibold text-[16px]">Desarrollado por:</p>
                <Link to='https://github.com/DiegoDev-13' className="flex flex-col items-center gap-1 text-sm">
                    <FaGithub size={40} />
                    Github - Diego Martinez
                </Link>
            </div>

        </div>


        <div className="flex flex-col gap-4 flex-1">
            <p className="font-semibold uppercase tracking-tighter">
                Suscribete
            </p>
            <p className="text-xs font-medium">
                Recibe promociones exclucivas
            </p>

            <div className="border border-gray-800 flex items-center gap-2 px-3 py-2 rounded-full">
                <input type="email" placeholder="Correo Electronico" className="pl-2 bg-gray-950 text-slate-200 w-full focus:outline-none" />
                <button className="text-slate-200 cursor-pointer">
                    <BiChevronRight size={20} />
                </button>
            </div>
        </div>

        <div className="flex flex-col gap-4 felx-1">
            <p className="font-semibold uppercase tracking-tighter">
                Politicas
            </p>

            <nav className="flex flex-col gap-2 text-xs font-medium">
                <Link to='/celulares'>Productos</Link>
                <Link to='#' className="text-slate-300 hover:text-white">Politicas de privacidad</Link>
                <Link to='#' className="text-slate-300 hover:text-white">Terminos y condiciones</Link>
            </nav>
        </div>

        <div className="flex flex-col gap-4 flex-1">
            <p className="font-semibold uppercase tracking-tighter">
                Siguenos
            </p>

            <p className="text-xs leading-6">
                No te pierdas las novedades que MasterCell tiene para ti.
            </p>

            <div className="flex">
                {
                    socialLinks.map((link) => (
                        <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="text-slate-300 border border-gray-800 w-full h-full py-3.5 flex items-center justify-center transition-all hover:bg-white hover:text-gray-950">
                            {link.icon}
                        </a>
                    ))
                }
            </div>
        </div>
    </footer>
  )
}