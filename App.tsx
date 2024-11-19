"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleRTL,
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
} from "@/store/themeConfigSlice";
import Loading from "@/components/layouts/loading";
import { getTranslation } from "@/i18n";

import { TRootState } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ children }: PropsWithChildren) {
  const themeConfig = useSelector((state: TRootState) => state.themeConfig);
  const dispatch = useDispatch();
  const { initLocale } = getTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem("menu") || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem("layout") || themeConfig.layout)
    );
    dispatch(
      toggleRTL(localStorage.getItem("rtlClass") || themeConfig.rtlClass)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem("animation") || themeConfig.animation
      )
    );
    dispatch(
      toggleNavbar(localStorage.getItem("navbar") || themeConfig.navbar)
    );
    dispatch(
      toggleSemidark(localStorage.getItem("semidark") || themeConfig.semidark)
    );
    // locale
    initLocale(themeConfig.locale);

    setIsLoading(false);
  }, [
    dispatch,
    initLocale,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.rtlClass,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.locale,
    themeConfig.semidark,
  ]);

  return (
    <div
      className={`${(themeConfig.sidebar && "toggle-sidebar") || ""} ${
        themeConfig.menu
      } ${themeConfig.layout} ${
        themeConfig.rtlClass
      } main-section relative font-nunito text-sm font-normal antialiased`}
    >
      {isLoading ? <Loading /> : children}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
