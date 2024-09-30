"use client";

import Filtre from "@/components/filtre/Filtre";
import React from "react";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import IconTag from "@/components/icon/icon-tag";
import IconDollarSignCircle from "@/components/icon/icon-dollar-sign-circle";
import Table from "./table";
import Timbre from "../timbre/TableTimbre";

const Saphir = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div>
      <Filtre />
      <div className="panel mt-8">
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
                    <IconDollarSignCircle className="ltr:mr-2 rtl:ml-2" />
                    Encaissement Saphir
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
                    <IconTag className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                    Encaissement Timbre
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div>
                  <Table />
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div>
                  <Timbre />
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

export default Saphir;
