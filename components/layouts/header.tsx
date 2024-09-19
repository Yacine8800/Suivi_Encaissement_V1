"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { IRootState } from "@/store";
import { toggleSidebar, toggleRTL } from "@/store/themeConfigSlice";
import Dropdown from "@/components/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { getTranslation } from "@/i18n";
import IconMenu from "@/components/icon/icon-menu";
import IconUser from "@/components/icon/icon-user";

import IconLogout from "@/components/icon/icon-logout";
import IconMenuDashboard from "@/components/icon/menu/icon-menu-dashboard";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconMenuApps from "@/components/icon/menu/icon-menu-apps";
import IconMenuComponents from "@/components/icon/menu/icon-menu-components";

import React from "react";
import IconSquareRotated from "../icon/icon-square-rotated";

const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, i18n } = getTranslation();

  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      const all: any = document.querySelectorAll(
        "ul.horizontal-menu .nav-link.active"
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove("active");
      }

      let allLinks = document.querySelectorAll("ul.horizontal-menu a.active");
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove("active");
      }
      selector?.classList.add("active");

      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link");
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add("active");
          });
        }
      }
    }
  }, [pathname]);

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const setLocale = (flag: string) => {
    if (flag.toLowerCase() === "ae") {
      dispatch(toggleRTL("rtl"));
    } else {
      dispatch(toggleRTL("ltr"));
    }
    router.refresh();
  };

  const [search, setSearch] = useState(false);

  return (
    <header
      className={`z-40 ${
        themeConfig.semidark && themeConfig.menu === "horizontal" ? "dark" : ""
      }`}
    >
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2">
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconMenu className="h-5 w-5" />
            </button>
            <Link
              href="/dashboard"
              className="main-logo ml-5 flex shrink-0 items-center"
            >
              <img
                className="inline w-10 align-top ltr:-ml-1 rtl:-mr-1"
                src="/assets/images/logo.png"
                alt="logo"
              />
              <span className="textl hidden align-middle font-light text-[#EF7D00] transition-all duration-300 md:inline ltr:ml-1.5 rtl:mr-1.5">
                Suivi encaissement
              </span>
            </Link>
          </div>

          <p className="flex items-center text-success">
            <button
              type="button"
              className={`flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
            >
              <IconSquareRotated className="shrink-0 fill-success" />
            </button>
            <span className="ml-2">Administrateur système</span>
          </p>

          <div className="flex items-center space-x-1.5 dark:text-[#d0d2d6] sm:flex-1 lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
              <form
                className={`${
                  search && "!block"
                } absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                onSubmit={() => setSearch(false)}
              ></form>
            </div>
            {/* <div>
              {themeConfig.theme === "light" ? (
                <button
                  className={`${
                    themeConfig.theme === "light" &&
                    "flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => dispatch(toggleTheme("dark"))}
                >
                  <IconSun />
                </button>
              ) : (
                ""
              )}
              {themeConfig.theme === "dark" && (
                <button
                  className={`${
                    themeConfig.theme === "dark" &&
                    "flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => dispatch(toggleTheme("system"))}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === "system" && (
                <button
                  className={`${
                    themeConfig.theme === "system" &&
                    "flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => dispatch(toggleTheme("light"))}
                >
                  <IconLaptop />
                </button>
              )}
            </div> */}
            {/* <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  i18n.language && (
                    <img
                      className="h-5 w-5 rounded-full object-cover"
                      src={`/assets/images/flags/${i18n.language.toUpperCase()}.svg`}
                      alt="flag"
                    />
                  )
                }
              >
                <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  {themeConfig.languageList.map((item: any) => {
                    return (
                      <li key={item.code}>
                        <button
                          type="button"
                          className={`flex w-full hover:text-primary ${
                            i18n.language === item.code
                              ? "bg-primary/10 text-primary"
                              : ""
                          }`}
                          onClick={() => {
                            i18n.changeLanguage(item.code);
                            setLocale(item.code);
                          }}
                        >
                          <img
                            src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                            alt="flag"
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Dropdown>
            </div> */}

            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="relative group block"
                button={
                  <img
                    className="h-8 w-8 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/assets/images/user.png"
                    alt="userProfile"
                  />
                }
              >
                <ul className="w-[430px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src="/assets/images/user.png"
                        alt="userProfile"
                      />
                      <div className="truncate ltr:pl-4 rtl:pr-4">
                        <h4 className="text-base">
                          DIOMANDE Yacine
                          <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                            Administrateur système
                          </span>
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          diomande.yacine@example.com
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/users/profile"
                      className="dark:hover:text-white"
                    >
                      <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                      Profile
                    </Link>
                  </li>

                  {/* <li className="border-t border-white-light dark:border-white-light/10">
                    <Link href="" className="dark:hover:text-white">
                      <div className="dark:hover:text-whit mt-5 text-black">
                        <label className="mb-0 inline-flex">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={themeConfig.semidark}
                            onChange={(e) =>
                              dispatch(toggleSemidark(e.target.checked))
                            }
                          />
                          <span>Menu Noir</span>
                        </label>
                      </div>
                    </Link>
                  </li> */}

                  <li className="border-t border-white-light dark:border-white-light/10">
                    <Link href="/" className="!py-3 text-danger">
                      <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* horizontal menu */}
        <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse">
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuDashboard className="shrink-0" />
                <span className="px-1">{t("dashboard")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuApps className="shrink-0" />
                <span className="px-1">{t("apps")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li className="relative">
                <button type="button">
                  {t("invoice")}
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow dark:bg-[#1b2e4b] dark:text-white-dark ltr:left-[95%] rtl:right-[95%]">
                  <li>
                    <Link href="/encaissement">{t("Encaissement")}</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuComponents className="shrink-0" />
                <span className="px-1">{t("components")}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
