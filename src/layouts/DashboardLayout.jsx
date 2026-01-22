import { Outlet, replace, useNavigate } from "react-router-dom"
import { Sidebar } from "../components/dashboard/Sidebar"
import { useUser } from "../hooks/auth/useUser"
import { getSession, getUserRole } from "../actions/auth"
import { useState, useEffect } from "react"
import {Loader} from '../components/shared/Loader'
import { supabase } from "../supabase/Client"

export const DashboardLayout = () => {

  const [roleLoading, setRoleLoading] = useState(true)

  const navigate = useNavigate()

  const {session, isLoading} = useUser()
 
  useEffect(() => {
    const checkRole = async () => {
      setRoleLoading(true)
      const session = await getSession()
      if(!session) {
        navigate('/login')
      }
      
      const role = await getUserRole(session.session?.user.id)
      
      if(role !== 'admin') {
        navigate('/', {replace: true})
      }

      setRoleLoading(false)
    }

    checkRole()

    supabase.auth.onAuthStateChange(async (event, session) => {
      if(event === 'SIGNED_OUT' || !session) {
          navigate('/login', {replace: true})
      }
    })
  }, [navigate])
  
  if(isLoading || !session || roleLoading) return <Loader />

  return (
    <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />

        <main className="container m-5 mt-7 flex-1 text-slate-800 ml-35 lg:ml-67.5 ">
            <Outlet />

        </main>
    </div> 
  )
}