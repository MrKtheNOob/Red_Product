"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/lib/helpers";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    console.log("Login payload:", { email, password });

    try {
      const res = await axios.post<{ email: string; password: string }>(
        `${BASE_URL}/api/login/`,
        { email: email, password: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Login response:", res.data);
      toast.success("Connexion réussie !");
      router.replace("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("Login error:", err.response?.data || err.message);
        toast.error(
          err.response?.data?.error ||
            err.response?.data?.detail ||
            "Erreur lors de la connexion."
        );
      } else {
        console.log("Unexpected login error:", err);
        toast.error("Erreur lors de la connexion.");
      }
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

          <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none "
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
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none "
                required
              />
            </div>

            {/* Checkbox for terms and conditions */}
            <div className="flex items-center mt-8">
              <input
                type="checkbox"
                id="terms"
                className="form-checkbox h-4 w-4 text-gray-600 bg-gray-700 border-gray-600 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="ml-2 text-gray-600 text-lg">
                Gardez-moi connecté
              </label>
            </div>

            {/* Sign-up Button */}
            <button
              type="submit"
              className="w-full bg-[#45484b] text-white font-bold py-2 rounded-md focus:outline-none text-lg"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
        <p className="text-amber-300 font-bold my-5">
          <Link href="/forgot">Mot de passe oublié?</Link>
        </p>
        <p>
          Vous {"n'avez"} pas de compte ?{" "}
          <Link href="/register" className="text-amber-300 font-bold">
            {"S'inscrire"}
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
