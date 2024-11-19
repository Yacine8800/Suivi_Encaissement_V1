"use client";

import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import { French } from "flatpickr/dist/l10n/fr.js";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

type SelectedOptionsType = {
  DR: MultiValue<{ value: string; label: string }>;
  Exploitation: MultiValue<{ value: string; label: string }>;
  Energie: MultiValue<{ value: string; label: string }>;
  Reglement: MultiValue<{ value: string; label: string }>;
};

const Filtre = () => {
  const [date3, setDate3] = useState<string[]>(["2022-07-05", "2022-07-10"]);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType>({
    DR: [],
    Exploitation: [],
    Energie: [],
    Reglement: [],
  });

  const optionsDR = [
    { value: "dr-option1", label: "DR Option 1" },
    { value: "dr-option2", label: "DR Option 2" },
    { value: "dr-option3", label: "DR Option 3" },
    { value: "dr-option4", label: "DR Option 4" },
    { value: "dr-option5", label: "DR Option 5" },
  ];

  const optionsExploitation = [
    { value: "exploitation-option1", label: "Exploitation Option 1" },
    { value: "exploitation-option2", label: "Exploitation Option 2" },
    { value: "exploitation-option3", label: "Exploitation Option 3" },
  ];

  const optionsEnergie = [
    { value: "energie-option1", label: "Energie Option 1" },
    { value: "energie-option2", label: "Energie Option 2" },
    { value: "energie-option3", label: "Energie Option 3" },
  ];

  const optionsReglement = [
    { value: "reglement-option1", label: "Règlement Option 1" },
    { value: "reglement-option2", label: "Règlement Option 2" },
    { value: "reglement-option3", label: "Règlement Option 3" },
  ];

  const handleSelectChange = (
    selected: MultiValue<{ value: string; label: string }>,
    name: keyof SelectedOptionsType
  ) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: selected || [],
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setSelectedOptions({
      DR: [],
      Exploitation: [],
      Energie: [],
      Reglement: [],
    });
    setDate3(["2022-07-05", "2022-07-10"]);
  };

  return (
    <div>
      <p className="ml-1 text-xl">Rapprochements</p>

      <div className="panel mt-2 flex items-center whitespace-nowrap p-3 text-primary lg:col-span-2">
        <div
          className="w-[100px] cursor-pointer rounded bg-primary p-1.5 text-center text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3"
          onClick={toggleFilters}
        >
          <span>Filtre</span>
        </div>

        {showFilters ? (
          <div className="ml-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex-shrink-0">
              <Flatpickr
                options={{
                  mode: "range",
                  dateFormat: "d F Y",
                  locale: French,
                  position: "auto left",
                }}
                value={date3} // Keep the selected date visible
                className="form-input w-[260px]"
                onChange={(dates: Date[]) =>
                  setDate3(
                    dates.map((date) => date.toLocaleDateString("fr-FR"))
                  )
                }
              />
            </div>
            <div>
              <Select
                placeholder="DR"
                options={optionsDR}
                isMulti
                isSearchable={true}
                className="w-full"
                onChange={(selected) => handleSelectChange(selected, "DR")}
                value={selectedOptions.DR}
              />
            </div>
            <div>
              <Select
                placeholder="Exploitation"
                options={optionsExploitation}
                isMulti
                isSearchable={true}
                className="w-full"
                onChange={(selected) =>
                  handleSelectChange(selected, "Exploitation")
                }
                value={selectedOptions.Exploitation}
              />
            </div>
            <div>
              <Select
                placeholder="Energie"
                options={optionsEnergie}
                isMulti
                isSearchable={true}
                className="w-full"
                onChange={(selected) => handleSelectChange(selected, "Energie")}
                value={selectedOptions.Energie}
              />
            </div>
            <div>
              <Select
                placeholder="Règlement"
                options={optionsReglement}
                isMulti
                isSearchable={true}
                className="w-full"
                onChange={(selected) =>
                  handleSelectChange(selected, "Reglement")
                }
                value={selectedOptions.Reglement}
              />
            </div>
          </div>
        ) : (
          <div className="ml-5 flex flex-wrap gap-4">
            <div className="rounded bg-gray-100 p-2">
              <strong>Période :</strong>{" "}
              <span className="font-bold text-black">{date3.join(" au ")}</span>
            </div>
            {Object.entries(selectedOptions).map(([key, options]) =>
              options.length > 0 ? (
                <div
                  key={key}
                  className="overflow-x-auto rounded bg-gray-100 p-2"
                >
                  <strong>{key} :</strong>{" "}
                  {options.map((option) => (
                    <span
                      key={option.value}
                      className="mr-2 inline-block max-w-[150px] truncate rounded-full bg-gray-200 px-2 py-1 text-gray-800"
                    >
                      {option.label}
                    </span>
                  ))}
                </div>
              ) : null
            )}
          </div>
        )}

        <div className="ml-6 flex gap-3">
          <div className="cursor-pointer rounded bg-success p-1.5 text-center text-white ring-2 ring-success/30">
            <span>Appliquer le filtre</span>
          </div>
          <div
            className="cursor-pointer rounded bg-dark-light p-1.5 text-center font-semibold text-dark ring-2 ring-white-dark/30"
            onClick={clearFilters}
          >
            <span>Annuler le filtre</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtre;
