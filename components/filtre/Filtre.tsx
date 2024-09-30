"use client";

import React from "react";
import Select from "react-select";

const Filtre = () => {
  const options5 = [
    { value: "orange", label: "Orange" },
    { value: "white", label: "White" },
    { value: "purple", label: "Purple" },
  ];
  return (
    <div>
      <p className="ml-1 text-xl">Rapprochements</p>

      <div className="panel mt-2 flex items-center whitespace-nowrap p-3 text-primary lg:col-span-2">
        <div className="w-[100px] rounded bg-primary p-1.5 text-center text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
          <span className="cursor-pointer">Filtre</span>
        </div>

        <div className="ml-5 flex gap-4">
          <Select
            placeholder="Periode"
            options={options5}
            isMulti
            isSearchable={true}
            className="w-[150px]"
          />
          <Select
            placeholder="DR"
            options={options5}
            isMulti
            isSearchable={true}
            className="w-[150px]"
          />
          <Select
            placeholder="Exploitation"
            options={options5}
            isMulti
            isSearchable={true}
            className="w-[150px]"
          />
          <Select
            placeholder="Energie"
            options={options5}
            isMulti
            isSearchable={true}
            className="w-[150px]"
          />
          <Select
            placeholder="Travaux"
            options={options5}
            isMulti
            isSearchable={true}
            className="w-[150px]"
          />
          <Select
            placeholder="Pénalité"
            options={options5}
            isMulti
            isSearchable={true}
            className="w-[150px]"
          />
          <Select
            placeholder="Règlement"
            options={options5}
            isMulti
            isSearchable={true}
            className="w-[150px]"
          />
        </div>

        <div className="gap- ml-6">
          <div className="cursor-pointer rounded bg-success p-1.5 text-center text-white ring-2 ring-success/30 ltr:mr-3 rtl:ml-3">
            <span className="">Appliquer le filtre</span>
          </div>
          <br />
          <div className="text-dark-white cursor-pointer rounded bg-dark-light p-1 text-center font-bold text-dark ring-2 ring-white-dark/30 ltr:mr-3 rtl:ml-3">
            <span className="">Annuler</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtre;
