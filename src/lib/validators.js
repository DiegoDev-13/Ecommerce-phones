import {z} from 'zod'

export const userRegisterSchema = z.object({
  email: z.string().email('Por favor, ingresa un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(30, 'La contraseña no debe superar los 30 caracteres').regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula').regex(/[0-9]/, 'Debe contener al menos un número'),
  fullName: z.string().min(3, 'El nombre completo es requerido'),
  phone: z.string().optional()
})

export const addressSchema = z.object({
    addressLine1: z.string().min(3, 'La dirección es requerida').max(100, 'La dirección no debe exceder los 100 caracteres'),
    addressLine2: z.string().max(100, 'La dirección no debe exceder los 100 caracteres').optional(),
    city: z.string().min(2, 'La ciudad es requerida').max(50, 'La ciudad no debe exceder los 50 caracteres'),
    state: z.string().min(2, 'El estado es requerida').max(50, 'El estado no debe exceder los 50 caracteres'),
    postalCode: z.string().max(10, 'El codigo postal no debe exceder los 10 caracteres').optional(),
    country: z.string().min(1, 'El pais es requerido')
})