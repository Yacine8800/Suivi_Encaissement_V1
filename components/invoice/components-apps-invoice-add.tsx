"use client";

import React, { useState, useEffect } from "react";
import Select, { MultiValue, ActionMeta } from "react-select";
import IconSave from "@/components/icon/icon-save";
import IconArrowBackward from "../icon/icon-arrow-backward";
import IconSquareRotated from "../icon/icon-square-rotated";

// Définition des types pour les options des sélecteurs
interface Option {
  value: string;
  label: string;
}

interface DataResponse {
  profils: Option[];
  dr_secteurs: { [key: string]: Option[] };
}

const ComponentsAppsInvoiceAdd = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    prenom: "",
    email: "",
    number: "",
  });

  const [accountInfo, setAccountInfo] = useState({
    matricule: "",
    profil: "",
    dr: [] as Option[],
    secteur: [] as Option[],
  });

  const [errors, setErrors] = useState({
    name: "",
    prenom: "",
    email: "",
    number: "",
    matricule: "",
    profil: "",
    dr: "",
    secteur: "",
  });

  const [profils, setProfils] = useState<Option[]>([]);
  const [drSecteurs, setDrSecteurs] = useState<{ [key: string]: Option[] }>({});
  const [availableDirections, setAvailableDirections] = useState<Option[]>([]);
  const [availableSecteurs, setAvailableSecteurs] = useState<Option[]>([]);
  const [showDirectionRegional, setShowDirectionRegional] = useState(false);
  const [showSecteur, setShowSecteur] = useState(false);

  // Fonction pour charger les données à partir de l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data"); // API pour récupérer les profils et secteurs
        const data: DataResponse = await response.json();
        setProfils(data.profils);
        setDrSecteurs(data.dr_secteurs);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();
  }, []);

  // Validation des champs obligatoires
  const validateFields = () => {
    let newErrors = { ...errors };
    let isValid = true;

    if (!personalInfo.name) {
      newErrors.name = "Le nom est obligatoire";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    if (!personalInfo.prenom) {
      newErrors.prenom = "Le prénom est obligatoire";
      isValid = false;
    } else {
      newErrors.prenom = "";
    }

    if (!personalInfo.email) {
      newErrors.email = "L'email est obligatoire";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!personalInfo.number) {
      newErrors.number = "Le téléphone est obligatoire";
      isValid = false;
    } else {
      newErrors.number = "";
    }

    if (!accountInfo.matricule) {
      newErrors.matricule = "Le matricule est obligatoire";
      isValid = false;
    } else {
      newErrors.matricule = "";
    }

    if (!accountInfo.profil) {
      newErrors.profil = "Le profil est obligatoire";
      isValid = false;
    } else {
      newErrors.profil = "";
    }

    if (["Comptable", "AGC"].includes(accountInfo.profil)) {
      if (accountInfo.dr.length === 0) {
        newErrors.dr = "La direction régionale est obligatoire";
        isValid = false;
      } else {
        newErrors.dr = "";
      }

      if (accountInfo.secteur.length === 0) {
        newErrors.secteur = "Le secteur est obligatoire";
        isValid = false;
      } else {
        newErrors.secteur = "";
      }
    } else {
      newErrors.dr = "";
      newErrors.secteur = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async () => {
    if (validateFields()) {
      const newUser = {
        name: personalInfo.name,
        prenom: personalInfo.prenom,
        email: personalInfo.email,
        number: personalInfo.number,
        matricule: accountInfo.matricule,
        profil: accountInfo.profil,
        dr: accountInfo.dr,
        secteur: accountInfo.secteur,
      };

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: newUser }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Afficher un message de succès
        } else {
          const errorData = await response.json();
          console.error(errorData.message); // Afficher un message d'erreur
        }
      } catch (error) {
        console.error("Erreur lors de la soumission", error);
      }
    }
  };

  // Gestion de la sélection du profil
  const handleProfilChange = (selectedProfil: Option | null) => {
    if (selectedProfil) {
      if (["Comptable", "AGC"].includes(selectedProfil.value)) {
        const directions = Object.keys(drSecteurs).map((dr) => ({
          value: dr,
          label: dr,
        }));
        setShowDirectionRegional(true);
        setAvailableDirections(directions);
      } else {
        setShowDirectionRegional(false);
        setAvailableDirections([]);
        setAvailableSecteurs([]);
        setShowSecteur(false);
        setAccountInfo({ ...accountInfo, dr: [], secteur: [] });
      }
      setAccountInfo({ ...accountInfo, profil: selectedProfil.value });
    } else {
      setShowDirectionRegional(false);
      setShowSecteur(false);
      setAccountInfo({ ...accountInfo, profil: "", dr: [], secteur: [] });
    }
  };

  // Gestion de la sélection de la direction régionale
  const handleDirectionChange = (
    selectedDirections: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    const selectedDRs = selectedDirections.map((dr) => dr.value);

    // Filtrer les secteurs sélectionnés en fonction des DR choisies
    const newSecteurs = accountInfo.secteur.filter((secteur) =>
      selectedDRs.some((dr) => drSecteurs[dr]?.includes(secteur))
    );

    const secteursForSelectedDRs = selectedDRs.flatMap(
      (dr) => drSecteurs[dr] || []
    );

    setAvailableSecteurs(secteursForSelectedDRs);

    // Afficher ou masquer le sélecteur de secteur en fonction des DR sélectionnées
    setShowSecteur(selectedDirections.length > 0);

    setAccountInfo((prevState) => ({
      ...prevState,
      dr: Array.from(selectedDirections),
      secteur: newSecteurs,
    }));
  };

  // Gestion de la sélection des secteurs
  const handleSecteurChange = (
    selectedSecteurs: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    setAccountInfo({ ...accountInfo, secteur: Array.from(selectedSecteurs) });
  };

  // Gestion de la modification des informations personnelles
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleAccountInfoChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
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
            Ajouter un utilisateur
          </span>
        </p>
        <hr className="dark:border-[#1b2e4b] my-6 border-white-light" />

        <div className="mt-8 px-4">
          <div className="flex flex-col justify-between lg:flex-row">
            {/* Information Personnelle */}
            <div className="lg:w-1/2 mb-6 w-full ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="text-lg">Information personnelle :</div>

              <div className="mt-4 flex items-center">
                <label
                  htmlFor="reciever-name"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Nom<span className="text-red-500">*</span>
                </label>
                <input
                  id="reciever-name"
                  type="text"
                  name="name"
                  className="form-input flex-1"
                  placeholder="Entrer votre nom"
                  onChange={handlePersonalInfoChange}
                />
              </div>
              {errors.name && <p className="text-red-500">{errors.name}</p>}

              <div className="mt-4 flex items-center">
                <label
                  htmlFor="reciever-prenom"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Prénoms<span className="text-red-500">*</span>
                </label>
                <input
                  id="reciever-prenom"
                  type="text"
                  name="prenom"
                  className="form-input flex-1"
                  placeholder="Entrer votre prénom"
                  onChange={handlePersonalInfoChange}
                />
              </div>
              {errors.prenom && <p className="text-red-500">{errors.prenom}</p>}

              <div className="mt-4 flex items-center">
                <label
                  htmlFor="reciever-email"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  id="reciever-email"
                  type="email"
                  name="email"
                  className="form-input flex-1"
                  placeholder="Entrer votre email"
                  onChange={handlePersonalInfoChange}
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <div className="mt-4 flex items-center">
                <label
                  htmlFor="reciever-number"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Téléphone<span className="text-red-500">*</span>
                </label>
                <input
                  id="reciever-number"
                  type="text"
                  name="number"
                  className="form-input flex-1"
                  placeholder="Entrer votre téléphone"
                  onChange={handlePersonalInfoChange}
                />
              </div>
              {errors.number && <p className="text-red-500">{errors.number}</p>}
            </div>

            {/* Information Compte */}
            <div className="lg:w-1/2 w-full">
              <div className="text-lg">Information Compte :</div>

              <div className="mt-4 flex items-center">
                <label htmlFor="acno" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                  Matricule<span className="text-red-500">*</span>
                </label>
                <input
                  id="acno"
                  type="text"
                  name="matricule"
                  className="form-input flex-1"
                  placeholder="Entrer votre matricule"
                  onChange={handleAccountInfoChange}
                />
              </div>
              {errors.matricule && (
                <p className="text-red-500">{errors.matricule}</p>
              )}

              <div className="mt-4 flex items-center">
                <label
                  htmlFor="profil"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Profil<span className="text-red-500">*</span>
                </label>
                <Select
                  placeholder="Choisir un profil"
                  options={profils}
                  onChange={handleProfilChange}
                  isClearable
                />
              </div>
              {errors.profil && <p className="text-red-500">{errors.profil}</p>}

              {showDirectionRegional && (
                <div className="mt-4 flex items-center">
                  <label htmlFor="DR" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                    Direction régionale<span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Sélectionner une direction régionale"
                    options={availableDirections}
                    isMulti
                    onChange={handleDirectionChange}
                  />
                </div>
              )}
              {errors.dr && <p className="text-red-500">{errors.dr}</p>}

              {showSecteur && (
                <div className="mt-4 flex items-center">
                  <label
                    htmlFor="secteur"
                    className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                  >
                    Secteur<span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Sélectionner un secteur"
                    options={availableSecteurs}
                    isMulti
                    onChange={handleSecteurChange}
                    value={accountInfo.secteur} // Gérer les valeurs sélectionnées
                  />
                </div>
              )}
              {errors.secteur && (
                <p className="text-red-500">{errors.secteur}</p>
              )}
            </div>
          </div>

          <div className="mb-10 mt-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
              <button
                type="button"
                className="btn btn-success w-full gap-2"
                onClick={handleSubmit}
              >
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
          <hr className="dark:border-[#1b2e4b] my-6 border-white-light" />

          <p className="flex items-center justify-center text-center">
            <button
              type="button"
              className={` h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
            >
              <IconSquareRotated className="shrink-0 fill-success" />
            </button>
            <span className="ml-4 items-center justify-center text-center text-lg font-bold">
              Récapitulatif
            </span>
          </p>

          <div className="mt-4">
            <p>
              <label className="text-[#8e8e8e]">
                Nom : <span className="text-black">{personalInfo.name}</span>
              </label>{" "}
              <br />
              <label className="text-[#8e8e8e]">
                Prénoms :{" "}
                <span className="text-black">{personalInfo.prenom} </span>
              </label>
              <br />
              <label className="text-[#8e8e8e]">
                Email : <span className="text-black">{personalInfo.email}</span>
              </label>{" "}
              <br />
              <label className="text-[#8e8e8e]">
                Téléphone :{" "}
                <span className="text-black">{personalInfo.number}</span>
              </label>{" "}
            </p>
            <p className="mt-4">
              <label className="text-[#8e8e8e]">
                Matricule :{" "}
                <span className="text-black">{accountInfo.matricule}</span>
              </label>{" "}
              <br />
              <label className="text-[#8e8e8e]">
                Profil :{" "}
                <span className="text-black">{accountInfo.profil}</span>
              </label>{" "}
              <br />
              {showDirectionRegional && accountInfo.dr.length > 0 && (
                <>
                  <label className="text-[#8e8e8e]">
                    Direction régionale :{" "}
                    <span className="text-black">
                      {accountInfo.dr.map((dr: Option) => dr.label).join(", ")}
                    </span>
                  </label>{" "}
                  <br />
                </>
              )}
              {showSecteur && accountInfo.secteur.length > 0 && (
                <label className="text-[#8e8e8e]">
                  Secteur :{" "}
                  <span className="text-black">
                    {accountInfo.secteur
                      .map((secteur: Option) => secteur.label)
                      .join(", ")}
                  </span>
                </label>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsAppsInvoiceAdd;
