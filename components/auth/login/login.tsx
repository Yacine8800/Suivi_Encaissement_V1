import LanguageDropdown from "@/components/language-dropdown";
import { Metadata } from "next";

import React from "react";
import ComponentsAuthLoginForm from "../components-auth-login-form";

export const metadata: Metadata = {
  title: "Login Boxed",
};

const BoxedSignIn = () => {
  return (
    <div>
      <div className="absolute inset-0">
        <img
          src="/assets/images/auth/bg-gradient.png"
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <img
          src="/assets/images/auth/coming-soon-object1.png"
          alt="image"
          className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
        />
        <img
          src="/assets/images/auth/coming-soon-object2.png"
          alt="image"
          className="absolute left-24 top-0 h-40 md:left-[30%]"
        />
        <img
          src="/assets/images/auth/coming-soon-object3.png"
          alt="image"
          className="absolute right-0 top-0 h-[300px]"
        />
        <img
          src="/assets/images/auth/polygon-object.svg"
          alt="image"
          className="absolute bottom-0 end-[28%]"
        />
        <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
          <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
            {/* <div className="absolute end-6 top-6">
              <LanguageDropdown />
            </div> */}
            <div className="mx-auto w-full max-w-[440px]">
              <div className="mb-10 text-center">
                <img
                  src="/assets/images/logo.png"
                  alt="image"
                  className="mx-auto h-[60px] w-[150px]"
                />

                <br />
                <br />
                <h1 className="text-center text-3xl font-bold uppercase !leading-snug text-[#EF7D00] md:text-4xl">
                  Connexion
                </h1>
                <p className="text-sm font-light leading-normal text-white-dark">
                  Saisissez vos informations de connexion pour accéder à votre
                  espace
                </p>
              </div>
              <ComponentsAuthLoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxedSignIn;
