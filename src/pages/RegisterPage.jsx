import { Link, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from "../hooks/auth/useRegister";
import { LuLoaderCircle } from "react-icons/lu";
import { useUser } from "../hooks/auth/useUser";
import { Loader } from "../components/shared/Loader";
import { userRegisterSchema } from "../lib/validators";

export const RegisterPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: ''
    },
    resolver: zodResolver(userRegisterSchema)
  })

  const {session, isLoading} = useUser()

  const {mutate, isPending} = useRegister()

  const onRegister = handleSubmit((data) => {

    const {email, password, fullName, phone} = data

    mutate({email, password, fullName, phone})


  })

  if(isLoading) {
    return (
      <Loader />
    )
  }

  if(session?.session) return <Navigate to='/' />

  return (
    <div className="h-full flex flex-col items-center gap-5 mt-12">
        <h1 className="text-4xl font-bold capitalize">Registrate</h1>
        <p className="text-sm font-medium">Por favor, rellene los siguientes campos:</p>

        {
          isPending ? (
            <div className="w-full h-full flex justify-center mt-20">
              <LuLoaderCircle className="animate-spin" size={60} />
            </div>
          ) : (
            <>
            <form className="flex flex-col items-center gap-4 w-full mt-10 sm:w-100 lg:w-125" onSubmit={onRegister}>
                <input type="text" placeholder="Nombre Completo" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full" {...register('fullName')} />
                {
                  errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName.message}</p>
                  )
                }

                <input type="text" placeholder="Celular" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full" {...register('phone')} />

                <input type="email" placeholder="Ingresa tu correo electrónico" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full" {...register('email')} />
                {
                  errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )
                }

                <input type="password" placeholder="Ingresa tu contraseña" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full" {...register('password')} />
                {
                  errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )
                }

                <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full cursor-pointer">Registrarme</button>

                <p className='text-sm text-stone-800'>
                    ¿Ya tienes cuenta? 
                    <Link to="/login" className='underline ml-2'>Inicia sesión</Link>
                </p>

            </form>
        </>
          )
        } 
    </div>
  )
}