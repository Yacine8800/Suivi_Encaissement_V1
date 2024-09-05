"use client";
import IconEye from "@/components/icon/icon-eye";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        handleResize(); // Appel initial pour définir correctement l'état
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push("/dashboard");
    };

    return (
        <div className="flex h-screen items-center justify-center relative overflow-hidden">
            {/* Divisant la page en deux sections */}
            <div className="absolute inset-0 flex">
                <div className="w-1/2 bg-[#FFDFBD] flex items-center justify-center relative">
                    {/* SVG ou images animées à gauche */}
                </div>
                <div className="w-1/2 bg-[#F07D00] flex items-center justify-center relative">
                    {/* SVG ou images animées à droite */}
                </div>
            </div>

            {/* Logo en haut à gauche */}
            <div className="absolute top-5 left-5 z-10">
                <Image
                    width={181}
                    height={82}
                    src="/assets/images/auth/logo.png" // Chemin vers le logo
                    alt="Logo"
                    className="h-12 w-auto"
                />
            </div>

            {/* Box de connexion avec padding conditionnel */}
            <div
                className={`relative z-20 w-full max-w-lg bg-white rounded-[30px] shadow-xl p-8 ${isSmallScreen ? "mx-4" : ""
                    }`} // Adding 'mx-4' padding on small screens
            >
                {/* Titre et logo dans le formulaire */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                    <Image
                        width={100}
                        height={100}
                        src={"/assets/images/logo2.png"}
                        alt=""
                    />
                </div>
                <p className="text-gray-500 font-bold">Bienvenue à Suivi Encaissement !</p>

                <form className="space-y-6 pt-5" onSubmit={submitForm}>
                    <div>
                        <label
                            htmlFor="Email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Entrez votre adresse mail
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="Email"
                                type="email"
                                placeholder="johndoe@gmail.com"
                                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="Password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Entrez votre mot de passe
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Mot de passe"
                                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                required
                            />
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <IconEye className={showPassword ? "text-orange-500" : "text-gray-500"} />
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <a
                            href="/forgot-password"
                            className="text-sm text-gray-500 hover:text-orange-500"
                        >
                            Mot de passe oublié?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 text-white bg-orange-500 hover:bg-orange-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Connexion
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
