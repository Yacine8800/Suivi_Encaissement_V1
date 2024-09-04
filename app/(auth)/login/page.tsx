"use client";
import IconEye from "@/components/icon/icon-eye";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import IconLockDots from "@/components/icon/icon-lock-dots";
import Image from "next/image";

const ComponentsAuthLoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center relative overflow-hidden">
      {/* Background à deux couleurs solides */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-[#FFDFBD]"></div>
        <div className="w-1/2 bg-[#F07D00]"></div>
      </div>

      {/* SVG Animés autour du formulaire */}
      {/* <div className="absolute top-0 left-0 z-0">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#F07D00" strokeWidth="2" fill="none" className="animate-pulse" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 z-0">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" stroke="#FFDFBD" strokeWidth="2" fill="none" className="animate-spin-slow" />
        </svg>
      </div> */}

      {/* Logo en haut à gauche */}
      <div className="absolute top-5 left-5">
        <Image
          width={181}
          height={82}
          src="/assets/images/auth/logo.png"
          alt="Logo"
          className="h-12 w-auto"
        />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
        {/* Logo centré au-dessus de "Login" */}
        <div className="flex justify-center mb-4">
          <Image
            width={100}
            height={100}
            src="/assets/images/logo2.png"  // Le chemin du logo ici
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Login
        </h2>
        <form className="space-y-6 pt-5" onSubmit={submitForm}>
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="Email"
                type="email"
                placeholder="Entrez votre Email"
                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-[#F07D00] focus:border-[#F07D00] sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Mot de passe
            </label>
            <div className="relative mt-1">
              <input
                id="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-[#F07D00] focus:border-[#F07D00] sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <IconEye className={showPassword ? 'text-[#F07D00]' : 'text-gray-500'} />
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-[#F07D00] hover:text-[#F07D00] dark:text-[#F07D00] dark:hover:text-[#F07D00]"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-[#F07D00] hover:bg-[#e16d00] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F07D00] dark:bg-[#F07D00]-500 dark:hover:bg-[#F07D00]"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComponentsAuthLoginForm;
