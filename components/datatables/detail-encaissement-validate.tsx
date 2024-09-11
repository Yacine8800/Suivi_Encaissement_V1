"use client";
import IconDownload from "@/components/icon/icon-download";

import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import IconBox from "../icon/icon-box";
import IconCaretDown from "../icon/icon-caret-down";

const DetailEncaissmentvalider = () => {
  const exportTable = () => {
    window.print();
  };

  const [active2, setActive2] = useState<string>("1");
  const togglePara2 = (value: string) => {
    setActive2((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const items = [
    {
      id: 1,
      mtncaisse: 2000000,
      mtnbord: 3000000,
      mntreleve: 1000000,
      ecart1: 2000000 - 3000000,
      ecart2: 3000000 - 1000000,
    },
  ];

  const columns = [
    {
      key: "mtncaisse",
      label: "MONTANT CAISSE (A)",
    },
    {
      key: "mtnbord",
      label: "MONTANT BORDEREAU (B)",
    },
    {
      key: "quantity",
      label: "MONTANT RELEVE (C)",
    },
    {
      key: "ecart1",
      label: "ECART (A-B)",
      class: "ltr:text-right rtl:text-left",
    },
    {
      key: "ecart2",
      label: "ECART (B-C)",
      class: "ltr:text-right rtl:text-left",
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4 lg:justify-end">
        <button type="button" className="btn btn-success gap-2">
          <IconDownload />
          Download
        </button>
      </div>
      <div className="panel">
        <div className="flex flex-wrap justify-between gap-4 px-4">
          <div className="text-2xl font-semibold uppercase">Détail</div>
          <div className="shrink-0">
            <img
              src="/assets/images/logo.png"
              alt="img"
              className="w-14 ltr:ml-auto rtl:mr-auto"
            />
          </div>
        </div>
        <div className="px-4 ltr:text-right rtl:text-left">
          <div className="mt-6 space-y-1 text-white-dark">
            <div>DRYOP EXP : O24 SMART</div>
            <div>NSIA BANQUE</div>
            <div>
              Encaissement du <strong className="text-black">11-09-2024</strong>
            </div>
          </div>
        </div>

        <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
        <div className="flex flex-col flex-wrap justify-between gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="space-y-1 text-white-dark">
              <div>
                Date encaissement :{" "}
                <span className="font-bold text-black">27-08-2024</span>
              </div>
              <div className="font-semibold ">
                Numero de caisse :{" "}
                <span className="font-bold text-primary">#AA234S</span>
              </div>
              <div>
                Date cloture :{" "}
                <span className="font-bold text-black">11-09-2024</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 sm:flex-row lg:w-2/3">
            <div className="xl:1/3 sm:w-1/2 lg:w-2/5">
              <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                <button
                  type="button"
                  className={`flex w-full items-center p-4 text-white-dark dark:bg-[#1b2e4b] ${
                    active2 === "2" ? "!text-primary" : ""
                  }`}
                  onClick={() => togglePara2("2")}
                >
                  <IconBox className="shrink-0 text-primary ltr:mr-2 rtl:ml-2" />
                  Observation Ecart (A-B)
                  <div
                    className={`ltr:ml-auto rtl:mr-auto ${
                      active2 === "2" ? "rotate-180" : ""
                    }`}
                  >
                    <IconCaretDown />
                  </div>
                </button>
                <div>
                  <AnimateHeight
                    duration={300}
                    height={active2 === "2" ? "auto" : 0}
                  >
                    <div className="border-t border-[#d3d3d3] p-4 text-[13px] dark:border-[#1b2e4b]">
                      <ul className="space-y-1">
                        <li>
                          <button type="button">Apple</button>
                        </li>
                        <li>
                          <button type="button">Orange</button>
                        </li>
                        <li>
                          <button type="button">Banana</button>
                        </li>
                        <li>
                          <button type="button">list</button>
                        </li>
                      </ul>
                    </div>
                  </AnimateHeight>
                </div>
              </div>
            </div>

            <div className="xl:1/3 sm:w-1/2 lg:w-2/5">
              <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                <button
                  type="button"
                  className={`flex w-full items-center p-4 text-white-dark dark:bg-[#1b2e4b] ${
                    active2 === "3" ? "!text-primary" : ""
                  }`}
                  onClick={() => togglePara2("3")}
                >
                  <IconBox className="shrink-0 text-primary ltr:mr-2 rtl:ml-2" />
                  Observation Ecart (B-C)
                  <div
                    className={`ltr:ml-auto rtl:mr-auto ${
                      active2 === "3" ? "rotate-180" : ""
                    }`}
                  >
                    <IconCaretDown />
                  </div>
                </button>
                <div>
                  <AnimateHeight
                    duration={300}
                    height={active2 === "3" ? "auto" : 0}
                  >
                    <div className="border-t border-[#d3d3d3] p-4 text-[13px] dark:border-[#1b2e4b]">
                      <ul className="space-y-1">
                        <li>
                          <button type="button">Apple</button>
                        </li>
                        <li>
                          <button type="button">Orange</button>
                        </li>
                        <li>
                          <button type="button">Banana</button>
                        </li>
                        <li>
                          <button type="button">list</button>
                        </li>
                      </ul>
                    </div>
                  </AnimateHeight>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive mt-6">
          <table className="table-striped">
            <thead>
              <tr>
                {columns.map((column) => {
                  return (
                    <th key={column.key} className={column?.class}>
                      {column.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.mtncaisse}</td>
                    <td>{item.mtnbord}</td>
                    <td>{item.mntreleve}</td>
                    <td className="ltr:text-right rtl:text-left">
                      {item.ecart1} F CFA
                    </td>
                    <td className="ltr:text-right rtl:text-left">
                      {item.ecart2} F CFA
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailEncaissmentvalider;
