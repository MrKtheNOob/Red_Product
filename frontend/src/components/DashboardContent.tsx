"use client";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/lib/helpers";

function DashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  // helper: read CSRF token from cookie
  const getCsrfToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return cookie ? cookie.split("=")[1] : "";
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/api/logout/",
        {},
        {
          withCredentials: true, // send sessionid & csrftoken
          headers: {
            "X-CSRFToken": getCsrfToken(), // required for POST
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

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div>
      <ToastContainer />
      <p>Welcome, {user.username}</p>
      <h1>Dashboard Page</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
export default DashboardContent;
