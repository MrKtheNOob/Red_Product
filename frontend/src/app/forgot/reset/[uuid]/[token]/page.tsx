"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Import useParams instead of useSearchParams
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/lib/helpers";

export default function ResetPasswordConfirm() {
  const router = useRouter();
  // Use useParams() to get the path parameters from the URL
  const { uuid, token } = useParams();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(
        BASE_URL + "/api/password-reset/confirm/",
        {
          // Send the uuid variable with the key 'uid' to match the Django backend
          uid: uuid,
          token,
          new_password: password,
        }
      );

      setMessage(response.data.message);
      // Redirect to the login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.error || "Une erreur est survenue.";
        setError(errorMessage);
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen font-sans p-4">
        <span>
          <Image
            src="/logo.png"
            alt="red product"
            width={260}
            height={90}
            className="pb-10"
          />
        </span>
        <div className="w-full text-black max-w-sm h-[80%] bg-white rounded-lg shadow-xl p-8">
          <h1 className="mb-6">Réinitialiser votre mot de passe</h1>
          <p>Entrez et confirmez votre nouveau mot de passe ci-dessous.</p>
          <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#45484b] text-white font-bold py-2 rounded-md focus:outline-none text-lg"
            >
              Réinitialiser le mot de passe
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-green-500">{message}</p>
          )}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
        <p className="py-5 font-semibold">
          Revenir à la{" "}
          <Link href="/login" className="text-amber-300 font-bold">
            connexion
          </Link>
        </p>
      </div>
    </>
  );
}
