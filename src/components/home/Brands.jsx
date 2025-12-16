const brands = [
    {
        image: '/brands/Apple-Logo.webp',
        alt: 'Apple'
    },
    {
        image: '/brands/honor-logo.png',
        alt: 'Honor'
    },
    {
        image: '/brands/huawei-logo.png',
        alt: 'Huawei'
    },
    {
        image: '/brands/realme-logo.webp',
        alt: 'Realme'
    },
    {
        image: '/brands/Samsung_Logo.webp',
        alt: 'Samsung'
    },
    {
        image: '/brands/xiaomi-logo.webp',
        alt: 'Xiaomi'
    },
]

export const Brands = () => {
  return (
    <div className="flex flex-col items-center gap-3 pt-16 pb-12">
        <h2 className="font-bold text-2xl">Marcas que disponemos</h2>

        <p className="w-2/3 text-center text-sm md:text-base">
            Tenemos lo mas moderno en tecnologias y los ultimos modelos de celulares disponibles
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8 items-center md:grid-cols-6">
            {
                brands.map((brand, index) => (
                    <div key={index}>
                        <img src={brand.image} alt={brand.alt}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}