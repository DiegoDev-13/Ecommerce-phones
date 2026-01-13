import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {useNavigate} from 'react-router-dom'
import { productSchema } from "../../../lib/validators"
import { IoIosArrowBack } from "react-icons/io";
import { SectionFormProduct } from './SectionFormProduct'
import { InputForm } from "./InputForm";
import { FeaturesInput } from "./FeaturesInput";
import { useEffect } from "react";
import { generateSlug } from "../../../helpers";
import { VariantsInput } from "./VariantsInput";
import { UpLoaderImages } from "./UpLoaderImages";
import { Editor } from "./Editor";

export const FormProduct = ({titleForm}) => {

    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}, setValue, watch, control} = useForm({
        resolver: zodResolver(productSchema)
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    const watchName = watch('name')

    useEffect(() => {
        if(!watchName) return 

        const generatedSlug = generateSlug(watchName)

        setValue('slug', generatedSlug, {shouldValidate: true})

    }, [watchName, setValue])
    

  return (
    <div className="flex flex-col gap-6 relative">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <button className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group hover:scale-105 cursor-pointer" onClick={() => navigate(-1)}>
                    <IoIosArrowBack size={18} className="transition-all group-hover:scale-125" />
                </button>
                <h2 className="font-bold tracking-tight text-2xl capitalize ">{titleForm}</h2>
            </div>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1" onSubmit={onSubmit}>
            <SectionFormProduct titleSection='Detalles del Producto' className='lg:col-span-2 lg:row-span-2'>
                <InputForm
                    type='text'
                    placeholder='Ejemplo: iphone 16 pro max'   
                    label='nombre'
                    name='name' 
                    register={register}
                    errors={errors}
                    required={true}
                />

                <FeaturesInput control={control} errors={errors} />
            </SectionFormProduct>

            <SectionFormProduct titleSection="Slug">

                <InputForm 
                    type='text'
                    placeholder='iphone-16-pro-max'
                    label='Slug'
                    name='slug'
                    register={register}
                    errors={errors}
                />

                <InputForm 
                    type='text'
                    placeholder='Apple'
                    label='Marca'
                    name='brand'
                    register={register}
                    errors={errors}
                    required={true}
                />

            </SectionFormProduct>

            <SectionFormProduct titleSection='Variantes del Producto' className='lg:col-span-2 h-fit'>
                <VariantsInput control={control} errors={errors} register={register} />
            </SectionFormProduct>

            <SectionFormProduct titleSection="Imágenes del producto">
                <UpLoaderImages errors={errors} setValue={setValue} watch={watch} />
            </SectionFormProduct>

            <SectionFormProduct titleSection='Descripcion del producto' className='col-span-full' >
                <Editor setvalue={setValue} errors={errors} />
            </SectionFormProduct>

            <div className="flex gap-3 absolute top-0 right-0">
                <button className="btn-secondary-outline" type="button" onClick={() => navigate(-1)}>
                    Cancelar
                </button>
                <button className="btn-primary" type="submit">
                    Guardar Producto
                </button>
            </div>
        </form>

    </div>
  )
}