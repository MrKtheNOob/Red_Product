"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, getCsrfToken } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Sidebar from "./HomeSideBar";
import DashboardHeader from "./HomeHeader";
import HotelList from "./HotelList";
import Dashboard from "./Dashboard";

// Hotel data (replace with API data in real app)
const hotels = [
  {
    title: "Hôtel Terrou-Bi",
    address: "Boulevard Martin Luther King, Dakar, 11500",
    price: "25.000 XOF par nuit",
    imageSrc:
      "https://placehold.co/600x400/8d8d8d/ffffff.png?text=Hotel+Terrou-Bi",
  },
  {
    title: "King Fahd Palace",
    address: "Rte des Almadies, Dakar",
    price: "20.000 XOF par nuit",
    imageSrc:
      "https://placehold.co/600x400/8d8d8d/ffffff.png?text=King+Fahd+Palace",
  },
  {
    title: "Radisson Blu Hotel",
    address: "Rte de la Corniche, Dakar, 16668",
    price: "22.000 XOF par nuit",
    imageSrc:
      "https://placehold.co/600x400/8d8d8d/ffffff.png?text=Radisson+Blu+Hotel",
  },
  {
    title: "Pullman Dakar Teranga",
    address: "Place de l'Independance, Dakar, 23",
    price: "30.000 XOF par nuit",
    imageSrc:
      "https://placehold.co/600x400/8d8d8d/ffffff.png?text=Pullman+Dakar+Teranga",
  },
  {
    title: "Hôtel Lac Rose",
    address: "Lac Rose, Dakar",
    price: "25.000 XOF par nuit",
    imageSrc:
      "https://placehold.co/600x400/8d8d8d/ffffff.png?text=Hotel+Lac+Rose",
  },
  {
    title: "Hôtel Saly",
    address: "Mbour, Senegal",
    price: "20.000 XOF par nuit",
    imageSrc: "https://placehold.co/600x400/8d8d8d/ffffff.png?text=Hotel+Saly",
  },
  {
    title: "Palm Beach Resort & Spa",
    address: "BPSA Saly 23000",
    price: "22.000 XOF par nuit",
    imageSrc:
      "https://placehold.co/600x400/8d8d8d/ffffff.png?text=Palm+Beach+Resort+%26+Spa",
  },
];

const DashboardContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [subPage, setSubPage] = useState("dashboard");
  const { user, loading } = useAuth();
  const router = useRouter();

  // redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/api/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );
      toast.success("Déconnexion réussie !");
      router.replace("/login");
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.detail ||
            "Erreur lors de la déconnexion."
        );
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-gray-700">Loading...</p>
      </div>
    );
  if (!user) return null;

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
        subPage={subPage}
        setSubPage={setSubPage}
      />
      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <DashboardHeader
          setIsSidebarOpen={setIsSidebarOpen}
          handleLogout={handleLogout}
          user={user}
          subPage={subPage}
        />
        {subPage == "dashboard" ? <Dashboard /> : <HotelList hotels={hotels} />}
      </div>
    </div>
  );
};

export default DashboardContent;
