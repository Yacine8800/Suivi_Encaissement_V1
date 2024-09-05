"use client";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toggleSidebar } from "@/store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "@/store";
import { useState, useEffect } from "react";
import IconCaretsDown from "@/components/icon/icon-carets-down";
import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard";
import IconMinus from "@/components/icon/icon-minus";
import IconMenuTables from "@/components/icon/menu/icon-menu-tables";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/i18n";
import React from "react";
import IconCaretDown from "../icon/icon-caret-down";
import IconDesktop from "../icon/icon-desktop";
import IconPencilPaper from "../icon/icon-pencil-paper";
import IconInfoCircle from "../icon/icon-info-circle";
import IconNotesEdit from "../icon/icon-notes-edit";
import IconMessagesDot from "../icon/icon-messages-dot";
import IconMenuCharts from "../icon/menu/icon-menu-charts";
import IconMenuFontIcons from "../icon/menu/icon-menu-font-icons";
import IconMenuWidgets from "../icon/menu/icon-menu-widgets";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="h-full bg-white dark:bg-black">
          <br />
          <img
            className="ml-[70px] w-[120px] flex-none"
            src="/assets/images/logo3.svg"
            alt="logo"
          />
          <div className="flex items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="main-logo mx-auto flex shrink-0 items-center justify-center"
            >
              {/* <span className="ml-4 text-center align-middle text-sm font-semibold text-[#EF7D00]  lg:inline">
                SUIVI ENCAISSEMENT
              </span> */}
            </Link>

            <button
              type="button"
              className="collapse-icon -mt-40 flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>

          <br />
          <br />
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "dashboard" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("dashboard")}
                >
                  <div className="flex items-center">
                    <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                      {t("Menu")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "dashboard"
                        ? "-rotate-90 rtl:rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "dashboard" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li className="sub-menu nav-item">
                      <Link href="/dashboard" className="group">
                        <div className="flex items-center">
                          <IconDesktop className="shrink-0 group-hover:!text-primary" />
                          <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                            {t("Mon Tableau de board")}
                          </span>
                        </div>
                      </Link>
                    </li>

                    <li className="sub-menu nav-item">
                      <Link href="/encaissement" className="group">
                        <div className="flex items-center">
                          <IconNotesEdit className="shrink-0 group-hover:!text-primary" />
                          <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                            {t("Mes Encaissements")}
                          </span>
                        </div>
                      </Link>
                    </li>

                    <li className="sub-menu nav-item">
                      <Link href="/valider" className="group">
                        <div className="flex items-center">
                          <IconMessagesDot className="shrink-0 group-hover:!text-primary" />
                          <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                            {t("Encaissement Valider")}
                          </span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
            </ul>

            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
              <IconMinus className="hidden h-5 w-4 flex-none" />
              <span>{t("Administration")}</span>
            </h2>

            <li className="menu nav-item">
              <Link href="/profil" className="group">
                <div className="flex items-center">
                  <IconMenuCharts className="shrink-0 group-hover:!text-primary" />
                  <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                    {t("Profils")}
                  </span>
                </div>
              </Link>
            </li>

            <li className="menu nav-item">
              <Link href="/user" className="group">
                <div className="flex items-center">
                  <IconMenuWidgets className="shrink-0 group-hover:!text-primary" />
                  <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                    {t("Utilisateurs")}
                  </span>
                </div>
              </Link>
            </li>

            <li className="menu nav-item">
              <Link href="/font-icons" className="group">
                <div className="flex items-center">
                  <IconMenuFontIcons className="shrink-0 group-hover:!text-primary" />
                  <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">
                    {t("Roles")}
                  </span>
                </div>
              </Link>
            </li>

            <div className="mt-auto p-4">
              <img
                className="w-[220px] flex-none"
                src="/assets/images/pilonne.png"
                alt="logo"
              />
            </div>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
