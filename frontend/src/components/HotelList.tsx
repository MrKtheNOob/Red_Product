import React, { useState } from 'react'
import HotelGrid from './HotelGrid'
import Image from "next/image"
import { Hotel } from '@/lib/helpers'
import EditHotelPopup from './EditHotelPopup';

interface HotelListProps {
  hotels?: Hotel[]
}

function HotelList({ hotels = [] }: HotelListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Open popup for create or edit
  const handleOpen = (hotel?: Hotel) => {
    setSelectedHotel(hotel || null);
    setIsOpen(true);
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-2xl text-gray-800">
          Hôtels{" "}
          <span className="text-gray-500 font-normal ml-2">
            {hotels.length}
          </span>
        </h3>
        <button
          onClick={() => handleOpen()}
          className="mt-4 sm:mt-0 px-6 py-2.5  text-black font-semibold border-1 border-gray-400 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
        >
          <Image src="plus.svg" className="stroke-current text-white" alt="plus" width={20} height={20} />
          Créer un nouveau hôtel
        </button>
      </div>
      {isOpen && (
        <EditHotelPopup
          onClose={() => setIsOpen(false)}
          hotel={selectedHotel}
        />
      )}
      <HotelGrid hotels={hotels} onHotelClick={handleOpen} />
    </main>
  )
}

export default HotelList
