import Image from "next/image";
import Link from "next/link";

function login() {
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen font-sans p-4">
          <span>
        <Image src="/logo.png" alt="red product" width={260} height={90} className="pb-10" />
      </span>
        <div className="w-full max-w-sm h-[80%] bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-black text-lg mb-6 ">
            Inscrivez-vous en tant que Admin
          </h2>

          <form className="flex flex-col gap-5 ">

            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none "
              />
            </div>

            {/* Mot de passe */}
            <div>
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                className="w-full text-black placeholder-gray-500 border-b border-gray-500 py-2 focus:outline-none "
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
            >
              Se connecter
            </button>
          </form>
        </div>
        <p  className="text-amber-300 font-bold my-5"><Link href="/forgot-password">Mot de passe oublié?</Link></p>
        <p>Vous avez déja un compte ? <Link href="/login" className="text-amber-300 font-bold">Se connecter</Link></p>
      </div>
    </>
      
 
  )
}

export default login
