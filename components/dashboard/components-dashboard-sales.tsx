"use client";
import Dropdown from "@/components/dropdown";
import IconArrowLeft from "@/components/icon/icon-arrow-left";
import IconBolt from "@/components/icon/icon-bolt";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconCashBanknotes from "@/components/icon/icon-cash-banknotes";
import IconCreditCard from "@/components/icon/icon-credit-card";
import IconDollarSign from "@/components/icon/icon-dollar-sign";
import IconHorizontalDots from "@/components/icon/icon-horizontal-dots";
import IconInbox from "@/components/icon/icon-inbox";
import IconMultipleForwardRight from "@/components/icon/icon-multiple-forward-right";
import IconNetflix from "@/components/icon/icon-netflix";
import IconPlus from "@/components/icon/icon-plus";
import IconShoppingCart from "@/components/icon/icon-shopping-cart";
import IconTag from "@/components/icon/icon-tag";
import IconUser from "@/components/icon/icon-user";
import { IRootState } from "@/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconHome from "../icon/icon-home";
import IconBox from "../icon/icon-box";
import Select from "react-select";

const ComponentsDashboardSales = () => {
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
  );
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //Revenue Chart
  const revenueChart: any = {
    series: [
      {
        name: "Montant Bordereau",
        data: [
          16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000,
          14000, 17000,
        ],
      },
      {
        name: "Montant relevé",
        data: [
          16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000,
          18000, 19000,
        ],
      },
    ],
    options: {
      chart: {
        height: 325,
        type: "area",
        fontFamily: "Nunito, sans-serif",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 2,
        lineCap: "square",
      },
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22,
      },
      colors: isDark ? ["#59959E", "#8FC717"] : ["#59959E", "#8FC717"],
      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: "#59959E",
            strokeColor: "transparent",
            size: 7,
          },
          {
            seriesIndex: 1,
            dataPointIndex: 5,
            fillColor: "#8FC717",
            strokeColor: "transparent",
            size: 7,
          },
        ],
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: isRtl ? 2 : 0,
          offsetY: 5,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: (value: number) => {
            return value / 1000 + "K";
          },
          offsetX: isRtl ? -30 : -10,
          offsetY: 0,
          style: {
            fontSize: "12px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
        opposite: isRtl ? true : false,
      },
      grid: {
        borderColor: isDark ? "#191E3A" : "#E0E6ED",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "16px",
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
    },
  };

  //Sales By Category
  const salesByCategory: any = {
    series: [985, 737],
    options: {
      chart: {
        type: "donut",
        height: 460,
        fontFamily: "Nunito, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 25,
        colors: isDark ? "#0e1726" : "#fff",
      },
      colors: isDark
        ? ["#0D1285", "#DBDCED", "#e7515a", "#DBDCED"]
        : ["#DBDCED", "#0D1285", "#e7515a"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        height: 50,
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "29px",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "26px",
                color: isDark ? "#bfc9d4" : undefined,
                offsetY: 16,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                label: "Total",
                color: "#888ea8",
                fontSize: "29px",
                formatter: (w: any) => {
                  return w.globals.seriesTotals.reduce(function (
                    a: any,
                    b: any
                  ) {
                    return a + b;
                  },
                  0);
                },
              },
            },
          },
        },
      },
      labels: ["Lignes complètes", "Lignes incomplètes"],
      states: {
        hover: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
        active: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
      },
    },
  };
  const salesByCategory1: any = {
    series: [985, 737],
    options: {
      chart: {
        type: "donut",
        height: 460,
        fontFamily: "Nunito, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 25,
        colors: isDark ? "#0e1726" : "#fff",
      },
      colors: isDark
        ? ["#0D1285", "#DBDCED", "#e7515a", "#DBDCED"]
        : ["#DBDCED", "#0D1285", "#e7515a"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        height: 50,
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "29px",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "26px",
                color: isDark ? "#bfc9d4" : undefined,
                offsetY: 16,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                label: "Total",
                color: "#888ea8",
                fontSize: "29px",
                formatter: (w: any) => {
                  return w.globals.seriesTotals.reduce(function (
                    a: any,
                    b: any
                  ) {
                    return a + b;
                  },
                  0);
                },
              },
            },
          },
        },
      },
      labels: ["Lignes complètes", "Lignes incomplètes"],
      states: {
        hover: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
        active: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
      },
    },
  };

  const salesByCategory2: any = {
    series: [985, 737],
    options: {
      chart: {
        type: "donut",
        height: 460,
        fontFamily: "Nunito, sans-serif",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 25,
        colors: isDark ? "#0e1726" : "#fff",
      },
      colors: isDark
        ? ["#009640", "#DBDCED", "#e7515a", "#DBDCED"]
        : ["#DBDCED", "#009640", "#e7515a"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        height: 50,
        offsetY: 20,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "29px",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "26px",
                color: isDark ? "#bfc9d4" : undefined,
                offsetY: 16,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                label: "Total",
                color: "#888ea8",
                fontSize: "29px",
                formatter: (w: any) => {
                  return w.globals.seriesTotals.reduce(function (
                    a: any,
                    b: any
                  ) {
                    return a + b;
                  },
                  0);
                },
              },
            },
          },
        },
      },
      labels: ["Lignes complètes", "Lignes incomplètes"],
      states: {
        hover: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
        active: {
          filter: {
            type: "none",
            value: 0.15,
          },
        },
      },
    },
  };

  const options5 = [
    { value: "orange", label: "Orange" },
    { value: "white", label: "White" },
    { value: "purple", label: "Purple" },
  ];

  return (
    <>
      <div>
        <ol className="flex flex-wrap items-center gap-y-4 font-semibold text-gray-500 dark:text-white-dark">
          <li>
            <button className="flex items-center justify-center rounded-md border border-gray-500/20 p-2.5 shadow hover:text-gray-500/70 dark:border-0 dark:bg-[#191e3a] dark:hover:text-white-dark/70">
              <Link className="flex" href="/dashboard">
                <IconHome className="shrink-0 ltr:mr-2 rtl:ml-2" />
                Dashboard
              </Link>
            </button>
          </li>
          <li className="flex items-center before:relative before:-top-0.5 before:mx-4 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-primary">
            <button className="flex items-center justify-center rounded-md border border-gray-500/20 p-2.5 text-primary shadow dark:border-0 dark:bg-[#191e3a]">
              <IconBox className="shrink-0 ltr:mr-2 rtl:ml-2" />
              Suivi
            </button>
          </li>

          <div className="ml-auto flex gap-4">
            <Select
              placeholder="Filtrer par DR"
              options={options5}
              isMulti
              isSearchable={false}
            />

            <Select
              placeholder="Filtrer par Secteurs"
              options={options5}
              isMulti
              isSearchable={false}
            />
          </div>
        </ol>

        <div className="pt-5">
          <div className="mb-6 grid gap-6 xl:grid-cols-3">
            <div className="panel h-full xl:col-span-2">
              <div className="mb-5 flex items-center justify-between dark:text-white-light">
                <h5 className="text-lg font-semibold">Revenue</h5>
                <div className="dropdown">
                  <Dropdown
                    offset={[0, 1]}
                    placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                    button={
                      <IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />
                    }
                  >
                    <ul>
                      <li>
                        <button type="button">Weekly</button>
                      </li>
                      <li>
                        <button type="button">Monthly</button>
                      </li>
                      <li>
                        <button type="button">Yearly</button>
                      </li>
                    </ul>
                  </Dropdown>
                </div>
              </div>
              <p className="text-lg dark:text-white-light/90">
                Montant Total{" "}
                <span className="ml-2 text-primary">1 234 345 FCFA</span>
              </p>
              <div className="relative">
                <div className="rounded-lg bg-white dark:bg-black">
                  {isMounted ? (
                    <ReactApexChart
                      series={revenueChart.series}
                      options={revenueChart.options}
                      type="area"
                      height={325}
                      width={"100%"}
                    />
                  ) : (
                    <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="panel h-full">
              <div className="mb-5 flex items-center">
                <h5 className="text-lg font-semibold dark:text-white-light">
                  Taux de complétion globale
                </h5>
              </div>
              <div>
                <div className="rounded-lg bg-white dark:bg-black">
                  {isMounted ? (
                    <ReactApexChart
                      series={salesByCategory.series}
                      options={salesByCategory.options}
                      type="donut"
                      height={460}
                      width={"100%"}
                    />
                  ) : (
                    <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panel h-full">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">
              Ratio des modes de paiement
            </h5>
          </div>
          <div className="flex justify-between">
            <div className="mr-4 w-1/2 rounded-lg bg-white dark:bg-black">
              {isMounted ? (
                <ReactApexChart
                  series={salesByCategory1.series}
                  options={{
                    ...salesByCategory1.options,
                  }}
                  type="donut"
                  height={460}
                  width={"100%"}
                />
              ) : (
                <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                  <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                </div>
              )}
            </div>

            <div className="w-1/2 rounded-lg bg-white dark:bg-black">
              {isMounted ? (
                <ReactApexChart
                  series={salesByCategory2.series}
                  options={{
                    ...salesByCategory2.options,
                  }}
                  type="donut"
                  height={460}
                  width={"100%"}
                />
              ) : (
                <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                  <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                </div>
              )}
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
          <div className="panel h-full pb-0 sm:col-span-2 xl:col-span-1">
            <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
              Les 10 derniers Encaissements
            </h5>
            <PerfectScrollbar
              className="relative mb-4 h-[290px] ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3"
              options={{ suppressScrollX: true }}
            >
              <div className="cursor-pointer text-sm">
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Updated Server Logs</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    Just Now
                  </div>

                  <span className="badge badge-outline-primary absolute bg-primary-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Pending
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-success ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Send Mail to HR and Admin</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    2 min ago
                  </div>

                  <span className="badge badge-outline-success absolute bg-success-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Completed
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-danger ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Backup Files EOD</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    14:00
                  </div>

                  <span className="badge badge-outline-danger absolute bg-danger-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Pending
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-black ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Collect documents from Sara</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    16:00
                  </div>

                  <span className="badge badge-outline-dark absolute bg-dark-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Completed
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-warning ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">
                    Conference call with Marketing Manager.
                  </div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    17:00
                  </div>

                  <span className="badge badge-outline-warning absolute bg-warning-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    In progress
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-info ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Rebooted Server</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    17:00
                  </div>

                  <span className="badge badge-outline-info absolute bg-info-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Completed
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">
                    Send contract details to Freelancer
                  </div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    18:00
                  </div>

                  <span className="badge badge-outline-secondary absolute bg-secondary-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Pending
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Updated Server Logs</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    Just Now
                  </div>

                  <span className="badge badge-outline-primary absolute bg-primary-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Pending
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-success ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Send Mail to HR and Admin</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    2 min ago
                  </div>

                  <span className="badge badge-outline-success absolute bg-success-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Completed
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-danger ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Backup Files EOD</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    14:00
                  </div>

                  <span className="badge badge-outline-danger absolute bg-danger-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Pending
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-black ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Collect documents from Sara</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    16:00
                  </div>

                  <span className="badge badge-outline-dark absolute bg-dark-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Completed
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-warning ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">
                    Conference call with Marketing Manager.
                  </div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    17:00
                  </div>

                  <span className="badge badge-outline-warning absolute bg-warning-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    In progress
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-info ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">Rebooted Server</div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    17:00
                  </div>

                  <span className="badge badge-outline-info absolute bg-info-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Completed
                  </span>
                </div>
                <div className="group relative flex items-center py-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary ltr:mr-1 rtl:ml-1.5"></div>
                  <div className="flex-1">
                    Send contract details to Freelancer
                  </div>
                  <div className="text-xs text-white-dark dark:text-gray-500 ltr:ml-auto rtl:mr-auto">
                    18:00
                  </div>

                  <span className="badge badge-outline-secondary absolute bg-secondary-light text-xs opacity-0 group-hover:opacity-100 dark:bg-black ltr:right-0 rtl:left-0">
                    Pending
                  </span>
                </div>
              </div>
            </PerfectScrollbar>
          </div>
          <div className="panel h-full">
            <div className="mb-5 flex items-center justify-between dark:text-white-light">
              <h5 className="text-lg font-semibold">
                Les Ecarts les plus importants
              </h5>
              <div className="dropdown">
                <Dropdown
                  placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                  button={
                    <IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />
                  }
                >
                  <ul>
                    <li>
                      <button type="button">View Report</button>
                    </li>
                    <li>
                      <button type="button">Edit Report</button>
                    </li>
                    <li>
                      <button type="button">Mark as Done</button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            </div>
            <div>
              <div className="space-y-6">
                <div className="flex">
                  <span className="grid h-9 w-9 shrink-0 place-content-center rounded-md bg-success-light text-base text-success dark:bg-success dark:text-success-light">
                    SP
                  </span>
                  <div className="flex-1 px-3">
                    <div>Shaun Park</div>
                    <div className="text-xs text-white-dark dark:text-gray-500">
                      10 Jan 1:00PM
                    </div>
                  </div>
                  <span className="whitespace-pre px-1 text-base text-success ltr:ml-auto rtl:mr-auto">
                    +$36.11
                  </span>
                </div>
                <div className="flex">
                  <span className="grid h-9 w-9 shrink-0 place-content-center rounded-md bg-warning-light text-warning dark:bg-warning dark:text-warning-light">
                    <IconCashBanknotes />
                  </span>
                  <div className="flex-1 px-3">
                    <div>Cash withdrawal</div>
                    <div className="text-xs text-white-dark dark:text-gray-500">
                      04 Jan 1:00PM
                    </div>
                  </div>
                  <span className="whitespace-pre px-1 text-base text-danger ltr:ml-auto rtl:mr-auto">
                    -$16.44
                  </span>
                </div>
                <div className="flex">
                  <span className="grid h-9 w-9 shrink-0 place-content-center rounded-md bg-danger-light text-danger dark:bg-danger dark:text-danger-light">
                    <IconUser className="h-6 w-6" />
                  </span>
                  <div className="flex-1 px-3">
                    <div>Amy Diaz</div>
                    <div className="text-xs text-white-dark dark:text-gray-500">
                      10 Jan 1:00PM
                    </div>
                  </div>
                  <span className="whitespace-pre px-1 text-base text-success ltr:ml-auto rtl:mr-auto">
                    +$66.44
                  </span>
                </div>
                <div className="flex">
                  <span className="grid h-9 w-9 shrink-0 place-content-center rounded-md bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light">
                    <IconNetflix />
                  </span>
                  <div className="flex-1 px-3">
                    <div>Netflix</div>
                    <div className="text-xs text-white-dark dark:text-gray-500">
                      04 Jan 1:00PM
                    </div>
                  </div>
                  <span className="whitespace-pre px-1 text-base text-danger ltr:ml-auto rtl:mr-auto">
                    -$32.00
                  </span>
                </div>
                <div className="flex">
                  <span className="grid h-9 w-9 shrink-0 place-content-center rounded-md bg-info-light text-base text-info dark:bg-info dark:text-info-light">
                    DA
                  </span>
                  <div className="flex-1 px-3">
                    <div>Daisy Anderson</div>
                    <div className="text-xs text-white-dark dark:text-gray-500">
                      10 Jan 1:00PM
                    </div>
                  </div>
                  <span className="whitespace-pre px-1 text-base text-success ltr:ml-auto rtl:mr-auto">
                    +$10.08
                  </span>
                </div>
                <div className="flex">
                  <span className="grid h-9 w-9 shrink-0 place-content-center rounded-md bg-primary-light text-primary dark:bg-primary dark:text-primary-light">
                    <IconBolt />
                  </span>
                  <div className="flex-1 px-3">
                    <div>Electricity Bill</div>
                    <div className="text-xs text-white-dark dark:text-gray-500">
                      04 Jan 1:00PM
                    </div>
                  </div>
                  <span className="whitespace-pre px-1 text-base text-danger ltr:ml-auto rtl:mr-auto">
                    -$22.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentsDashboardSales;
