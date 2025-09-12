import axios from "axios";

export const BASE_URL = "http://192.168.48.42:8000";

export interface Hotel {
  id: number;
  name: string;
  email: string;
  address: string;
  user: number;
  price_per_night: number;
  currency: string;
  phone: string;
  image: string;
}

export interface Error {
  error: string;
}

export type Result<T> = {
  data: T | null;
  error: Error | null;
};

export function getCsrfToken() {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : "";
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getHotels(): Promise<Result<Hotel[]>> {
  try {
    const result = await axios.get(BASE_URL + "/api/hotels/", {
      withCredentials: true, headers: {
        "X-CSRFToken": getCsrfToken(),
      },
    });
    console.log(result.data);
    return { data: result.data, error: null };
  } catch (error: unknown) {
    console.log(error);
    let message = "Erreur inconnue";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        error.message ||
        "Erreur lors de la récupération des hôtels";
    }
    return { data: null, error: { error: message } };
  }
}

export async function createHotel(hotelData: {
  name: string;
  email: string;
  address: string;
  price_per_night: number;
  currency: string;
  phone: string;
  image: File | string;
}): Promise<Result<Hotel>> {
  try {
    const formData = new FormData();
    formData.append("name", hotelData.name);
    formData.append("email", hotelData.email);
    formData.append("address", hotelData.address);
    formData.append("price_per_night", String(hotelData.price_per_night));
    formData.append("currency", hotelData.currency);
    formData.append("phone", hotelData.phone);
    if (hotelData.image instanceof File) {
      formData.append("image", hotelData.image);
    } else {
      formData.append("image", hotelData.image);
    }

    const result = await axios.post(BASE_URL + "/api/hotels/", formData, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCsrfToken(),
        "Content-Type": "multipart/form-data",
      },
    });
    return { data: result.data, error: null };
  } catch (error: unknown) {
    let message = "Erreur inconnue";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        error.message ||
        "Erreur lors de la création de l'hôtel";
    }
    return { data: null, error: { error: message } };
  }
}

export async function updateHotel(
  id: number,
  hotelData: {
    name?: string;
    email?: string;
    address?: string;
    price_per_night?: number;
    currency?: string;
    phone?: string;
    image?: File | string | null;
  }
): Promise<Result<Hotel>> {
  try {
    const formData = new FormData();
    if (hotelData.name !== undefined) formData.append("name", hotelData.name);
    if (hotelData.email !== undefined) formData.append("email", hotelData.email);
    if (hotelData.address !== undefined) formData.append("address", hotelData.address);
    if (hotelData.price_per_night !== undefined) formData.append("price_per_night", String(hotelData.price_per_night));
    if (hotelData.currency !== undefined) formData.append("currency", hotelData.currency);
    if (hotelData.phone !== undefined) formData.append("phone", hotelData.phone);
    if (hotelData.image !== undefined && hotelData.image !== null) {
      if (hotelData.image instanceof File) {
        formData.append("image", hotelData.image);
      } else {
        formData.append("image", hotelData.image);
      }
    }

    const result = await axios.patch(
      `${BASE_URL}/api/hotels/${id}/`,
      formData,
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCsrfToken(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { data: result.data, error: null };
  } catch (error: unknown) {
    let message = "Erreur inconnue";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        error.message ||
        "Erreur lors de la mise à jour de l'hôtel";
    }
    return { data: null, error: { error: message } };
  }
}

export async function deleteHotel(id: number): Promise<Result<null>> {
  try {
    await axios.delete(`${BASE_URL}/api/hotels/${id}/`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCsrfToken(),
      },
    });
    return { data: null, error: null };
  } catch (error: unknown) {
    let message = "Erreur inconnue";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data?.error ||
        error.response?.data?.detail ||
        error.message ||
        "Erreur lors de la suppression de l'hôtel";
    }
    return { data: null, error: { error: message } };
  }
}
