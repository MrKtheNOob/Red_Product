import React from 'react'
import HotelGrid from './HotelGrid'
import Image from "next/image"
import { HotelCardProps } from './HotelCard'
interface HotelListProps{
    hotels:HotelCardProps[]
}
function HotelList({hotels}:HotelListProps) {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-2xl text-gray-800">
              Hôtels{" "}
              <span className="text-sm text-gray-500 font-normal ml-2">
                {hotels.length}
              </span>
            </h3>
            <button className="mt-4 sm:mt-0 px-6 py-2.5  text-black font-semibold border-1 border-gray-400 rounded-lg flex items-center justify-center">
              <Image src="plus.svg" className="stroke-current text-white"  alt="plus" width={20} height={20} />
              Créer un nouveau hôtel
            </button>
          </div>

          <HotelGrid hotels={hotels}/>
        </main>
  )
}

export default HotelList
