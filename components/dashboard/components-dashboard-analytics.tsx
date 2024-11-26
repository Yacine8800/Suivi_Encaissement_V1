"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import IconBox from "../icon/icon-box";
import IconHome from "@/components/icon/icon-home";
import IconPhone from "@/components/icon/icon-phone";
import IconUser from "@/components/icon/icon-user";
import PanelCodeHighlight from "@/components/panel-code-highlight";
import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import EncaissementComptable from "./encaissement-comptable";
import IconBarChart from "../icon/icon-bar-chart";
import IconXCircle from "../icon/icon-x-circle";
import IconTrendingUp from "../icon/icon-trending-up";
import EncaissementsRapproche from "./encaissements-rapproche";
import IconChecks from "../icon/icon-checks";
import IconCircleCheck from "../icon/icon-circle-check";

interface RecordType {
  validated: boolean;
  "Montant caisse"?: number;
  "Montant bordereau"?: number;
  "Montant revelé"?: number;
  [key: string]: any;
}

const ComponentsDashboardValider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
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
              Encaissement
            </button>
          </li>
        </ol>
      </div>

      <div className="panel mb-5">
        {isMounted && (
          <Tab.Group>
            <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "text-primary !outline-none before:!w-full"
                        : ""
                    }relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:w-full`}
                  >
                    <IconBarChart className="ltr:mr-2 rtl:ml-2" />
                    Encaissements Reversés
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "text-primary !outline-none before:!w-full"
                        : ""
                    }relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:w-full`}
                  >
                    <IconChecks className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                    Encaissements Traités
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "text-primary !outline-none before:!w-full"
                        : ""
                    }relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-primary before:transition-all before:duration-700 hover:text-primary hover:before:w-full`}
                  >
                    <IconCircleCheck className="ltr:mr-2 rtl:ml-2" />
                    Encaissements Validés
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div>
                  <EncaissementComptable />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <EncaissementsRapproche />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="pt-5">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Incidunt dolor impedit labore consectetur libero. Nesciunt
                    deleniti, facilis animi at provident perspiciatis, optio
                    officia, totam veritatis impedit labore repudiandae nisi
                    hic.
                  </p>
                </div>
              </Tab.Panel>
              <Tab.Panel>Disabled</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        )}
      </div>
    </div>
  );
};

export default ComponentsDashboardValider;
