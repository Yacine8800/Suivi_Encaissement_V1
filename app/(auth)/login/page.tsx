"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import IconEye from "@/components/icon/icon-eye";
import ForgotPasswordModal from "@/components/auth/components/modals/ForgotPasswordModal";
import { useRouter } from "next/navigation";

const ComponentsAuthLoginForm = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for the modal
	const [isAnimating, setIsAnimating] = useState(false); // State for the animation

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

	// const submitForm = (e: any) => {
	// 	e.preventDefault();
	// 	router.push("/dashboard");
	// };

	// Step 1: Handle the form submission with animation
	const submitForm = (e: any) => {
		e.preventDefault();
		setIsAnimating(true); // Start the animation

		// Delay the redirection to allow time for the animation to complete
		setTimeout(() => {
			router.push("/dashboard");
		}, 1500); // Adjust the timeout to match the duration of the animation
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	// return (
	// 	<div className="relative flex h-screen items-center justify-center overflow-hidden">
	// 		{/* Dividing the page into two sections */}
	// 		<div className="absolute inset-0 flex">
	// 			<div className="relative flex w-1/2 items-center justify-center border-r-4 border-white bg-[#FFDFBD]">
	// 				{/* Left animated SVGs or images */}
	// 			</div>
	// 			<div className="relative flex w-1/2 items-center justify-center border-l-4 border-white bg-[#F07D00]">
	// 				{/* Right animated SVGs or images */}
	// 			</div>
	// 		</div>
	// 		{/* Logo at the top left */}
	// 		<div className="absolute left-5 top-5 z-10">
	// 			<Image
	// 				width={181}
	// 				height={82}
	// 				src="/assets/images/auth/logo.png" // Path to the logo
	// 				alt="Logo"
	// 				className="h-12 w-auto"
	// 			/>
	// 		</div>
	// 		<div className="absolute bottom-0 left-6 z-10">
	// 			<Image
	// 				width={181}
	// 				height={82}
	// 				src="/assets/images/auth/cie-agent.png" // Path to the logo
	// 				alt="Logo"
	// 				className="h-80 w-auto"
	// 			/>
	// 		</div>
	// 		{/* Icon design */}
	// 		{/* <div className="absolute bottom-9 left-9 z-10">
	// 			<Image
	// 				width={181}
	// 				height={82}
	// 				src="/assets/images/auth/blob.svg" // Path to the logo
	// 				alt="Logo"
	// 				className=" w-auto"
	// 			/>
	// 		</div> */}
	// 		<div className="right-50 absolute top-0 z-10">
	// 			<Image
	// 				width={281}
	// 				height={182}
	// 				src="/assets/images/auth/light-vertical.png" // Path to the logo
	// 				alt="light"
	// 				className="h-72 w-auto"
	// 			/>
	// 		</div>
	// 		{/*
	// 		<div className="absolute left-1/3 top-96 z-10">
	// 			<Image
	// 				width={181}
	// 				height={82}
	// 				src="/assets/images/auth/panneau-thunder.png" // Path to the logo
	// 				alt="Logo"
	// 				className="h-28 w-auto"
	// 			/>
	// 		</div> */}
	// 		ˀ
	// 		{/* Login box with conditional padding */}
	// 		<div
	// 			className={`relative z-20 w-full max-w-lg rounded-[30px] bg-white p-8 shadow-xl ${
	// 				isSmallScreen ? "mx-4" : ""
	// 			}`} // Adding 'mx-4' padding on small screens
	// 		>
	// 			{/* Title and logo in the form */}
	// 			<div className="flex items-center justify-between">
	// 				<h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
	// 				<Image
	// 					width={100}
	// 					height={100}
	// 					src={"/assets/images/logo2.png"}
	// 					alt=""
	// 				/>
	// 			</div>
	// 			<p className="font-bold text-gray-500">
	// 				Bienvenue à Suivi Encaissement !
	// 			</p>

	// 			<form className="space-y-6 pt-5" onSubmit={submitForm}>
	// 				<div>
	// 					<label
	// 						htmlFor="Email"
	// 						className="block text-sm font-medium text-gray-700"
	// 					>
	// 						Entrez votre adresse mail
	// 					</label>
	// 					<div className="relative mt-1">
	// 						<input
	// 							id="Email"
	// 							type="email"
	// 							placeholder="johndoe@gmail.com"
	// 							className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
	// 							required
	// 						/>
	// 					</div>
	// 				</div>
	// 				<div>
	// 					<label
	// 						htmlFor="Password"
	// 						className="block text-sm font-medium text-gray-700"
	// 					>
	// 						Entrez votre mot de passe
	// 					</label>
	// 					<div className="relative mt-1">
	// 						<input
	// 							id="Password"
	// 							type={showPassword ? "text" : "password"}
	// 							placeholder="Mot de passe"
	// 							className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
	// 							required
	// 						/>
	// 						<span
	// 							className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
	// 							onClick={togglePasswordVisibility}
	// 						>
	// 							<IconEye
	// 								className={showPassword ? "text-orange-500" : "text-gray-500"}
	// 							/>
	// 						</span>
	// 					</div>
	// 				</div>
	// 				<div className="flex justify-end">
	// 					<button
	// 						type="button"
	// 						className="text-sm text-gray-500 hover:text-orange-500"
	// 						onClick={openModal} // Open the modal when clicked
	// 					>
	// 						Mot de passe oublié?
	// 					</button>
	// 				</div>
	// 				<button
	// 					type="submit"
	// 					className="w-full rounded-md bg-orange-500 px-4 py-3 text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
	// 				>
	// 					Se Connecter
	// 				</button>
	// 			</form>
	// 		</div>
	// 		{/* Modal */}
	// 		{isModalOpen && <ForgotPasswordModal closeModal={closeModal} />}
	// 	</div>
	// );
	return (
		<div className="relative flex h-screen items-center justify-center overflow-hidden">
			{/* Dividing the page into two sections */}
			<div className="absolute inset-0 flex">
				<div
					className={`relative flex w-1/2 items-center justify-center border-r-4 border-white bg-[#FFDFBD] transition-transform duration-1000 `}
				>
					{/* Left animated SVGs or images */}
				</div>
				<div
					className={`relative flex w-1/2 items-center justify-center border-l-4 border-white bg-[#F07D00] transition-transform duration-1000 `}
				>
					{/* Right animated SVGs or images */}
				</div>
			</div>
			{/* Logo at the top left */}
			<div className="absolute left-5 top-5 z-10">
				<Image
					width={181}
					height={82}
					src="/assets/images/auth/logo.png" // Path to the logo
					alt="Logo"
					className="w-auto"
				/>
			</div>
			{/* Thunder at the top left */}
			<div className="absolute bottom-0 left-0 z-0">
				<Image
					width={181}
					height={82}
					src="/assets/images/auth/electric-circuit-white.svg" // Path to the logo
					alt="Logo"
					className="h-[600px] w-auto rotate-90 opacity-90"
				/>
			</div>
			{/* Thunder at the top left */}
			<div className="absolute right-0 top-0 z-0 -rotate-90">
				<Image
					width={181}
					height={82}
					src="/assets/images/auth/electric-circuit-white.svg" // Path to the logo
					alt="Logo"
					className="h-[600px] w-auto opacity-90 "
				/>
			</div>
			{/* <div className="absolute bottom-0 left-6 z-10">
				<Image
					width={181}
					height={82}
					src="/assets/images/auth/cie-agent.png" // Path to the logo
					alt="Logo"
					className="h-80 w-auto"
				/>
			</div> */}

			{/* Animated light-vertical */}
			<div
				className={`right-50 absolute top-0 z-10 transition-transform duration-1000 ease-in-out ${
					isAnimating ? "translate-y-[35vh]" : ""
				}`}
			>
				<Image
					width={281}
					height={182}
					src="/assets/images/auth/light-vertical.png" // Path to the logo
					alt="light"
					className="h-72 w-auto"
				/>
			</div>

			{/* Login box with conditional padding and disappear animation */}
			<div
				className={`relative z-20 w-full max-w-lg rounded-[30px] bg-white p-8 shadow-xl transition-opacity duration-500 ease-in-out ${
					isAnimating ? "opacity-0" : "opacity-100"
				} ${isSmallScreen ? "mx-4" : ""}`}
			>
				{/* Title and logo in the form */}
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
					<Image
						width={100}
						height={100}
						src={"/assets/images/logo2.png"}
						alt=""
					/>
				</div>
				<p className="font-bold text-gray-500">
					Bienvenue à Suivi Encaissement !
				</p>

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
								className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
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
								className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
								required
							/>
							<span
								className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
								onClick={togglePasswordVisibility}
							>
								<IconEye
									className={showPassword ? "text-orange-500" : "text-gray-500"}
								/>
							</span>
						</div>
					</div>
					<div className="flex justify-end">
						<button
							type="button"
							className="text-sm text-gray-500 hover:text-orange-500"
							onClick={openModal}
						>
							Mot de passe oublié?
						</button>
					</div>
					<button
						type="submit"
						className="w-full rounded-md bg-orange-500 px-4 py-3 text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
					>
						Se Connecter
					</button>
				</form>
			</div>
			{/* Modal */}
			{isModalOpen && <ForgotPasswordModal closeModal={closeModal} />}
		</div>
	);
};

export default ComponentsAuthLoginForm;
