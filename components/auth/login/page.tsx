"use client";
import IconEye from "@/components/icon/icon-eye";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import IconEyeClose from "@/components/icon/icon-eyeClose";
import IconBolt from "@/components/icon/icon-bolt";

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for the modal

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        handleResize(); // Initial call to set the state correctly
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push("/dashboard");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen items-center justify-center relative overflow-hidden">
            {/* Logo at the top left */}
            <div className="absolute top-5 left-5 z-10">
                <Image
                    width={181}
                    height={82}
                    src="/assets/images/auth/logo.png" // Path to the logo
                    alt="Logo"
                    className="h-12 w-auto"
                />
            </div>
            {/* Dividing the page into two sections */}
            <div className="absolute inset-0 flex">
                <div className="w-1/2 bg-[#FFDFBD] flex items-center justify-center relative">
                    <IconBolt></IconBolt>
                    <div className="flex flex-col mb-8">
                        <Image
                            width={300}
                            height={300}
                            src="/assets/images/auth/envole.png" // Path to the logo
                            alt="Logo"
                        />
                        <Image
                            width={269}
                            height={256}
                            src="/assets/images/auth/scooter.png" // Path to the logo
                            alt="Logo"
                        />
                    </div>

                </div>
                <div className="w-1/2 bg-[#FFFEF9] flex items-center justify-center relative">
                    <Image
                        width={450}
                        height={450}
                        src="/assets/images/auth/float.png" // Path to the logo
                        alt="Logo"
                    />
                    {/* <IconBolt></IconBolt> */}
                </div>
            </div>

            {/* Login box with conditional padding */}
            <div
                className={`relative z-20 w-full max-w-md bg-white rounded-[30px] shadow-xl p-8 ${isSmallScreen ? "mx-4" : ""
                    }`} // Adding 'mx-4' padding on small screens
            >
                {/* Title and logo in the form */}
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
                                {showPassword ? <IconEye
                                    className={showPassword ? "text-orange-500" : "text-gray-500"}
                                /> : <IconEyeClose
                                    className={showPassword ? "text-orange-500" : "text-gray-500"}
                                />}

                            </span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-orange-500"
                            onClick={openModal} // Open the modal when clicked
                        >
                            Mot de passe oublié?
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 text-white bg-orange-500 hover:bg-orange-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Connexion
                    </button>
                </form>
            </div>

            {/* Modal */}
            {isModalOpen && <ForgotPasswordModal closeModal={closeModal} />}
        </div>
    );
};

export default Login;
