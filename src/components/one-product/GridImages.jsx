import { useState } from "react"

export const GridImages = ({images}) => {

    const [activeImage, setActiveImage] = useState(images[0])

    const handleImageClick = (image) => {
        setActiveImage(image)
    }

  return (
    <div className="flex-1 flex flex-col gap-3 relative">
        <div className="bg-[#f2f2f2] h-125 p-4">
            <img src={activeImage} alt="imagen de producto" className="h-full w-full object-contain"/>
        </div>

        {/* Miniaturas */}
        <div className="flex mt-4 gap-2">
            {
                images.map((img, index) => (
                    <button key={index} onClick={() => handleImageClick(img)} className={`w-16 h-16 p-1 border ${activeImage === img ? 'border-black' : 'border-transparent'} rounded-lg hover:border-black focus:outline-none`}>
                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                    </button>
                ))
            }
        </div>

    </div>
  )
} 