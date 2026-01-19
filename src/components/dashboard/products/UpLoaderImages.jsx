import { useEffect, useState } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io";

export const UpLoaderImages = ({setValue, watch, errors}) => {

    const [images, setImages] = useState([])

    // Verificar si hay errores con las imagenes 
    const formImages = watch('images')

    // Cargar imagenes existentes si las hay en el formulario
    useEffect(() => {
      if(formImages && formImages.length > 0 && images.length == 0) {
        const existingImages = formImages.map(url => ({
            previewUrl: url
        }))
        setImages(existingImages)

        // Actualizar el valor del formulario
        setValue('images', formImages)
      }
    }, [formImages, images.length, setValue])
    

    const handleImageChange = (e) => {
        if(e.target.files) {
            const newImages = Array.from(e.target.files).map(file => ({
                file,
                previewUrl: URL.createObjectURL(file)
            }))

            const updateImages = [...images, ...newImages]
            setImages(updateImages)

            setValue('images', updateImages.map(img => img.file || img.previewUrl))
        }
    }

    const handleRemoveImage = (index) => {
        const updateImages = images.filter((_, i) => i !== index)
        setImages(updateImages)
        
        setValue('images', updateImages.map(img => img.file || img.previewUrl))
    }


  return (
    <>
        <input type="file" accept="image/*" multiple className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounderd-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 file:hover:bg-slate-200 file:cursor-pointer" onChange={handleImageChange} />

        <div className="grid grid-cols-4 lg:grid-cols-2 gap-4">
            {
                images.map((image, index) => (
                    <div key={index}>
                        <div className="hover border-gray-200 w-full h-20 rounded-md p-1 relative lg:h-28">
                            <img src={image.previewUrl} alt={`preview ${index}`} className="rounded-md w-full h-full object-contain" />
                            <button type="button" onClick={() => handleRemoveImage(index)} className="flex justify-end absolute -top-3 -right-4 hover:scale-110 transition-all z-10 ">
                                <IoIosCloseCircleOutline size={22} className="text-red-500 cursor-pointer" />
                            </button>
                        </div>
                    </div>
                ) )
            }
        </div>

        {
            formImages?.length === 0 && errors.images && (
                <p className="text-xs text-red-500 mt-1">
                    {errors.images.message}
                </p>
            )
        }
    </>
  )
}