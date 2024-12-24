"use client";

import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { toggleSidebar } from "@/store/themeConfigSlice";
import { useState, useEffect, Key } from "react";
import { usePathname } from "next/navigation";
import { getTranslation } from "@/i18n";
import IconDesktop from "../icon/icon-desktop";
import IconNotesEdit from "../icon/icon-notes-edit";
import IconMenuCharts from "../icon/menu/icon-menu-charts";
import IconBellBing from "../icon/icon-bell-bing";
import IconLink from "../icon/icon-link";
import IconUsersGroup from "../icon/icon-users-group";
import IconMinus from "@/components/icon/icon-minus";
import IconCaretsDown from "@/components/icon/icon-carets-down";
import getUserHabilitation from "@/utils/getHabilitation";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();
  const habilitation = getUserHabilitation();

  const allowedMenus = [
    {
      id: 1,
      name: "DASHBOARD",
      icon: <IconDesktop />,
      path: "/dashboard",
      section: "Tableau de bord",
    },
    {
      id: 2,
      name: "MES ENCAISEMENTS",
      icon: <IconNotesEdit />,
      path: "/encaissement",
      section: "Encaissements",
    },
    {
      id: 11,
      name: "RECLAMATION",
      icon: <IconBellBing />,
      path: "/reclamation",
      section: "Encaissements",
    },
    {
      id: 12,
      name: "RAPPROCHEMENT",
      icon: <IconLink />,
      path: "/rapprochement",
      section: "Encaissements",
    },
    {
      id: 5,
      name: "HABILITATIONS",
      icon: <IconMenuCharts />,
      path: "/profil",
      section: "Administration",
    },
    {
      id: 4,
      name: "UTILISATEURS",
      icon: <IconUsersGroup />,
      path: "/user",
      section: "Administration",
    },
  ];

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
    if (window.innerWidth < 1024) {
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

  const translateMenuName = (name: string) => {
    switch (name) {
      case "DASHBOARD":
        return t("Tableau de bord");
      case "MES ENCAISEMENTS":
        return t("Encaissements");
      case "RECLAMATION":
        return t("Réclamations");
      case "RAPPROCHEMENT":
        return t("Rapprochements");
      case "HABILITATIONS":
        return t("Habilitations");
      case "UTILISATEURS":
        return t("Utilisateurs");
      default:
        return t(name);
    }
  };

  const renderMenu = (section: string) => {
    return habilitation
      .filter((item: { name: string; LIRE: any }) => {
        const menu = allowedMenus.find(
          (menu) =>
            menu.name === item.name && menu.section === section && item.LIRE
        );
        return !!menu;
      })
      .map((item: { name: string; id: Key | null | undefined }) => {
        const menu = allowedMenus.find((menu) => menu.name === item.name);
        return (
          menu && (
            <li key={menu.id} className="sub-menu nav-item">
              <Link href={menu.path} className="group">
                <div className="flex items-center">
                  {menu.icon}
                  <span className="text-[#506690] dark:text-white-dark ltr:pl-3 rtl:pr-3">
                    {translateMenuName(menu.name)}
                  </span>
                </div>
              </Link>
            </li>
          )
        );
      });
  };

  return (
    <div className="dark">
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] text-white-dark shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300`}
      >
        <div className="h-full bg-black">
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
            ></Link>

            <button
              type="button"
              className="collapse-icon -mt-40 flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>

          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold dark:bg-dark dark:bg-opacity-[0.08]">
              <IconMinus className="hidden h-5 w-4 flex-none" />
              <span>{t("Tableau de bord")}</span>
            </h2>
            <ul className="list-none">{renderMenu("Tableau de bord")}</ul>

            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold dark:bg-dark dark:bg-opacity-[0.08]">
              <IconMinus className="hidden h-5 w-4 flex-none" />
              <span>{t("Encaissements")}</span>
            </h2>
            <ul className="list-none">{renderMenu("Encaissements")}</ul>

            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold dark:bg-dark dark:bg-opacity-[0.08]">
              <IconMinus className="hidden h-5 w-4 flex-none" />
              <span>{t("Administration")}</span>
            </h2>
            <ul className="list-none">{renderMenu("Administration")}</ul>

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
