import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createHotel, updateHotel, deleteHotel, Hotel } from "@/lib/helpers";
import { toast } from "react-toastify";

interface EditHotelPopupProps {
  onClose: () => void;
  hotel?: Hotel | null; // If hotel is provided, we're in edit mode
}

type FormData = {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  price: string;
  currency: string;
  photo: File | null;
};

function EditHotelPopup({ onClose, hotel }: EditHotelPopupProps) {
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    price: "",
    currency: "XOF",
    photo: null,
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name,
        address: hotel.address,
        email: hotel.email,
        phoneNumber: hotel.phone,
        price: hotel.price_per_night.toString(),
        currency: hotel.currency,
        photo: null, // file input intentionally left blank
      });
    }
  }, [hotel]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        photo: e.target.files![0],
      }));
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async () => {
    try {
      if (hotel) {
        // Update mode
        const result = await updateHotel(hotel.id, {
          name: formData.name,
          address: formData.address,
          email: formData.email,
          phone: formData.phoneNumber,
          price_per_night: Number(formData.price),
          currency: formData.currency,
          image: formData.photo ? formData.photo : undefined,
        });
        if (result.data) {
          toast.success("Hôtel modifié avec succès !");
          onClose();
        } else if (result.error) {
          toast.error(
            result.error.error || "Erreur lors de la modification de l'hôtel."
          );
          console.error(result.error);
        }
      } else {
        // Create mode
        const result = await createHotel({
          name: formData.name,
          address: formData.address,
          email: formData.email,
          phone: formData.phoneNumber,
          price_per_night: Number(formData.price),
          currency: formData.currency,
          image: formData.photo as File,
        });
        if (result.data) {
          toast.success("Hôtel créé avec succès !");
          onClose();
        } else if (result.error) {
          toast.error(
            result.error.error || "Erreur lors de la création de l'hôtel."
          );
          console.error(result.error);
        }
      }
    } catch (err) {
      toast.error("Erreur inattendue lors de l'enregistrement.");
      console.error(err);
    }
  };

  // Delete hotel handler
  const handleDelete = async () => {
    if (!hotel) return;
    if (!window.confirm("Voulez-vous vraiment supprimer cet hôtel ?")) return;
    try {
      const result = await deleteHotel(hotel.id);
      if (!result.error) {
        toast.success("Hôtel supprimé avec succès !");
        onClose();
      } else {
        toast.error(result.error.error || "Erreur lors de la suppression.");
        console.error(result.error);
      }
    } catch (err) {
      toast.error("Erreur inattendue lors de la suppression.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur overflow-y-auto h-full w-full flex justify-center items-center p-4 z-50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            <Image
              src="/arrow-left.png"
              alt="arrow-left"
              width={30}
              height={20}
            />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {hotel ? "MODIFIER L'HÔTEL" : "CRÉER UN NOUVEAU HÔTEL"}
          </h2>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom de l'hôtel */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nom de {"l'hôtel"}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="CAP Marniane"
              />
            </div>
            {/* Adresse */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Les îles du saloum, Mar Lodj"
              />
            </div>
            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="information@gmail.com"
              />
            </div>
            {/* Numéro de téléphone */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+221 77 777 77 77"
              />
            </div>
            {/* Prix par nuit */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Prix par nuit
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="25.000 XOF"
              />
            </div>
            {/* Devise */}
            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Devise
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="F XOF">F XOF</option>
                <option value="Euro">Euro</option>
                <option value="Dollar">Dollar</option>
              </select>
            </div>
          </div>

          {/* Photo Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ajouter une photo
            </label>
            <label
              htmlFor="file-upload"
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 
               border-dashed rounded-md cursor-pointer"
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 
                 01-4 4H12a4 4 0 01-4-4v-8m12-4h8m-8-4a4 
                 4 0 110 8 4 4 0 010-8zm-8 16a4 4 0 100 
                 8 4 4 0 000-8z"
                  />
                </svg>
                <p className="text-sm text-gray-500">
                  {fileName
                    ? `Selected: ${fileName}`
                    : hotel && hotel.image
                    ? "Image actuelle: " + hotel.image.split("/").pop()
                    : "Ajouter une photo"}
                </p>
              </div>
              {/* hidden input */}
              <input
                id="file-upload"
                name="photo"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="mt-8 flex justify-between">
            {hotel && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 transition-colors duration-200"
              >
                Supprimer
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#45484b] text-white font-semibold rounded-md shadow-lg hover:bg-gray-900 transition-colors duration-200"
            >
              {hotel ? "Modifier" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHotelPopup;
