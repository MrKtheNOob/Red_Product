import Image from "next/image";
import Link from "next/link";

function login() {
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
          <h1 className="mb-6 ">Mot de passe oublié?</h1>
          <p >
            Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
            instructions sur la façon de modifier votre mot de passe.
          </p>
    
          <form className="flex flex-col gap-5 mt-5">
            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
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
        </div>
        <p className="py-5 font-semibold">
          Revenir à la <Link href="/forgot-password" className="text-amber-300 font-bold">connexion</Link>
        </p>
     
      </div>
    </>
  );
}

export default login;
