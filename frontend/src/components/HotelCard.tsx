import Image from "next/image";
export interface HotelCardProps {
  title: string;
  address: string;
  price: string;
  imageSrc: string;
}
// HotelCard component
function HotelCard({ title, address, price, imageSrc }: HotelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-200 cursor-pointer">
      <Image
        className="w-full h-48 object-cover"
        src={imageSrc}
        alt={title}
        width={400}
        height={192}
      />
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{address}</p>
        <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
        <p className="text-md font-semibold text-gray-700">{price}</p>
      </div>
    </div>
  );
}
export default HotelCard;
