"use client";
import IconEye from "@/components/icon/icon-eye";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import IconLockDots from "@/components/icon/icon-lock-dots";

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
    <div className="flex h-screen items-center justify-center">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-[#FFDFBD]"></div>
        <div className="w-1/2 bg-[#F07D00]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
        <h1 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
          Bienvenue à Suivi Encaissement
        </h1>
        <h2 className="mt-2 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Connexion
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
                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <IconEye className={showPassword ? 'text-indigo-500' : 'text-gray-500'} />
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
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
