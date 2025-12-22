export const ProductGridSkeleton = ({numberOfProducts}) => {
  return (
    <div className="my-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 animate-pulse">
            {
                Array.from({length: numberOfProducts}).map((_, index) => (
                    <div key={index} className="bg-gray-200 h-62.5">

                    </div>
                ))
            }
        </div>
    </div>
  )
}