"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import IconBox from "../icon/icon-box";
import IconHome from "@/components/icon/icon-home";
import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import EncaissementComptable from "./enfant1-encaissement";
import IconBarChart from "../icon/icon-bar-chart";
import IconXCircle from "../icon/icon-x-circle";
import IconChecks from "../icon/icon-checks";
import IconCircleCheck from "../icon/icon-circle-check";
import { TAppDispatch } from "@/store";
import { fetchDataReleve } from "@/store/reducers/encaissements/relevé-slice";
import { DataReverse } from "@/utils/interface";
import { EStatutEncaissement } from "@/utils/enums";
import getUserHabilitation from "@/utils/getHabilitation";
import IconArchive from "../icon/icon-archive";

const ComponentsDashboardValider = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const habilitation = getUserHabilitation();

  console.log(habilitation);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const dataReverse: DataReverse = useSelector(
    (state: any) => state.encaissementReleve.data
  );

  const dataReverseloading: any = useSelector(
    (state: any) => state.encaissementReleve.loading
  );

  const [activeTab, setActiveTab] = useState<EStatutEncaissement>(
    EStatutEncaissement.EN_ATTENTE
  );

  const allTabs = [
    {
      id: EStatutEncaissement.EN_ATTENTE,
      label: "Encaissements Reversés",
      icon: IconBarChart,
      habilitationName: "ENCAISSEMENTS REVERSES",
    },
    {
      id: EStatutEncaissement.TRAITE,
      label: "Encaissements Traités",
      icon: IconChecks,
      habilitationName: "ENCAISSEMENTS TRAITÉS",
    },
    {
      id: EStatutEncaissement.REJETE,
      label: "Encaissements Rejetés",
      icon: IconXCircle,
      habilitationName: "ENCAISSEMENTS REJETES",
    },
    {
      id: EStatutEncaissement.VALIDE,
      label: "Encaissements Validés",
      icon: IconCircleCheck,
      habilitationName: "ENCAISSEMENTS VALIDES",
    },
    {
      id: EStatutEncaissement.CLOTURE,
      label: "Encaissements Clôturés",
      icon: IconArchive,
      habilitationName: "ENCAISSEMENTS CLOTURES",
    },
  ];

  const filteredTabs = allTabs?.filter((tab) =>
    habilitation.some(
      (h: { name: string; LIRE: boolean }) =>
        h.name === tab.habilitationName && h.LIRE === true
    )
  );

  useEffect(() => {
    if (isMounted) {
      dispatch(fetchDataReleve({ id: activeTab.toString() }));
    }
  }, [dispatch, activeTab, isMounted]);

  const dataEncaissementReverse = dataReverse?.result || [];
  const Totaldata = dataReverse?.totals || [];
  const paginate = dataReverse?.pagination || [];

  console.log(Totaldata);

  return (
    <div>
      <div className="mb-5">
        <ol className="flex flex-wrap items-center gap-y-4 font-semibold text-gray-500 dark:text-white-dark">
          <li>
            <button className="flex items-center justify-center rounded-md border border-gray-500/20 p-2.5 shadow hover:text-gray-500/70 dark:border-0 dark:bg-[#191e3a] dark:hover:text-white-dark/70">
              <Link className="flex" href="/encaissement">
                <IconHome className="shrink-0 ltr:mr-2 rtl:ml-2" />
                Encaissements
              </Link>
            </button>
          </li>
          <li className="flex items-center before:relative before:-top-0.5 before:mx-4 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-primary">
            <button className="flex items-center justify-center rounded-md border border-gray-500/20 p-2.5 text-primary shadow dark:border-0 dark:bg-[#191e3a]">
              <IconBox className="shrink-0 ltr:mr-2 rtl:ml-2" />
              {filteredTabs.find((tab) => tab.id === activeTab)?.label ||
                "Reversé"}
            </button>
          </li>
        </ol>
      </div>

      <div className="panel mb-5">
        {isMounted && (
          <Tab.Group onChange={(index) => setActiveTab(filteredTabs[index].id)}>
            <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
              {filteredTabs.map((tab) => (
                <Tab as={Fragment} key={tab.id}>
                  {({ selected }) => (
                    <button
                      className={`${
                        selected
                          ? "text-primary !outline-none before:!w-full"
                          : ""
                      }relative -mb-[1px] flex items-center p-5 py-3`}
                    >
                      <tab.icon className="ltr:mr-2 rtl:ml-2" />
                      {tab.label}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {filteredTabs.map((tab) => (
                <Tab.Panel key={tab.id}>
                  <EncaissementComptable
                    statutValidation={tab.id}
                    data={dataEncaissementReverse || []}
                    total={Totaldata}
                    paginate={paginate}
                    loading={dataReverseloading}
                    habilitation={habilitation}
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        )}
      </div>
    </div>
  );
};

export default ComponentsDashboardValider;
