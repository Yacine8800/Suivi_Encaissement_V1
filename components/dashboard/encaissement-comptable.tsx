"use client";

import { IRootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ComponentsDatatablesColumnChooser from "../datatables/components-datatables-column-chooser";
import IconZipFile from "../icon/icon-zip-file";
import IconCircleCheck from "../icon/icon-circle-check";

interface RecordType {
  validated: boolean;
  "Montant caisse"?: number;
  "Montant bordereau"?: number;
  "Montant revelé"?: number;
  [key: string]: any;
}

const EncaissementComptable = () => {
  const isDark = useSelector(
    (state: IRootState) =>
      state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
  );
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";
  const [completionRate, setCompletionRate] = useState<number>(0);
  const [expensesPercentage, setExpensesPercentage] = useState<number>(0);
  const [validatedRecords, setValidatedRecords] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const [totals, setTotals] = useState<{
    totalCaisse: number;
    totalBordereau: number;
    totalReleve: number;
  }>({
    totalCaisse: 0,
    totalBordereau: 0,
    totalReleve: 0,
  });

  const formatDate = (date: Date): string => {
    const dt = new Date(date);
    const month =
      dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1;
    const day = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate();
    return `${day}/${month}/${dt.getFullYear()}`;
  };

  const today = formatDate(new Date());

  const formatNumber = (number: number): string => {
    return number.toLocaleString("fr-FR", {
      useGrouping: true,
      maximumFractionDigits: 0,
    });
  };

  const calculateTotal = (records: RecordType[], key: string): number => {
    return records
      .filter((record) => !record.validated)
      .reduce((total, record) => total + (record[key] || 0), 0);
  };

  const getColorClass = (value: number): string => {
    if (value > 0) return "text-success";
    if (value < 0) return "text-danger";
    return "text-black";
  };

  const updateMetrics = () => {
    const savedRecordsString = localStorage.getItem("validatedRecords");
    const savedRecords: RecordType[] = savedRecordsString
      ? JSON.parse(savedRecordsString)
      : [];

    const totalRecordsCount = savedRecords.length;
    const validatedRecordsCount = savedRecords.filter(
      (record) => record.validated
    ).length;

    setTotalRecords(totalRecordsCount);
    setValidatedRecords(validatedRecordsCount);

    const completionRateValue =
      totalRecordsCount > 0
        ? (validatedRecordsCount / totalRecordsCount) * 100
        : 0;
    setCompletionRate(completionRateValue);

    // Calcul des dépenses
    const totalExpenses = savedRecords.reduce(
      (acc, record) => acc + (record["Montant caisse"] || 0),
      0
    );
    const validatedExpenses = savedRecords
      .filter((record) => record.validated)
      .reduce((acc, record) => acc + (record["Montant caisse"] || 0), 0);

    const expensesPercentageValue =
      totalExpenses > 0 ? (validatedExpenses / totalExpenses) * 100 : 0;

    setExpensesPercentage(expensesPercentageValue);

    // Calcul des totaux pour les enregistrements non validés
    const totalCaisse = calculateTotal(savedRecords, "Montant caisse");
    const totalBordereau = calculateTotal(savedRecords, "Montant bordereau");
    const totalReleve = calculateTotal(savedRecords, "Montant revelé");

    setTotals({ totalCaisse, totalBordereau, totalReleve });
  };

  useEffect(() => {
    // Initialisation des valeurs
    updateMetrics();

    // Écouter les changements dans localStorage
    window.addEventListener("storage", updateMetrics);

    // Nettoyage de l'écouteur d'événement
    return () => {
      window.removeEventListener("storage", updateMetrics);
    };
  }, []);
  return (
    <div>
      <div className="grid pt-5">
        <div className="flex flex-wrap gap-6 md:flex-nowrap">
          <div className="panel h-full flex-1">
            <div className="-m-5 mb-5 flex items-center justify-between border-b border-white-light p-5 dark:border-[#1b2e4b]">
              <button type="button" className="flex font-semibold">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#ED6C03] text-white ltr:mr-4 rtl:ml-4">
                  <span>TC</span>
                </div>
                <div style={{ textAlign: "left" }}>
                  <h6>Taux de complétion</h6>
                  <p className="mt-1 text-xs text-[#ED6C03]">
                    {`${validatedRecords}/${totalRecords} lignes`}
                  </p>
                </div>
              </button>
            </div>
            <div className="group">
              <div className="mb-5 text-white-dark">
                Vous indique combien de fiches ont été éditées
              </div>
            </div>

            <div className="space-y-9">
              <div className="flex h-5 items-center">
                <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                  <div className="grid h-9 w-9 place-content-center rounded-full bg-warning-light text-warning dark:bg-warning dark:text-warning-light">
                    <IconZipFile />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex font-semibold text-white-dark">
                    <h6>Pourcentage</h6>
                    <p className="ltr:ml-auto rtl:mr-auto">
                      {`${expensesPercentage.toFixed(2)}%`}
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#f09819] to-[#ff5858]"
                      style={{ width: `${expensesPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel h-full flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">Total des montants</div>
                <div className="text-primary"> À la date du {today} </div>
              </div>
            </div>
            <div className="relative mt-10">
              <div className="absolute -bottom-12 h-12 w-12 ltr:-right-12 rtl:-left-12">
                <IconCircleCheck className="-ml-7 -mt-[25px] h-full w-full text-success opacity-20" />
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <div>
                  <div className="text-white-black">Total Montant Caisse</div>
                  <div
                    className={`mt-2 text-xl font-light ${getColorClass(
                      totals.totalCaisse
                    )}`}
                  >
                    {`${formatNumber(totals.totalCaisse)} F CFA`}
                  </div>
                </div>
                <div>
                  <div className="text-white-black">
                    Total Montant Bordereau
                  </div>
                  <div
                    className={`mt-2 text-xl font-light ${getColorClass(
                      totals.totalBordereau
                    )}`}
                  >
                    {`${formatNumber(totals.totalBordereau)} F CFA`}
                  </div>
                </div>
                <div>
                  <div className="text-white-black">Total Montant Relevé</div>
                  <div
                    className={`mt-2 text-xl font-light ${getColorClass(
                      totals.totalReleve
                    )}`}
                  >
                    {`${formatNumber(totals.totalReleve)} F CFA`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ComponentsDatatablesColumnChooser />
      </div>
    </div>
  );
};

export default EncaissementComptable;
