"use client";
import IconEye from "@/components/icon/icon-eye";
import { useRouter } from "next/navigation";
import React from "react";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const ComponentsAuthLoginForm = () => {
    const router = useRouter();
    const submitForm = (e: any) => {
        e.preventDefault();
        router.push("/dashboard");
    };



    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#FFDFBD] to-[#F07D00]">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
                <h1>Bienvenue à Suivi Encaissement</h1>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Login
                </h2>
                <form className="space-y-6 pt-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                        <label htmlFor="Password" className="flex text-sm justify-between font-medium text-gray-700 dark:text-gray-300">
                            Mot de passe
                            <IconEye></IconEye>
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="Password"
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 text-white bg-[#F07D00] hover:bg-[#F07D00] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F07D00] dark:bg-[#F07D00]-500 dark:hover:bg-[#F07D00]"
                    >
                        Connexion
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComponentsAuthLoginForm;
