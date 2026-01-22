

export const Tag = ({type}) => {

    const getTagColor = (type) => {
        const lowerCas = type.toLowerCase()
        if(lowerCas === 'nuevo') return 'bg-blue-500'
        if(lowerCas === 'agotado') return 'bg-red-800'
    }
    
  return (
    <div className={`${getTagColor(type)} text-white w-fit py-1 px-6 rounded`}>
        <p className="uppercase text-xs font-medium">{type}</p>
    </div>
  )
}