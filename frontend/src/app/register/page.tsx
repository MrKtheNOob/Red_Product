"use client"
import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/lib/helpers";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useRouter } from "next/navigation";

export function Register() {
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const username = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const terms = (form.elements.namedItem("terms") as HTMLInputElement)
      .checked;

    if (!terms) {
      toast.error("Vous devez accepter les termes et la politique.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(BASE_URL + "/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        toast.success("Inscription réussie !");
        form.reset();
        router.replace("/login");
      } else {
        const data = await res.json();
        toast.error(
          data?.username?.[0] ||
            data?.email?.[0] ||
            data?.password?.[0] ||
            "Erreur lors de l'inscription."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur réseau.");
    } finally {
      setLoading(false);
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
        <div className="w-full max-w-sm h-[80%] bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-black text-lg mb-6 ">
            Inscrivez-vous en tant que Admin
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Nom */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nom"
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none"
                required
              />
            </div>

            {/* Mot de passe */}
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe"
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none"
                required
              />
            </div>

            {/* Checkbox for terms and conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="form-checkbox h-4 w-4 text-gray-600 bg-gray-700 border-gray-600 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 text-gray-600 text-lg">
                Accepter les termes et la politique
              </label>
            </div>

            {/* Sign-up Button */}
            <button
              type="submit"
              className="w-full bg-[#45484b] text-white font-semibold py-2 rounded-md focus:outline-none text-lg"
              disabled={loading}
            >
              {loading ? "En cours..." : "S'inscrire"}
            </button>
          </form>
        </div>
        <p className="py-5 font-normal">
          Vous avez déja un compte ?{" "}
          <Link href="/login" className="text-amber-300 font-bold">
            Se connecter
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
