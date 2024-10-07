"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ComponentsDatatablesColumnChooser from "../datatables/components-datatables-column-chooser";
import IconZipFile from "../icon/icon-zip-file";
import IconHome from "../icon/icon-home";
import IconBox from "../icon/icon-box";
import ComponentsDatatablesColumnValider from "../datatables/components-datatables-column-valider";
import Dropdown from "../dropdown";
import IconHorizontalDots from "../icon/icon-horizontal-dots";
import IconCircleCheck from "../icon/icon-circle-check";

// Définition d'un type pour les enregistrements
type RecordType = {
  validated: boolean;
  "Montant caisse"?: number;
  "Montant bordereau"?: number;
  "Montant revelé"?: number;
};

const ComponentsDashboardAnalytics = () => {
  const [completionRate, setCompletionRate] = useState(0);
  const [expensesPercentage, setExpensesPercentage] = useState(0);
  const [validatedRecords, setValidatedRecords] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const savedRecordsString =
    typeof window !== "undefined"
      ? localStorage.getItem("validatedRecords")
      : null;

  const formatDate = (date: Date): string => {
    const dt = new Date(date);
    const month =
      dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
    const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    return day + "/" + month + "/" + dt.getFullYear();
  };

  const today = formatDate(new Date());

  const updateMetrics = () => {
    // Récupération des données depuis localStorage
    const savedRecords: RecordType[] = savedRecordsString
      ? JSON.parse(savedRecordsString)
      : [];

    const totalRecords = savedRecords.length;
    const validatedRecords = savedRecords.filter(
      (record: RecordType) => record.validated
    ).length;

    setTotalRecords(totalRecords);
    setValidatedRecords(validatedRecords);

    if (totalRecords > 0) {
      const completionRate = (validatedRecords / totalRecords) * 100;
      setCompletionRate(completionRate);

      // Calcul des dépenses
      const totalExpenses = savedRecords.reduce(
        (acc: number, record: RecordType) =>
          acc + (record["Montant caisse"] || 0),
        0
      );
      const validatedExpenses = savedRecords
        .filter((record: RecordType) => record.validated)
        .reduce(
          (acc: number, record: RecordType) =>
            acc + (record["Montant caisse"] || 0),
          0
        );

      const expensesPercentage =
        totalExpenses > 0 ? (validatedExpenses / totalExpenses) * 100 : 0;

      setExpensesPercentage(expensesPercentage);
    }
  };

  const calculateTotal = (
    records: RecordType[],
    key: keyof RecordType
  ): number => {
    return records
      .filter((record: RecordType) => record.validated)
      .reduce((total: number, record: RecordType) => {
        const value = record[key];
        if (typeof value === "number") {
          return total + value;
        }
        return total;
      }, 0);
  };

  const formatNumber = (number: number): string => {
    return number.toLocaleString("fr-FR", {
      useGrouping: true,
      maximumFractionDigits: 0,
    });
  };

  const [totals, setTotals] = useState({
    totalCaisse: 0,
    totalBordereau: 0,
    totalReleve: 0,
  });

  useEffect(() => {
    // Initialisation des valeurs
    updateMetrics();

    // Calcul des totaux pour les enregistrements validés
    const savedRecords: RecordType[] = savedRecordsString
      ? JSON.parse(savedRecordsString)
      : [];
    const totalCaisse = calculateTotal(savedRecords, "Montant caisse");
    const totalBordereau = calculateTotal(savedRecords, "Montant bordereau");
    const totalReleve = calculateTotal(savedRecords, "Montant revelé");

    setTotals({ totalCaisse, totalBordereau, totalReleve });

    // Écouter les changements dans localStorage
    window.addEventListener("storage", updateMetrics);

    // Nettoyage de l'écouteur d'événement
    return () => {
      window.removeEventListener("storage", updateMetrics);
    };
  }, []);

  return (
    <div>
      <div className="mb-5">
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
              Validation
            </button>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ComponentsDashboardAnalytics;
