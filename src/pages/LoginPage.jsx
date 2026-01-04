import { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import { useLogin } from '../hooks/auth/useLogin'
import { LuLoaderCircle } from "react-icons/lu";
import { useUser } from '../hooks/auth/useUser';

export const LoginPage = () => {

    const [email, setEmail] = useState('pgaoooudxaycnsrcgk@nesopf.com')
    const [password, setPassword] = useState('6566797Diego')

    const {session, isLoading} = useUser()

    const {mutate, isPending} = useLogin()

    const onLogin = (e) => {
        e.preventDefault()

        mutate({email, password})
    }

    if(isLoading) {
        return (
            <div className='h-full w-full flex flex-1 justify-center mt-10'>
                <LuLoaderCircle size={60} />
            </div>
        )
    }
 
    if(session?.session) return <Navigate to='/' />

  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
        <h1 className="text-4xl font-bold capitalize">Iniciar sesión</h1>
        <p className="text-sm font-medium">¡Que bueno tenerte de vuelta!</p>

        {
            isPending ? (
                <div className="w-full h-full flex justify-center mt-20">
                    <LuLoaderCircle className="animate-spin" size={60} />
                </div>
            ) : (
                <>
                    <form className="flex flex-col items-center gap-4 w-full mt-10 sm:w-100 lg:w-125 " onSubmit={onLogin}>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ingresa tu correo electrónico" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full" />

                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full" />

                        <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full cursor-pointer">Iniciar sesión</button>

                        <p className='text-sm text-stone-800'>
                            ¿No tienes cuenta? 
                            <Link to="/register" className='underline ml-2'>Regístrate</Link>
                        </p>

                    </form>
                </>
            )
        }
    </div>
  )
}