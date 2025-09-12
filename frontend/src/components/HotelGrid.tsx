import React from 'react'
import HotelCard from './HotelCard'
import { Hotel } from '@/lib/helpers'
interface HotelGridProps{
    hotels: Hotel[]
    onHotelClick: (hotel: Hotel) => void
}
function HotelGrid({hotels,onHotelClick}:HotelGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.name}
                name={hotel.name}
                address={hotel.address}
                price={hotel.price_per_night + " " + hotel.currency}
                imageSrc={hotel.image}
                onClick={() => onHotelClick(hotel)}
              />
            ))}
          </div>
  )
}

export default HotelGrid
