"use client";

import React, { useState, useEffect } from "react";
import IconSave from "@/components/icon/icon-save";
import IconArrowBackward from "../icon/icon-arrow-backward";
import IconSquareRotated from "../icon/icon-square-rotated";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconFolder from "@/components/icon/icon-folder";
import IconVideo from "@/components/icon/icon-video";
import IconEdit from "@/components/icon/icon-edit";
import AnimateHeight from "react-animate-height";
import IconTxtFile from "../icon/icon-txt-file";
import IconTrashLines from "../icon/icon-trash-lines";
import IconClipboardText from "../icon/icon-clipboard-text";

// Définition des types pour les options des sélecteurs
interface Option {
  value: string;
  label: string;
}

interface DataResponse {
  profils: Option[];
  dr_secteurs: { [key: string]: Option[] };
}

const Role = () => {
  const [personalInfo, setPersonalInfo] = useState({
    libelle: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    libelle: "",
    description: "",
  });

  const items2 = [
    { id: 6, text: "Dashboard", description: "Agence" },
    {
      id: 7,
      text: "Mes encaissements",
      description: "Assistant Gestion Comptable",
    },
    {
      id: 8,
      text: "Encaissement valider",
      description: "Responsable Commercial",
    },
    { id: 9, text: "Habilitations", description: "Directeur Régional" },
    {
      id: 10,
      text: "Utilisateurs",
      description: "Direction Financière et Comptable",
    },
  ];

  const permissionNames = [
    "CREATION",
    "LECTURE",
    "MODIFICATION",
    "SUPPRESSION",
  ];

  const [individualSwitches, setIndividualSwitches] = useState(
    items2.map(() => permissionNames.map(() => false))
  );
  const [globalSwitch, setGlobalSwitch] = useState(false);
  const [treeview, setTreeview] = useState<string[]>([]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  // Toggle global switch, which controls all individual switches
  const handleGlobalSwitch = () => {
    const newState = !globalSwitch;
    setGlobalSwitch(newState);
    const updatedSwitches = items2.map(() =>
      permissionNames.map(() => newState)
    );
    setIndividualSwitches(updatedSwitches);
  };

  // Toggle individual switch for a specific role and permission
  const handleIndividualSwitch = (roleIndex: number, permIndex: number) => {
    const updatedSwitches = [...individualSwitches];
    updatedSwitches[roleIndex][permIndex] =
      !updatedSwitches[roleIndex][permIndex];
    setIndividualSwitches(updatedSwitches);
  };

  // Handle folder expansion in the treeview
  const toggleTreeview = (name: any) => {
    if (treeview.includes(name)) {
      setTreeview((value) => value.filter((d) => d !== name));
    } else {
      setTreeview([...treeview, name]);
    }
  };

  // Render Permission TreeView (Folders and Files with Icons)
  const renderPermissionTree = () => {
    return (
      <ul className="font-semibold">
        <li className="py-[5px]">
          <button
            type="button"
            className={`${
              treeview.includes(personalInfo.libelle) ? "active" : ""
            }`}
            onClick={() => toggleTreeview(personalInfo.libelle)}
          >
            <IconCaretDown
              className={`relative -top-1 inline h-5 w-5 text-primary ltr:mr-2 rtl:ml-2 ${
                treeview.includes(personalInfo.libelle) && "rotate-180"
              }`}
            />
            <IconFolder className="relative -top-1 inline text-primary ltr:mr-2 rtl:ml-2" />
            {personalInfo.libelle}
          </button>
          <AnimateHeight
            duration={300}
            height={treeview.includes(personalInfo.libelle) ? "auto" : 0}
          >
            <ul className="ltr:pl-14 rtl:pr-14">
              {items2.map((role, roleIndex) => {
                // Check if any permission switch is on for this role
                const isRoleVisible = individualSwitches[roleIndex].some(
                  (state) => state
                );
                if (!isRoleVisible) return null;

                const isRoleOpen = treeview.includes(role.text);

                return (
                  <li key={role.id} className="py-[5px]">
                    <button
                      type="button"
                      className={`${isRoleOpen ? "active" : ""}`}
                      onClick={() => toggleTreeview(role.text)}
                    >
                      <IconCaretDown
                        className={`relative -top-1 inline h-5 w-5 text-primary ltr:mr-2 rtl:ml-2 ${
                          isRoleOpen && "rotate-180"
                        }`}
                      />
                      <IconFolder className="relative -top-1 inline text-primary ltr:mr-2 rtl:ml-2" />
                      {role.text}
                    </button>
                    <AnimateHeight
                      duration={300}
                      height={isRoleOpen ? "auto" : 0}
                    >
                      <ul className="ltr:pl-14 rtl:pr-14">
                        {permissionNames.map((permission, permIndex) => {
                          if (!individualSwitches[roleIndex][permIndex])
                            return null;

                          let IconComponent = IconTxtFile;
                          switch (permission) {
                            case "CREATION":
                              IconComponent = IconSave;
                              break;
                            case "LECTURE":
                              IconComponent = IconClipboardText;
                              break;
                            case "MODIFICATION":
                              IconComponent = IconEdit;
                              break;
                            case "SUPPRESSION":
                              IconComponent = IconTrashLines;
                              break;
                          }

                          return (
                            <li key={permIndex} className="py-[5px]">
                              <IconComponent className="inline h-4.5 w-4.5 text-primary ltr:mr-2 rtl:ml-2" />
                              {permission}
                            </li>
                          );
                        })}
                      </ul>
                    </AnimateHeight>
                  </li>
                );
              })}
            </ul>
          </AnimateHeight>
        </li>
      </ul>
    );
  };

  return (
    <div className="flex flex-col gap-2.5 xl:flex-row">
      <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <p className="item-center flex justify-center text-center">
          <button
            type="button"
            className="flex cursor-default items-center rounded-md font-medium text-primary duration-300"
          >
            <IconSquareRotated className="shrink-0 fill-primary" />
          </button>
          <span className="ml-2 text-xl font-thin text-black">
            Ajouter un profil
          </span>
        </p>
        <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />

        <div className="mt-8 px-4">
          {/* Personal Info */}
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-6 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="libelle"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Libelle<span className="text-red-500">*</span>
                </label>
                <input
                  id="libelle"
                  type="text"
                  name="libelle"
                  className="form-input flex-1"
                  placeholder="Entrer le libelle"
                  onChange={handlePersonalInfoChange}
                />
              </div>
              {errors.libelle && (
                <p className="text-red-500">{errors.libelle}</p>
              )}

              <div className="mt-4 flex items-center">
                <label
                  htmlFor="description"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Description<span className="text-red-500">*</span>
                </label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  className="form-input flex-1"
                  placeholder="Entrer la Description"
                  onChange={handlePersonalInfoChange}
                />
              </div>
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Permissions Table */}
          <div className="panel">
            <div className="mb-5 text-lg font-bold">Habilitations</div>
            <div className="table-responsive">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">
                      <label className="relative h-6 w-12">
                        <input
                          type="checkbox"
                          className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                          onChange={handleGlobalSwitch}
                          checked={globalSwitch}
                        />
                        <span className="outline_checkbox bg-icon block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(/assets/images/close.svg)] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-[url(/assets/images/checked.svg)] dark:border-white-dark dark:before:bg-white-dark"></span>
                      </label>
                    </th>
                    {permissionNames.map((permission, index) => (
                      <th key={index} className="px-4 py-2">
                        {permission}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items2.map((role, roleIndex) => (
                    <tr key={role.id} className="border-t dark:border-dark">
                      <td className="px-4 py-2 font-semibold">{role.text}</td>
                      {permissionNames.map((permission, permIndex) => (
                        <td key={permIndex} className="px-4 py-2">
                          <label className="relative h-6 w-12">
                            <input
                              type="checkbox"
                              className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                              checked={individualSwitches[roleIndex][permIndex]}
                              onChange={() =>
                                handleIndividualSwitch(roleIndex, permIndex)
                              }
                            />
                            <span className="outline_checkbox bg-icon block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(/assets/images/close.svg)] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-success peer-checked:before:left-7 peer-checked:before:bg-success peer-checked:before:bg-[url(/assets/images/checked.svg)] dark:border-white-dark dark:before:bg-white-dark"></span>
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-10 mt-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
              <button type="button" className="btn btn-success w-full gap-2">
                <IconSave className="shrink-0 ltr:mr-2 rtl:ml-2" />
                Ajouter
              </button>

              <button type="button" className="btn btn-danger w-full gap-2">
                <IconArrowBackward className="shrink-0 ltr:mr-2 rtl:ml-2" />
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Récapitulatif */}
      <div className="mt-6 w-full xl:mt-0 xl:w-96">
        <div className="panel mb-5 h-full">
          <p className="flex items-center justify-center text-center">
            <button
              type="button"
              className={`h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
            >
              <IconSquareRotated className="shrink-0 fill-success" />
            </button>
            <span className="ml-4 items-center justify-center text-center text-lg font-bold">
              Récapitulatif
            </span>
          </p>
          <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />

          <div className="mt-4">
            <p>
              <label className="text-[#8e8e8e]">
                Libelle :{" "}
                <span className="text-black">{personalInfo.libelle}</span>
              </label>
              <br />
              <label className="text-[#8e8e8e]">
                Description :{" "}
                <span className="text-black">{personalInfo.description}</span>
              </label>
            </p>

            <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
            <p className="flex items-center justify-center text-center">
              <button
                type="button"
                className={`h-10 cursor-default items-center rounded-md font-medium text-danger duration-300`}
              >
                <IconSquareRotated className="shrink-0 fill-danger" />
              </button>
              <span className="ml-4 items-center justify-center text-center text-lg font-bold">
                Permissions
              </span>
            </p>
            <br />
            {renderPermissionTree()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
