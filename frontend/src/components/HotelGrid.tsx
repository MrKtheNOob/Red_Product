import React from 'react'
import HotelCard from './HotelCard'
import { HotelCardProps } from './HotelCard'
interface HotelGridProps{
    hotels: HotelCardProps[]
}
function HotelGrid({hotels}:HotelGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.title}
                title={hotel.title}
                address={hotel.address}
                price={hotel.price}
                imageSrc={hotel.imageSrc}
              />
            ))}
          </div>
  )
}

export default HotelGrid
