"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios"; 
import { BASE_URL } from "@/lib/helpers";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors

    try {
      // The API endpoint on your Django backend
      const response = await axios.post(BASE_URL+"/api/password-reset/request/", {
        email,
      });

      // Handle a successful response from the backend
      setMessage(response.data.message);
      
    } catch (err) {
        // Check if the error is an AxiosError
        if (axios.isAxiosError(err)) {
            // Now TypeScript knows that 'err' has a 'response' property
            const errorMessage = err.response?.data.error || "Une erreur est survenue.";
            setError(errorMessage);
        } else {
            // Handle other types of errors (e.g., network or unknown errors)
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
          <h1 className="mb-6">Mot de passe oublié?</h1>
          <p>
            Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
            instructions sur la façon de modifier votre mot de passe.
          </p>
    
          <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={email} // Controlled component for state management
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              />
            </div>
            {/* Sign-up Button */}
            <button
              type="submit"
              className="w-full bg-[#45484b] text-white font-bold py-2 rounded-md focus:outline-none text-lg"
            >
              Envoyer
            </button>
          </form>

          {/* Displaying messages and errors */}
          {message && <p className="mt-4 text-center text-green-500">{message}</p>}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        </div>
        <p className="py-5 font-semibold">
          Revenir à la <Link href="/login" className="text-amber-300 font-bold">connexion</Link>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword; // Rename the function to ForgotPassword for clarity