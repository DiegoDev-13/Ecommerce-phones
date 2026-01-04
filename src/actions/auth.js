import {supabase} from '../supabase/Client'

export const signUp = async ({email, password, fullName, phone}) => {
    try {
        // 1: Crear o Registrar usuario
        const {data, error} = await supabase.auth.signUp({
            email,
            password
        })

        if(error) {
            throw new Error('Error al registrar usuario')
        }

        console.log(data)
        
        const userId = data.user?.id

        console.log(userId)
        
        if(!userId) {
            throw new Error('Error al obtener id del usuario ')
        }

        // 2: Autenticar al usuario
        const {error: signInError} = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if(signInError) {
            console.log(signInError)
            throw new Error('Email o contraseñas incorrectos')
        }

        // 3: insertar el rol por defecto = CUSTOMER (cliente)
        const {error: roleError} = await supabase.from('user_roles').insert({
            user_id: userId,
            role: 'customer'
        })

        if(roleError) {
            console.log(roleError)
            throw new Error('Error al registrar el rol del usuario')
        }

        // 4: Insertar los datos del usuario en la tabla customer (clientes)
        const {error: customerError} = await supabase.from('customers').insert({
            user_id: userId,
            full_name: fullName,
            phone: phone,
            email: email
        })

        if(customerError) {
            console.log(customerError)
            throw new Error('Error al registrar datos del usuario')
        }

        return {
            data,
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al registrar usuario')
    }
}

export const signIn = async ({email, password}) => {
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error) {
        console.log(error)
        throw new Error('Email o contraseña incorrecta')
    }

    return data
}

export const signOut = async () => {
    const {error} = await supabase.auth.signOut()

    if(error) {
        console.log(error)
        throw new Error('Error al cerrar la sesion')
    }
} 

export const getSession = async () => {
    const {data, error} = await supabase.auth.getSession()

    if(error) {
        console.log(error)
        throw new Error('Error al obtener la sesion')
    }

    return data
}