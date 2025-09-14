"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL, getCsrfToken, getHotels, Hotel } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Sidebar from "./HomeSideBar";
import DashboardHeader from "./HomeHeader";
import HotelList from "./HotelList";
import Dashboard from "./Dashboard";
import axios from "axios";

const DashboardContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);
  const [subPage, setSubPage] = useState("dashboard");
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const fetchHotelsData = async () => {
      const result = await getHotels();
      console.log(result.data);
      if (result.data) {
        setFilteredHotels(result.data);
        setHotels(result.data);
        setFilteredHotels(result.data);
      } else if (result.error) {
        toast.error(
          result.error.error || "Erreur lors du chargement des hôtels."
        );
      }
    };
    fetchHotelsData();
  }, [subPage]);
  // redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      toast.error("Vous devez être connecté pour accéder au tableau de bord.");
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    console.log("CRSF token:", getCsrfToken());
    try {
      await axios.post(BASE_URL + "/api/logout/", {}); // no headers needed
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
  const handleOnChangeSearch = (value: string) => {
    console.log("searching for", value);

    const query = value.trim().toLowerCase();

    if (query.length < 2) {
      // show all hotels if query is too short
      setFilteredHotels(hotels);
    } else {
      setFilteredHotels(
        hotels.filter((hotel: Hotel) =>
          hotel.name.toLowerCase().includes(query)
        )
      );
    }
  };

  console.log(filteredHotels);
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
          onChangeSearch={handleOnChangeSearch}
        />
        {subPage == "dashboard" ? (
          <Dashboard />
        ) : (
          <HotelList hotels={filteredHotels} />
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
