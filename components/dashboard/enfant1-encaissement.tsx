"use client";

import React, { useState } from "react";
import ComponentsDatatablesColumnChooser from "../datatables/components-datatables-encaissement";
import IconZipFile from "../icon/icon-zip-file";
import IconCircleCheck from "../icon/icon-circle-check";
import { ITotal, Paginations } from "@/utils/interface";

interface EncaissementComptableProps {
  statutValidation: number;
  data: any[];
  total: ITotal;
  paginate: Paginations;
  loading: boolean;
  habilitation: any[];
}

const EncaissementComptable: React.FC<EncaissementComptableProps> = ({
  statutValidation,
  data,
  total,
  paginate,
  loading,
  habilitation,
}) => {
  const [expensesPercentage, setExpensesPercentage] = useState<number>(0);
  const [validatedRecords, setValidatedRecords] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const formatDate = (date: Date): string => {
    const dt = new Date(date);
    const month =
      dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1;
    const day = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate();
    return `${day}/${month}/${dt.getFullYear()}`;
  };

  const today = formatDate(new Date());

  const formatNumber = (number: number): string => {
    return number?.toLocaleString("fr-FR", {
      useGrouping: true,
      maximumFractionDigits: 0,
    });
  };

  const getColorClass = (value: number): string => {
    if (value > 0) return "text-success";
    if (value < 0) return "text-danger";
    return "text-black";
  };

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
                <div className="text-primary">À la date du {today}</div>
              </div>
            </div>
            <div className="relative mt-10">
              <div className="absolute -bottom-12 h-12 w-12 ltr:-right-12 rtl:-left-12">
                <IconCircleCheck className="-ml-7 -mt-[25px] h-full w-full text-success opacity-20" />
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {loading ? (
                  <>
                    {/* Skeleton loaders pour chaque champ */}
                    <div>
                      <div className="text-white-black">
                        Total Montant Caisse
                      </div>
                      <div className="mt-2 text-xl font-light">
                        <div className="h-2 w-32 animate-pulse rounded bg-gray-300"></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-white-black">
                        Total Montant Bordereau
                      </div>
                      <div className="mt-2 text-xl font-light">
                        <div className="h-2 w-32 animate-pulse rounded bg-gray-300"></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-white-black">
                        Total Montant Relevé
                      </div>
                      <div className="mt-2 text-xl font-light">
                        <div className="h-2 w-32 animate-pulse rounded bg-gray-300"></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-white-black">
                        Total Montant Caisse
                      </div>
                      <div
                        className={`mt-2 text-xl font-light ${getColorClass(
                          total.totalMontantRestitutionCaisse
                        )}`}
                      >
                        {`${formatNumber(
                          total.totalMontantRestitutionCaisse
                        )} F CFA`}
                      </div>
                    </div>
                    <div>
                      <div className="text-white-black">
                        Total Montant Bordereau
                      </div>
                      <div
                        className={`mt-2 text-xl font-light ${getColorClass(
                          total.totalMontantBordereauBanque
                        )}`}
                      >
                        {`${formatNumber(
                          total.totalMontantBordereauBanque
                        )} F CFA`}
                      </div>
                    </div>
                    <div>
                      <div className="text-white-black">
                        Total Montant Relevé
                      </div>
                      <div
                        className={`mt-2 text-xl font-light ${getColorClass(
                          total.totalMontantReleve
                        )}`}
                      >
                        {`${formatNumber(total.totalMontantReleve)} F CFA`}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ComponentsDatatablesColumnChooser
          statutValidation={statutValidation}
          data={data}
          loading={loading}
          paginate={paginate}
          habilitation={habilitation}
        />
      </div>
    </div>
  );
};

export default EncaissementComptable;
