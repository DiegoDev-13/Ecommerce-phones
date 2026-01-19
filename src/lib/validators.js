import {z} from 'zod'

// Schema de formulario para registrar el usuario
export const userRegisterSchema = z.object({
  email: z.string().email('Por favor, ingresa un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(30, 'La contraseña no debe superar los 30 caracteres').regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula').regex(/[0-9]/, 'Debe contener al menos un número'),
  fullName: z.string().min(3, 'El nombre completo es requerido'),
  phone: z.string().optional()
})


// Schema de formulario para añadir la direccion de envio
export const addressSchema = z.object({
    addressLine1: z.string().min(3, 'La dirección es requerida').max(100, 'La dirección no debe exceder los 100 caracteres'),
    addressLine2: z.string().max(100, 'La dirección no debe exceder los 100 caracteres').optional(),
    city: z.string().min(2, 'La ciudad es requerida').max(50, 'La ciudad no debe exceder los 50 caracteres'),
    state: z.string().min(2, 'El estado es requerida').max(50, 'El estado no debe exceder los 50 caracteres'),
    postalCode: z.string().max(10, 'El codigo postal no debe exceder los 10 caracteres').optional(),
    country: z.string().min(1, 'El pais es requerido')
})


// Schema de formulario para agregar nuevo producto
const isContentEmpty = (value) => {
  if(!value || !Array.isArray(value.content) || value.content.length == 0) {
    return true
  }


  return !value.content.some(node => node.type === 'paragraph' && node.content && Array.isArray(node.content) && node.content.some(textNode => textNode.type === 'text' && textNode.text && textNode.text.trim() !== ''))
}

export const productSchema = z.object({
  name: z.string().min(1, 'El nombre del producto es obligatorio'),
  brand: z.string().min(1, 'La marca del producto es obligatoria'),
  slug: z.string().min(1, 'El slug del producto es obligatorio').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  features: z.array(z.object({
    value: z.string().min(1, 'La característica no puede estar vacía')
  })),
  description: z.custom(value => !isContentEmpty(value), {message: 'La descripción no puede estar vacia'}),
  variants: z.array(z.object({
    id: z.string().optional(),
    stock: z.number(),
    price: z.number().min(1, 'El precio debe ser mayor a 0'),
    storage: z.string().min(1, 'El almacenamiento es requerido'),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$|^(?:rgb|hsl)a?\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+))?\s*\)$/, 'El color debe ser un valor valido en formato hexadecimal, RGB o HSL'),
    colorName: z.string().min(1, 'El nombre del color es obligatorio')
  })).min(1, 'Debe haber al menos una variante'),
  images: z.array(z.any()).min(1, 'Debe haber al menos una imagen')
})