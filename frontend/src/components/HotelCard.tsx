import { BASE_URL } from "@/lib/helpers";
import Image from "next/image";
export interface HotelCardProps {
  name: string;
  address: string;
  price: string;
  imageSrc: string;
  onClick: () => void;
}
// HotelCard component
function HotelCard({ name, address, price, imageSrc,onClick }: HotelCardProps) {
  const getImageSrc = (image: string) => {
    return image.startsWith("http") ? image : `${BASE_URL}/${image}`;
  };

  return (
    <div onClick={onClick} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-200 cursor-pointer">
      <Image
        className="w-full h-48 object-cover"
        src={getImageSrc(imageSrc)}
        alt={name}
        width={400}
        height={192}
        unoptimized
      />
      <div className="p-4">
        <p className="text-sm text-[#8d4b38] mb-1">{address}</p>
        <h4 className="text-lg font-bold text-gray-800 mb-2">{name}</h4>
        <p className="text-md font-semibold text-gray-700">{price} par nuit</p>
      </div>
    </div>
  );
}
export default HotelCard;
