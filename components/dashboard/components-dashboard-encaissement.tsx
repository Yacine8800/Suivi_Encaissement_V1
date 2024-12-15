"use client";
import Dropdown from "@/components/dropdown";
import IconCashBanknotes from "@/components/icon/icon-cash-banknotes";
import IconHorizontalDots from "@/components/icon/icon-horizontal-dots";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconHome from "../icon/icon-home";
import IconBox from "../icon/icon-box";
import Select from "react-select";
import store, { TRootState } from "@/store";

const ComponentsDashboardSales = () => {
  const isDark = useSelector(
    (state: TRootState) =>
      state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
  );
  const isRtl =
    useSelector((state: TRootState) => state.themeConfig.rtlClass) === "rtl";

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //Revenue Chart
  const revenueChart: any = {
    series: [
      {
        name: "Encaissements Crédités",
        data: [
          16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000,
          14000, 17000,
        ],
      },
      {
        name: "Encaissements Non Crédités",
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
        "Decembre",
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
      labels: ["Crédité", "Non-crédité"],
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
      labels: ["Cloturé", "Non-Cloturé"],
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
      labels: ["Crédité", "Non - Crédité"],
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
    { value: "DRAN", label: "DRAN" },
    { value: "DRABO", label: "DRABO" },
    { value: "DRYOP", label: "DRYOP" },
  ];
  const options6 = [
    { value: "SECTEUR 1", label: "SECTEUR 1" },
    { value: "SECTEUR 2", label: "SECTEUR 2" },
    { value: "SECTEUR 3", label: "SECTEUR 3" },
  ];

  const caissesNonCloturees = [
    {
      Bordereau: "12345",
      "Date Encais": "2024-07-20",
      Banque: "SGBCI",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "67890",
      "Date Encais": "2024-07-21",
      Banque: "NSIA",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "54321",
      "Date Encais": "2024-07-22",
      Banque: "SGBCI",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "11223",
      "Date Encais": "2024-07-23",
      Banque: "SIB",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "33445",
      "Date Encais": "2024-07-24",
      Banque: "NSIA",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "99887",
      "Date Encais": "2024-07-25",
      Banque: "SIB",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "77665",
      "Date Encais": "2024-07-26",
      Banque: "SGBCI",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "55667",
      "Date Encais": "2024-07-27",
      Banque: "ECOBANK",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "44556",
      "Date Encais": "2024-07-28",
      Banque: "SGBCI",
      Statut: "Non-Clôturé",
    },
    {
      Bordereau: "66778",
      "Date Encais": "2024-07-29",
      Banque: "ECOBANK",
      Statut: "Non-Clôturé",
    },
  ];

  const getStatusClass = (status: any) => {
    switch (status) {
      case "Clôturée":
        return "bg-green-500"; // Green for "Terminé"
      case "Non clôturée":
        return "bg-red-500"; // Red for "En retard"
      default:
        return "bg-gray-500";
    }
  };

  const getBadgeClass = (status: any) => {
    switch (status) {
      case "Clôturée":
        return "badge-outline-success"; // Badge class for "Terminé"
      case "Non Clôturée":
        return "badge-outline-danger"; // Badge class for "En retard"
      default:
        return "badge-outline-secondary";
    }
  };

  const ecarts = [
    {
      name: "Ecart (A-B)",
      date: "12/12/2023",
      valeur: 5000,
      icon: "green",
      dr: "DRAN",
    },
    {
      name: "Ecart (B-C)",
      date: "10/12/2023",
      valeur: -2000,
      icon: "yellow",
      dr: "DRABO",
    },
    {
      name: "Ecart (A-B)",
      date: "08/12/2023",
      valeur: 3000,
      icon: "green",
      dr: "DRYOP",
    },
    {
      name: "Ecart (B-C)",
      date: "06/12/2023",
      valeur: 1500,
      icon: "yellow",
      dr: "DRAN",
    },
    {
      name: "Ecart (A-B)",
      date: "04/12/2023",
      valeur: -1000,
      icon: "green",
      dr: "DRABO",
    },
    {
      name: "Ecart (B-C)",
      date: "02/12/2023",
      valeur: 2500,
      icon: "yellow",
      dr: "DRYOP",
    },
  ];

  const getEcartColor = (valeur: any) => {
    return valeur >= 0 ? "text-green-500" : "text-red-500";
  };

  const getEcartIcon = (iconType: any) => {
    return (
      <span
        className={`grid h-9 w-9 shrink-0 place-content-center rounded-md bg-${
          iconType === "yellow" ? "warning" : "success"
        }-light`}
      >
        <IconCashBanknotes />
      </span>
    );
  };

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
              isSearchable={true}
            />

            <Select
              placeholder="Filtrer par Secteurs"
              options={options6}
              isMulti
              isSearchable={true}
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
            <div className="panel h-full w-full">
              <div className="mb-5 flex items-center justify-between">
                <h5 className="text-lg font-semibold dark:text-white-light">
                  Caisses Non Cloturé
                </h5>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="ltr:rounded-l-md rtl:rounded-r-md">
                        Numéro de la Caisse
                      </th>
                      <th>Date de la Caisse</th>
                      <th>Banque</th>
                      <th className="ltr:rounded-r-md rtl:rounded-l-md">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {caissesNonCloturees.map((record, index) => (
                      <tr
                        key={index}
                        className="group text-white-dark hover:text-black dark:hover:text-white-light/90"
                      >
                        <td className="min-w-[150px] text-black dark:text-white">
                          <div className="flex items-center">
                            <span className="whitespace-nowrap">
                              {record.Bordereau}
                            </span>
                          </div>
                        </td>
                        <td className="text-black dark:text-white">
                          {record["Date Encais"]}
                        </td>
                        <td className="text-black dark:text-white">
                          {record.Banque}
                        </td>
                        <td>
                          <span className="badge bg-danger shadow-md dark:group-hover:bg-transparent">
                            {record.Statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="panel h-full w-full">
            <div className="mb-5 flex items-center justify-between">
              <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
                Les Ecarts les plus importants
              </h5>
            </div>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th className="ltr:rounded-l-md rtl:rounded-r-md">
                      Direction Régionale (DR)
                    </th>
                    <th>Date</th>
                    <th>Type d'Ecart</th>
                    <th>Valeur</th>
                  </tr>
                </thead>
                <tbody>
                  {ecarts.map((ecart, index) => (
                    <tr
                      key={index}
                      className="group text-white-dark hover:text-black dark:hover:text-white-light/90"
                    >
                      <td className="min-w-[150px] text-black dark:text-white">
                        {ecart.dr}
                      </td>
                      <td className="text-black dark:text-white">
                        {ecart.date}
                      </td>
                      <td className="text-black dark:text-white">
                        {ecart.name}
                      </td>
                      <td
                        className={`text-black dark:text-white ${getEcartColor(
                          ecart.valeur
                        )}`}
                      >
                        {ecart.valeur >= 0 ? "+" : ""}
                        {ecart.valeur.toLocaleString()} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentsDashboardSales;
