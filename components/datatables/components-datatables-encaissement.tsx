"use client";

import { useState, useEffect, Fragment, useRef } from "react";

import { DataTable, DataTableSortStatus } from "mantine-datatable";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconPencil from "@/components/icon/icon-pencil";
import IconX from "../icon/icon-x";
import Dropdown from "@/components/dropdown";

import ImageUploading, { ImageListType } from "react-images-uploading";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { French } from "flatpickr/dist/l10n/fr.js";

import IconExcel from "../icon/excel";
import IconPaperclip from "../icon/icon-paperclip";
import Csv from "../icon/csv";
import Pdf from "../icon/pdf";
import React from "react";
import { EStatutEncaissement } from "@/utils/enums";
import IconEye from "../icon/icon-eye";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "@/store";
import { fetchDirectionRegionales } from "@/store/reducers/select/dr.slice";
import { fetchSecteurs } from "@/store/reducers/select/secteur.slice";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { submitEncaissementValidation } from "@/store/reducers/encaissements/soumission.slice";
import { fetchDataReleve } from "@/store/reducers/encaissements/relevé-slice";
import IconMail from "../icon/icon-mail";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Transition, Dialog } from "@headlessui/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { ToastError, ToastSuccess } from "@/utils/toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import IconRefresh from "../icon/icon-refresh";
import { Paginations } from "@/utils/interface";

interface DataReverse {
  id: number;
  "Date Encais": string;
  "Caisse mode": string;
  banque: string;
  "Montant caisse (A)": number;
  "Montant bordereau (B)": number;
  "Montant revelé (C)": number;
  "Date cloture": string;
  "Date Validation": string;
  Bordereau: string;
  caisse: string;
  statutValidation: number;
  DR?: string;
  EXP?: string;
  Produit?: string;
  "Compte banque Jade"?: string;
  "Ecart(A-B)"?: any;
  "Ecart(B-C)"?: any;
  "Observation(A-B)"?: string;
  "Observation(B-C)"?: string;
  compteBanque: string;
}

const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return "N/A";
  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    useGrouping: true,
  }).format(num);
  return formatted.replace(/\s/g, " ").replace(/\u202f/g, " ");
};

interface EncaissementComptableProps {
  statutValidation: number;
  data: any[];
  loading: boolean;
  paginate: Paginations;
}

const ComponentsDatatablesColumnChooser: React.FC<
  EncaissementComptableProps
> = ({ statutValidation, data, loading, paginate }) => {
  const dispatch = useDispatch<TAppDispatch>();

  const [selectedSecteurIds, setSelectedSecteurIds] = useState<number[]>([]);
  const [selectedDRIds, setSelectedDRIds] = useState<number[]>([]); // Liste des IDs sélectionnés
  const [filteredSecteurs, setFilteredSecteurs] = useState<any[]>([]);

  const drData: any[] = useSelector((state: TRootState) => state.dr?.data);

  const drLoading = useSelector((state: TRootState) => state.dr?.loading);

  const secteurData: any[] = useSelector(
    (state: TRootState) => state.secteur?.data
  );

  const secteurLoading = useSelector(
    (state: TRootState) => state.secteur.loading
  );

  useEffect(() => {
    dispatch(fetchDirectionRegionales());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDRIds.length > 0) {
      dispatch(fetchSecteurs(selectedDRIds));
    }
  }, [selectedDRIds, dispatch]);

  useEffect(() => {
    const secteurs = secteurData.filter((secteur) =>
      selectedDRIds.includes(secteur.directionRegionaleId)
    );
    setFilteredSecteurs(secteurs);
  }, [secteurData, selectedDRIds]);

  const handleDRSelection = (id: number) => {
    setSelectedDRIds((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      const updatedSelectedDRs = isSelected
        ? prevSelected.filter((drId) => drId !== id) // Retirer la DR
        : [...prevSelected, id]; // Ajouter la DR

      if (updatedSelectedDRs.length === 0) {
        // Si aucune DR n'est sélectionnée, vider les secteurs
        setSelectedSecteurIds([]);
      } else {
        // Si des DR restent sélectionnées, mettre à jour les secteurs comme avant
        setSelectedSecteurIds((prevSecteurs) =>
          prevSecteurs.filter((secteurId) =>
            secteurData.some(
              (secteur) =>
                updatedSelectedDRs.includes(secteur.directionRegionaleId) &&
                secteur.id === secteurId
            )
          )
        );
      }

      return updatedSelectedDRs;
    });
  };

  const handleSecteurSelection = (id: number) => {
    const secteur = secteurData.find((s) => s.id === id);
    if (!secteur || !selectedDRIds.includes(secteur.directionRegionaleId)) {
      // Ignorer les secteurs non valides
      return;
    }

    setSelectedSecteurIds(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((secteurId) => secteurId !== id) // Désélectionner
          : [...prevSelected, id] // Sélectionner
    );
  };

  const [showSettingModal, setShowSettingModal] = useState(false);

  const formatDateData = (dateString: string | null | undefined): string => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        console.error("Date invalide :", dateString);
        return "N/A";
      }

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Erreur lors du formatage de la date :", error);
      return "N/A";
    }
  };

  const filterAndMapData = (data: any[], statutValidation: number): any[] => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    const mappedData = data?.map((item) => ({
      id: item.id,
      DR: item.directionRegionale,
      EXP: item.codeExpl,
      Produit: item.produit,
      banque: item.banque,
      compteBanque: item.compteBanque,
      journeeCaisse: item.journeeCaisse,
      modeReglement: item.modeReglement,
      "Date Encais": formatDateData(item.dateEncaissement),
      "Montant caisse (A)": item.montantRestitutionCaisse || 0,
      "Montant bordereau (B)": item.montantBordereauBanque || 0,
      "Montant revelé (C)": item.validationEncaissement?.montantReleve || 0,
      "Date cloture": formatDateData(item.dateRemiseBanque) || "",
      Bordereau: item.numeroBordereau || "",
      caisse: item.caisse || "",
      statutValidation: item.validationEncaissement?.statutValidation,
      "Ecart(A-B)": item.montantRestitutionCaisse - item.montantBordereauBanque,
      "Ecart(B-C)": item.validationEncaissement?.ecartReleve || 0,
      "Observation(A-B)":
        item.validationEncaissement?.observationCaisse || "RAS",
      "Observation(B-C)":
        item.validationEncaissement?.observationReleve || "RAS",
      ...(item.validationEncaissement && {
        "Date Validation": item.validationEncaissement?.dateValidation || "N/A",
        "Observation caisse":
          item.validationEncaissement?.observationCaisse || "N/A",
        "Observation réclamation":
          item.validationEncaissement?.observationReclamation || "N/A",
        "Observation relevé":
          item.validationEncaissement?.observationReleve || "N/A",
        "Ecart relevé": item.validationEncaissement?.ecartReleve || "0",
        "Montant relevé": item.validationEncaissement?.montantReleve || "0",
      }),
    }));
    return mappedData;
  };

  useEffect(() => {
    const allData = filterAndMapData(data, statutValidation);
    setRecordsData(allData);
  }, [data]);

  const filteredData = filterAndMapData(data, statutValidation);

  const [recordsData, setRecordsData] = useState<any[]>([]);

  const unvalidatedRecords = recordsData.filter(
    (record) => record.validated !== EStatutEncaissement.VALIDE
  );

  const totalUnvalidatedRecords = unvalidatedRecords.length;
  const encaissementText = ` Encaissement${
    totalUnvalidatedRecords > 1 ? "s " : " "
  } `;

  const [currentPage, setCurrentPage] = useState(paginate.currentPage || 1);
  const [pageSize, setPageSize] = useState(10);
  const PAGE_SIZES = [10, 20, 30, 50, 100];

  useEffect(() => {
    if (paginate.currentPage !== currentPage) {
      setCurrentPage(paginate.currentPage || 1);
    }
  }, [paginate]);

  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "Date Encais",
    direction: "asc",
  });

  const [hideCols, setHideCols] = useState<string[]>([]);
  const [rasChecked1, setRasChecked1] = useState(false);
  const [rasChecked2, setRasChecked2] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataReverse | null>(null);
  const [observationCaisse, setObservationCaisse] = useState("");
  const [observationBanque, setObservationBanque] = useState("");

  const swiperRef = useRef<any>();

  const user = useSelector((state: TRootState) => state.auth?.user);

  const { email = "" } = user || {};

  const showHideColumns = (col: string) => {
    if (hideCols.includes(col)) {
      setHideCols((prev) => prev.filter((d) => d !== col));
    } else {
      setHideCols((prev) => [...prev, col]);
    }
  };

  const handleEdit = (row: DataReverse) => {
    setSelectedRow(row);
    setObservationCaisse(row["Observation(A-B)"] || "");
    setObservationBanque(row["Observation(B-C)"] || "");
    setRasChecked1(false);
    setRasChecked2(false);
    setShowSettingModal(true);
  };

  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = parseInt(event.target.value.replace(/\D/g, ""), 10);
    setSelectedRow((prev) => ({
      ...(prev as DataReverse),
      [field]: isNaN(value) ? "" : value,
    }));
  };

  const baseCols = [
    {
      accessor: "caisse",
      title: "Caisse",
      sortable: true,
      render: ({ caisse }: { caisse: string }) => (
        <div className="cursor-pointer font-semibold text-primary underline hover:no-underline">
          {`#${caisse}`}
        </div>
      ),
    },
    {
      accessor: "modeEtJournee",
      title: "Journée caisse - Mode de règlement ",
      sortable: true,
      render: ({ modeReglement, journeeCaisse }: any) => (
        <div>
          <p className="text-sm ">
            {journeeCaisse} -{" "}
            <span className="text-sm  text-gray-500">{modeReglement}</span>
          </p>
        </div>
      ),
    },
    { accessor: "banque", title: "Banque", sortable: true },
    {
      accessor: "compteBanque",
      title: "Compte banque",
      sortable: true,
      render: ({ compteBanque }: { compteBanque: string }) => (
        <div className=" text-primary  hover:no-underline">
          {`${compteBanque}`}
        </div>
      ),
    },

    { accessor: "DR", title: "DR", sortable: true },
    { accessor: "EXP", title: "Code Exp", sortable: true },
    { accessor: "Produit", title: "Produit", sortable: true },
    { accessor: "Date Encais", title: "Date Encaissement", sortable: true },

    {
      accessor: "Montant caisse (A)",
      title: "Montant Restitution Caisse (A)",
      sortable: true,
      render: ({ "Montant caisse (A)": montantCaisse }: DataReverse) =>
        `${formatNumber(montantCaisse)} F CFA`,
    },
    {
      accessor: "Montant bordereau (B)",
      title: "Montant Bordereau Banque (B)",
      sortable: true,
      render: ({ "Montant bordereau (B)": montantBordereau }: DataReverse) =>
        `${formatNumber(montantBordereau)} F CFA`,
    },
    {
      accessor: "Ecart(A-B)",
      title: "Ecart (A-B)",
      sortable: true,
      render: ({ "Ecart(A-B)": ecartAB }: DataReverse) => (
        <div
          className={
            ecartAB < 0
              ? "text-danger"
              : ecartAB > 0
              ? "text-success"
              : "font-bold"
          }
        >
          {formatNumber(ecartAB)} F CFA
        </div>
      ),
    },
  ];

  const additionalCols =
    statutValidation !== 0
      ? [
          {
            accessor: "Date Validation",
            title: "Date Validation",
            sortable: true,
            render: ({ "Date Validation": dateValidation }: any) =>
              formatDateData(dateValidation) || "N/A",
          },
          {
            accessor: "Observation caisse",
            title: "Observation Caisse",
            sortable: false,
            render: ({ "Observation caisse": observation }: any) => (
              <span>{observation}</span>
            ),
          },
          {
            accessor: "Observation relevé",
            title: "Observation Relevé",
            sortable: false,
            render: ({ "Observation relevé": observation }: any) => (
              <span>{observation}</span>
            ),
          },

          {
            accessor: "Observation réclamation",
            title: "Observation réclamation",
            sortable: false,
            render: ({ "Observation réclamation": observation }: any) => (
              <span>{observation}</span>
            ),
          },
          {
            accessor: "Ecart (B-C)",
            title: "Écart (B-C)",
            sortable: true,
            render: ({ "Ecart(B-C)": ecartReleve }: DataReverse) => (
              <div
                className={
                  ecartReleve < 0
                    ? "text-danger"
                    : ecartReleve > 0
                    ? "text-success"
                    : "font-bold"
                }
              >
                {formatNumber(ecartReleve)} F CFA
              </div>
            ),
          },
          {
            accessor: "Montant relevé (C°",
            title: "Montant Relevé",
            sortable: true,
            render: ({ "Montant relevé": montantReleve }: any) =>
              `${formatNumber(montantReleve)} F CFA`,
          },
        ]
      : [];

  const actionsCol = [
    {
      accessor: "Actions",
      title: "Actions",
      sortable: false,
      render: (row: DataReverse) => (
        <Tippy content={statutValidation === 0 ? "Modifier" : "Voir"}>
          <button type="button" onClick={() => handleEdit(row)}>
            {statutValidation === 0 ? (
              <div className="flex items-center gap-2">
                <IconPencil className="ltr:mr-2 rtl:ml-2" />
                <Tippy content="Envoyer un mail">
                  <button
                    type="button"
                    className="text-red-500 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModal17(true);
                    }}
                  >
                    <IconMail className="ltr:mr-2 rtl:ml-2 " />
                  </button>
                </Tippy>
              </div>
            ) : (
              <IconEye className="ltr:mr-2 rtl:ml-2" />
            )}
          </button>
        </Tippy>
      ),
    },
  ];

  const cols = [...baseCols, ...additionalCols, ...actionsCol];

  useEffect(() => {
    const filteredData = filterAndMapData(data, statutValidation);
    setRecordsData(filteredData);
  }, [data, statutValidation]);

  const today = new Date().toLocaleDateString();
  const [showCustomizer, setShowCustomizer] = useState(false);

  const handleRasChecked1Change = () => {
    setRasChecked1(!rasChecked1);
    if (!rasChecked1) {
      setObservationCaisse("");
    }
  };

  const handleRasChecked2Change = () => {
    setRasChecked2(!rasChecked2);
    if (!rasChecked2) {
      setObservationBanque("");
    }
  };

  const [images2, setImages2] = useState<any>([]);
  const maxNumber = 69;

  const onChange2 = (imageList: ImageListType) => {
    setImages2(imageList as never[]);
  };

  const jour = new Date();
  const lendemain = new Date();
  lendemain.setDate(jour.getDate() + 1);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [dateRange, setDateRange] = useState<Date[]>([jour, lendemain]);

  const banque = [
    { value: "BANQ 1", label: "BANQ 1" },
    { value: "BANQ 2", label: "BANQ 2" },
    { value: "BANQ 3", label: "BANQ 3" },
  ];
  const caisse = [
    { value: "CAISSE 1", label: "CAISSE 1" },
    { value: "CAISSE 2", label: "CAISSE 2" },
    { value: "CAISSE 3", label: "CAISSE 3" },
  ];

  const modeReglement = [
    { value: "Espece", label: "Espece" },
    { value: "Cheque", label: "Cheque" },
    { value: "Virement", label: "Virement" },
  ];

  const getStatutLibelle = (
    statut: EStatutEncaissement,
    count: number
  ): string => {
    const isPlural = count > 1;
    switch (statut) {
      case EStatutEncaissement.EN_ATTENTE:
        return isPlural ? "en attentes" : "en attente";
      case EStatutEncaissement.REJETE:
        return isPlural ? "rejetés" : "rejeté";
      case EStatutEncaissement.TRAITE:
        return isPlural ? "traités" : "traité";
      case EStatutEncaissement.VALIDE:
        return isPlural ? "validés" : "validé";
      case EStatutEncaissement.CLOTURE:
        return isPlural ? "cloturés" : "cloturé";
      default:
        return isPlural ? "inconnus" : "inconnu";
    }
  };

  const showAlertValide = async (encaissementId: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-dark ltr:mr-3 rtl:ml-3",
        popup: "sweet-alerts",
      },
      buttonsStyling: false,
    });

    await swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr de valider ?",
        text: "Cette action validera l'encaissement.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        reverseButtons: true,
        padding: "2em",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Payload à soumettre
          const payload = {
            encaissementId, // ID de l'encaissement passé à la fonction
            statutValidation: EStatutEncaissement.VALIDE, // Statut validé
          };

          // Appel à la fonction Redux ou autre logique de soumission
          dispatch(submitEncaissementValidation(payload))
            .unwrap()
            .then((response) => {
              swalWithBootstrapButtons.fire(
                "Validé",
                "Votre encaissement a été validé avec succès.",
                "success"
              );
              dispatch(fetchDataReleve({ id: statutValidation.toString() }));
              setShowSettingModal(false);
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire(
                "Erreur",
                "Une erreur est survenue lors de la validation.",
                "error"
              );
              console.error("Erreur lors de la soumission :", error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Vous avez annulé l'action.",
            "error"
          );
        }
      });
  };

  const showAlertRamener = async (encaissementId: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-dark ltr:mr-3 rtl:ml-3",
        popup: "sweet-alerts",
      },
      buttonsStyling: false,
    });

    await swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr de ramener a traiter ?",
        text: "Cette action ramenera l'encaissement.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        reverseButtons: true,
        padding: "2em",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Payload à soumettre
          const payload = {
            encaissementId,
            statutValidation: EStatutEncaissement.TRAITE,
          };

          dispatch(submitEncaissementValidation(payload))
            .unwrap()
            .then((response) => {
              swalWithBootstrapButtons.fire(
                "Validé",
                "Votre encaissement a été ramené avec succès.",
                "success"
              );
              dispatch(fetchDataReleve({ id: statutValidation.toString() }));
              setShowSettingModal(false);
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire(
                "Erreur",
                "Une erreur est survenue lors de la validation.",
                "error"
              );
              console.error("Erreur lors de la soumission :", error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Vous avez annulé l'action.",
            "error"
          );
        }
      });
  };

  const showAlertRejete = async (encaissementId: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "btn btn-primary disabled:opacity-50 disabled:pointer-events-none",
        cancelButton: "btn btn-dark ltr:mr-3 rtl:ml-3",
        popup: "sweet-alerts",
      },
      buttonsStyling: false,
    });

    let userInput = ""; // Variable pour stocker l'observation saisie

    await swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr de rejeter cet encaissement ?",
        text: "Cette action mettra l'encaissement dans les encaissements rejetés.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        reverseButtons: true,
        html: `
          <div>
            <textarea
              id="reason-textarea"
              class="form-control w-full border rounded-md p-2 mt-4"
              rows="4"
              placeholder="Veuillez indiquer la raison ici..."
              style="width: 100%; box-sizing: border-box;"
            ></textarea>
          </div>
        `,
        preConfirm: () => {
          const textareaValue = (
            document.getElementById("reason-textarea") as HTMLTextAreaElement
          )?.value.trim();
          if (!textareaValue) {
            Swal.showValidationMessage("Le champ de texte est requis !");
            return false; // Empêche la confirmation tant que le champ est vide
          }
          userInput = textareaValue; // Stocke l'observation saisie
          return true;
        },
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          const textarea = document.getElementById(
            "reason-textarea"
          ) as HTMLTextAreaElement;

          // Désactive le bouton de confirmation initialement
          confirmButton?.setAttribute("disabled", "true");

          // Écoute les événements d'entrée pour activer/désactiver le bouton
          textarea?.addEventListener("input", () => {
            if (textarea.value.trim()) {
              confirmButton?.removeAttribute("disabled");
            } else {
              confirmButton?.setAttribute("disabled", "true");
            }
          });
        },
      })
      .then((result) => {
        if (result.isConfirmed && userInput) {
          // Payload à envoyer
          const payload = {
            encaissementId: selectedRow?.id, // ID de l'encaissement
            observationRejete: userInput, // Observation saisie dans le textarea
            statutValidation: EStatutEncaissement.REJETE, // Statut Rejeté
          };

          // Appel à la fonction Redux ou autre logique de soumission
          dispatch(submitEncaissementValidation(payload))
            .unwrap()
            .then((response) => {
              swalWithBootstrapButtons.fire(
                "Rejeté",
                `Votre encaissement est rejeté avec la raison : "${userInput}"`,
                "success"
              );

              dispatch(fetchDataReleve({ id: statutValidation.toString() }));
              setShowSettingModal(false);
            })

            .catch((error) => {
              swalWithBootstrapButtons.fire(
                "Erreur",
                "Une erreur est survenue lors de la soumission.",
                "error"
              );
              console.error("Erreur lors de la soumission :", error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Vous avez annulé l'action.",
            "error"
          );
        }
      });
  };

  const showAlertReclamation = async (encaissementId: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "btn btn-primary disabled:opacity-50 disabled:pointer-events-none",
        cancelButton: "btn btn-dark ltr:mr-3 rtl:ml-3",
        popup: "sweet-alerts",
      },
      buttonsStyling: false,
    });

    let userInput = ""; // Variable pour stocker l'observation saisie

    await swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr de mettre cet encaissement en reclamation ?",
        text: "Cette action mettra l'encaissement en reclamation.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        reverseButtons: true,
        html: `
          <div>
            <textarea
              id="reason-textarea"
              class="form-control w-full border rounded-md p-2 mt-4"
              rows="4"
              placeholder="Veuillez indiquer la raison ici..."
              style="width: 100%; box-sizing: border-box;"
            ></textarea>
          </div>
        `,
        preConfirm: () => {
          const textareaValue = (
            document.getElementById("reason-textarea") as HTMLTextAreaElement
          )?.value.trim();
          if (!textareaValue) {
            Swal.showValidationMessage("Le champ de texte est requis !");
            return false; // Empêche la confirmation tant que le champ est vide
          }
          userInput = textareaValue; // Stocke l'observation saisie
          return true;
        },
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          const textarea = document.getElementById(
            "reason-textarea"
          ) as HTMLTextAreaElement;

          // Désactive le bouton de confirmation initialement
          confirmButton?.setAttribute("disabled", "true");

          // Écoute les événements d'entrée pour activer/désactiver le bouton
          textarea?.addEventListener("input", () => {
            if (textarea.value.trim()) {
              confirmButton?.removeAttribute("disabled");
            } else {
              confirmButton?.setAttribute("disabled", "true");
            }
          });
        },
      })
      .then((result) => {
        if (result.isConfirmed && userInput) {
          // Payload à envoyer
          const payload = {
            encaissementId: selectedRow?.id, // ID de l'encaissement
            observationReclamation: userInput, // Observation saisie dans le textarea
            statutValidation: EStatutEncaissement.RECLAMATION, // Statut Rejeté
          };
          console.log(payload);

          // Appel à la fonction Redux ou autre logique de soumission
          dispatch(submitEncaissementValidation(payload))
            .unwrap()
            .then((response) => {
              swalWithBootstrapButtons.fire(
                "Rejeté",
                `Votre encaissement est en reclamation avec la raison : "${userInput}"`,
                "success"
              );
              dispatch(fetchDataReleve({ id: statutValidation.toString() }));
              setShowSettingModal(false);
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire(
                "Erreur",
                "Une erreur est survenue lors de la soumission.",
                "error"
              );
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Vous avez annulé l'action.",
            "error"
          );
        }
      });
  };

  const showAlertCloture = async (encaissementId: number) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "btn btn-primary disabled:opacity-50 disabled:pointer-events-none",
        cancelButton: "btn btn-dark ltr:mr-3 rtl:ml-3",
        popup: "sweet-alerts",
      },
      buttonsStyling: false,
    });

    let userInput = ""; // Variable pour stocker l'observation saisie

    await swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr de vouloir clôturer ?",
        text: "Cette action clôturera l'encaissement.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        reverseButtons: true,
        padding: "2em",
        html: `
          <div>
            <textarea
              id="reason-textarea"
              class="form-control w-full border rounded-md p-2 mt-4"
              rows="4"
              placeholder="Veuillez indiquer une observation ici..."
              style="width: 100%; box-sizing: border-box;"
            ></textarea>
          </div>
        `,
        preConfirm: () => {
          const textareaValue = (
            document.getElementById("reason-textarea") as HTMLTextAreaElement
          )?.value.trim();
          if (!textareaValue) {
            Swal.showValidationMessage("Le champ de texte est requis !");
            return false;
          }
          userInput = textareaValue; // Stocke l'observation saisie
          return true;
        },
        didOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          const textarea = document.getElementById(
            "reason-textarea"
          ) as HTMLTextAreaElement;

          confirmButton?.setAttribute("disabled", "true");

          textarea?.addEventListener("input", () => {
            if (textarea.value.trim()) {
              confirmButton?.removeAttribute("disabled");
            } else {
              confirmButton?.setAttribute("disabled", "true");
            }
          });
        },
      })
      .then((result) => {
        if (result.isConfirmed && userInput) {
          // Payload à soumettre
          const payload = {
            encaissementId, // ID de l'encaissement
            observationReclamation: userInput, // Observation saisie
            statutValidation: EStatutEncaissement.CLOTURE, // Statut clôturé
          };

          // Appel à la fonction Redux ou autre logique de soumission
          dispatch(submitEncaissementValidation(payload))
            .unwrap()
            .then((response) => {
              swalWithBootstrapButtons.fire(
                "Clôturé",
                "Votre encaissement a été clôturé avec succès.",
                "success"
              );
              dispatch(fetchDataReleve({ id: statutValidation.toString() }));
              setShowSettingModal(false);
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire(
                "Erreur",
                "Une erreur est survenue lors de la clôture.",
                "error"
              );
              console.error("Erreur lors de la soumission :", error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Vous avez annulé l'action.",
            "error"
          );
        }
      });
  };

  const [params, setParams] = useState({
    description: "",
    displayDescription: "",
  });

  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
      e.preventDefault();
      if (emailInput.trim()) {
        addEmail(emailInput.trim());
        setEmailInput("");
      }
    }
  };

  const addEmail = (email: string) => {
    if (validateEmail(email) && !ccEmails.includes(email)) {
      setCcEmails((prevEmails) => [...prevEmails, email]);
      ToastSuccess.fire({
        text: "Email ajouté avec succès !",
      });
    } else {
      ToastError.fire({
        text: "Veuillez entrer un email valide et unique.",
      });
    }
  };

  const removeEmail = (index: number) => {
    setCcEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = () => {
    console.log("Email principal :", params.description);
    console.log("Emails CC :", ccEmails);
  };

  const [modal17, setModal17] = useState(false);
  const [modal22, setModal22] = useState(false);
  const items = ["carousel1.jpeg", "carousel2.jpeg", "carousel3.jpeg"];

  useEffect(() => {
    const allData = filterAndMapData(data, statutValidation);
    setRecordsData(allData);
  }, [data, statutValidation]);

  const selectedDRs = drData.filter((dr) => selectedDRIds.includes(dr.id));
  const selectedSecteurs = secteurData.filter((secteur) =>
    selectedSecteurIds.includes(secteur.id)
  );

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Encaissements");
    XLSX.writeFile(workbook, "encaissements.xlsx");
  };

  const handleExportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "encaissements.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const imgUrl = "/assets/images/logo.png";

    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      doc.addImage(img, "PNG", 10, 5, 30, 15);

      doc.text("Encaissements - Rapport détaillé", 50, 15);

      const visibleColumns = cols.filter(
        (col) => col.accessor !== "Actions" && !hideCols.includes(col.accessor)
      );

      const headers = [visibleColumns.map((col) => col.title)];

      const body = filteredData.map((row) =>
        visibleColumns.map((col) => {
          const accessor = col.accessor;

          if (row.hasOwnProperty(accessor)) {
            const value = row[accessor];
            return typeof value === "number"
              ? formatNumber(value)
              : value || "N/A";
          }

          if (accessor === "modeEtJournee") {
            return `${row.journeeCaisse || "N/A"} - ${
              row.modeReglement || "N/A"
            }`;
          }

          return "N/A";
        })
      );

      doc.autoTable({
        head: headers,
        body: body,
        startY: 25,
        theme: "grid",
        headStyles: { fillColor: [54, 162, 235], textColor: 255 },
        bodyStyles: { fontSize: 8 },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          overflow: "linebreak",
        },
        margin: { top: 20, left: 10, right: 10 },
      });

      doc.save("encaissements_complet.pdf");
    };

    img.onerror = () => {
      console.error("Erreur lors du chargement de l'image.");
    };
  };

  const handleSubmit = () => {
    if (!selectedRow) {
      console.warn("Aucune ligne sélectionnée pour validation.");
      return;
    }

    const payload = {
      encaissementId: selectedRow.id,
      observationCaisse: rasChecked1 ? "RAS" : observationCaisse,
      observationReleve: rasChecked2 ? "RAS" : observationBanque,
      ecartReleve:
        selectedRow["Montant bordereau (B)"] -
        selectedRow["Montant revelé (C)"],
      montantReleve: selectedRow["Montant revelé (C)"],
      statutValidation: EStatutEncaissement.TRAITE,
    };

    dispatch(submitEncaissementValidation(payload))
      .unwrap()
      .then((response) => {
        console.log("Validation réussie :", response);
        dispatch(fetchDataReleve({ id: statutValidation.toString() }));
        setShowSettingModal(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la validation :");
      });
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchDataReleve({ id: statutValidation.toString() }));
    } catch (error) {
      console.error("Erreur lors de l'actualisation :", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= paginate.totalPages) {
      setCurrentPage(page);

      // Appeler la fonction pour charger les données de la nouvelle page
      // Exemple : dispatch(fetchData(page));
    }
  };

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isConnectionWeak, setIsConnectionWeak] = useState(false);

  const checkConnectionQuality = () => {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection || {};
      const { downlink, effectiveType } = connection;

      if (downlink && downlink < 0.5) {
        setIsConnectionWeak(true);
        Swal.fire({
          title: "Connexion faible",
          text: "Votre connexion Internet est très lente. Cela pourrait affecter les performances.",
          icon: "warning",
          confirmButtonText: "OK",
          timer: 5000,
        });
      } else if (
        effectiveType &&
        (effectiveType === "2g" || effectiveType === "slow-2g")
      ) {
        setIsConnectionWeak(true);
        Swal.fire({
          title: "Connexion faible",
          text: "Vous êtes connecté avec un réseau 2G. La navigation pourrait être lente.",
          icon: "warning",
          confirmButtonText: "OK",
          timer: 5000,
        });
      } else {
        setIsConnectionWeak(false);
      }
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      checkConnectionQuality();
      Swal.close();
    };

    const handleOffline = () => {
      setIsOffline(true);
      Swal.fire({
        title: "Connexion perdue",
        text: "Votre connexion Internet est perdue.",
        icon: "error",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
        backdrop: true,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener("change", checkConnectionQuality);
    }

    if (!navigator.onLine) {
      handleOffline();
    } else {
      checkConnectionQuality();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if ("connection" in navigator) {
        const connection = (navigator as any).connection;
        connection.removeEventListener("change", checkConnectionQuality);
      }
    };
  }, []);

  return (
    <>
      {isOffline && (
        <div className="fixed left-0 top-0 w-full bg-red-600 py-2 text-center text-white">
          Vous êtes hors ligne. Veuillez vérifier votre connexion.
        </div>
      )}
      {isConnectionWeak && !isOffline && (
        <div className="fixed left-0 top-12 flex w-full bg-red-500 py-2 text-center  text-black">
          Votre connexion Internet est faible. Certaines fonctionnalités
          pourraient être affectées.
        </div>
      )}
      <div className=" mt-9">
        <div className="flex w-full">
          <h5 className="mb-8  flex w-full flex-wrap items-center gap-6 text-xl font-thin text-orange-400">
            {totalUnvalidatedRecords}
            {encaissementText}{" "}
            {getStatutLibelle(statutValidation, totalUnvalidatedRecords)}
          </h5>
        </div>

        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex w-full items-center justify-center gap-8  ltr:ml-auto rtl:mr-auto">
            <div className="mb-2 flex w-full flex-col gap-6  md:flex-row md:items-center">
              <Flatpickr
                options={{
                  mode: "range",
                  dateFormat: "d-m-Y",
                  locale: French,
                  defaultDate: dateRange,
                }}
                className="form-input  w-[270px]"
                onChange={(selectedDates: Date[]) => {
                  setDateRange(selectedDates);
                }}
              />

              <div className="dropdown w-2/12">
                <Dropdown
                  btnClassName="!flex w-full items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark "
                  button={
                    <>
                      <span className="ltr:mr-1 rtl:ml-1">Caisse</span>
                      <IconCaretDown className="absolute right-3 h-5" />
                    </>
                  }
                >
                  <ul className="!min-w-[140px]">
                    {caisse.map((col, i) => (
                      <li
                        key={i}
                        className="flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center px-4 py-1">
                          <label className="mb-0 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={true}
                              className="form-checkbox"
                              value={col.label}
                              onChange={(event) => {
                                showHideColumns(event.target.value);
                              }}
                            />
                            <span className="ltr:ml-2 rtl:mr-2">
                              {col.value}
                            </span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              </div>

              <div className="dropdown w-2/12">
                <Dropdown
                  btnClassName="!flex w-full items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                  button={
                    <>
                      <span className="ltr:mr-1 rtl:ml-1">
                        Mode de reglement
                      </span>
                      <IconCaretDown className="h-5bg-black-dark-light absolute right-3 " />
                    </>
                  }
                >
                  <ul className="!min-w-[140px]">
                    {modeReglement.map((col, i) => (
                      <li
                        key={i}
                        className="flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center px-4 py-1">
                          <label className="mb-0 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={true}
                              className="form-checkbox"
                              value={col.label}
                              onChange={(event) => {
                                showHideColumns(event.target.value);
                              }}
                            />
                            <span className="ltr:ml-2 rtl:mr-2">
                              {col.value}
                            </span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              </div>

              <div className="dropdown w-2/12">
                <Dropdown
                  btnClassName="!flex w-full items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                  button={
                    <>
                      <span className="ltr:mr-1 rtl:ml-1">Banque</span>
                      <IconCaretDown className="h-5bg-black-dark-light absolute right-3 " />
                    </>
                  }
                >
                  <ul className="!min-w-[140px]">
                    {banque.map((col, i) => (
                      <li
                        key={i}
                        className="flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center px-4 py-1">
                          <label className="mb-0 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={true}
                              className="form-checkbox"
                              value={col.label}
                              onChange={(event) => {
                                showHideColumns(event.target.value);
                              }}
                            />
                            <span className="ltr:ml-2 rtl:mr-2">
                              {col.value}
                            </span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              </div>

              <div className="dropdown w-2/12">
                {selectedDRIds.length > 0 && (
                  <Tippy
                    content={
                      <div>
                        {selectedDRs.map((dr) => (
                          <div key={dr.id} className="text-sm">
                            {dr.name}
                          </div>
                        ))}
                      </div>
                    }
                    placement="top"
                    arrow={true}
                    interactive={true}
                  >
                    <div className="absolute right-[-10px] top-[-12px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {selectedDRIds.length}
                    </div>
                  </Tippy>
                )}
                <Dropdown
                  btnClassName="!flex w-full items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                  button={
                    <>
                      <span className="ltr:mr-1 rtl:ml-1">
                        Direction Régionale
                      </span>
                      <IconCaretDown className="absolute right-3 justify-end" />
                    </>
                  }
                >
                  <ul className="max-h-[600px] !min-w-[140px] overflow-y-auto">
                    {drLoading ? (
                      <li className="flex items-center justify-center py-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-primary"></div>
                          <span>Chargement...</span>
                        </div>
                      </li>
                    ) : (
                      drData.map((dr) => (
                        <li key={dr.id} onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center px-4 py-1">
                            <label className="cursor-pointer">
                              <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={selectedDRIds.includes(dr.id)}
                                onChange={() => handleDRSelection(dr.id)}
                              />
                              <span className="ltr:ml-2 rtl:mr-2">
                                {dr.name}
                              </span>
                            </label>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </Dropdown>
              </div>

              <div className="dropdown w-2/12">
                {selectedSecteurIds.length > 0 && (
                  <Tippy
                    content={
                      <div>
                        {selectedSecteurs.map((secteur) => (
                          <div key={secteur.id} className="text-sm">
                            {secteur.name}
                          </div>
                        ))}
                      </div>
                    }
                    placement="top"
                    arrow={true}
                    interactive={true}
                  >
                    <div className="absolute right-[-10px] top-[-12px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {selectedSecteurIds.length}
                    </div>
                  </Tippy>
                )}
                <Dropdown
                  btnClassName="!flex w-full items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                  button={
                    <>
                      <span className="ltr:mr-1 rtl:ml-1">Secteurs</span>
                      <IconCaretDown className="absolute right-3 justify-end" />
                    </>
                  }
                >
                  <ul className="max-h-[600px] !min-w-[140px] overflow-y-auto">
                    {secteurLoading ? (
                      <li className="flex items-center justify-center py-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-primary"></div>
                          <span>Chargement...</span>
                        </div>
                      </li>
                    ) : selectedDRIds.length === 0 ? (
                      <li>
                        <div className="px-4 py-1 text-sm text-gray-500">
                          Sélectionnez une DR pour voir les secteurs
                        </div>
                      </li>
                    ) : (
                      secteurData
                        .filter((secteur) =>
                          selectedDRIds.includes(secteur.directionRegionaleId)
                        )
                        .map((secteur) => (
                          <li
                            key={secteur.id}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center px-4 py-1">
                              <label className="cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                  checked={selectedSecteurIds.includes(
                                    secteur.id
                                  )}
                                  onChange={() =>
                                    handleSecteurSelection(secteur.id)
                                  }
                                />
                                <span className="ltr:ml-2 rtl:mr-2">
                                  {secteur.name}
                                </span>
                              </label>
                            </div>
                          </li>
                        ))
                    )}
                  </ul>
                </Dropdown>
              </div>

              <div className="flex gap-2">
                <button type="button" className="btn btn-success w-full">
                  Filtrer
                </button>
                <button type="button" className="btn btn-primary w-full">
                  Reinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="panel datatables">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              {isRefreshing ? (
                <button
                  type="button"
                  className="btn btn-success flex items-center gap-2"
                  disabled
                >
                  <span className="h-4 w-4 animate-spin rounded-full border-t-2 border-solid border-white"></span>
                  Chargement en cours...
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success flex items-center gap-2"
                  onClick={handleRefresh}
                >
                  <IconRefresh /> Actualiser
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="mr-1"
                onClick={handleExportExcel}
                title="Export Excel"
              >
                <IconExcel />
              </button>
              <button
                type="button"
                className="text-white"
                onClick={handleExportCSV}
                title="Export CSV"
              >
                <Csv />
              </button>
              <button
                type="button"
                className="mr-7"
                onClick={handleExportPDF}
                title="Export Pdf"
              >
                <Pdf />
              </button>

              <div className="text-right">
                <input
                  type="text"
                  className="form-input w-[300px]"
                  placeholder="Recherche..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="dropdown w-[200px]">
                <Dropdown
                  btnClassName="!flex w-full items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                  button={
                    <>
                      <span className="ltr:mr-1 rtl:ml-1">Colonne</span>
                      <IconCaretDown className="absolute right-3 justify-end" />
                    </>
                  }
                >
                  <ul className="!min-w-[140px]">
                    {cols.map((col, i) => (
                      <li
                        key={i}
                        className="flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center px-4 py-1">
                          <label className="mb-0 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!hideCols.includes(col.accessor)}
                              className="form-checkbox"
                              value={col.accessor}
                              onChange={(event) => {
                                showHideColumns(event.target.value);
                              }}
                            />
                            <span className="ltr:ml-2 rtl:mr-2">
                              {col.title}
                            </span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              </div>
            </div>
          </div>

          <DataTable
            className="table-hover whitespace-nowrap"
            records={!loading && filteredData?.length > 0 ? filteredData : []}
            columns={cols?.map((col) => ({
              ...col,
              hidden: hideCols.includes(col.accessor),
            }))}
            highlightOnHover
            totalRecords={!loading ? filteredData.length : 0}
            recordsPerPage={pageSize}
            page={currentPage}
            onPageChange={handlePageChange}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            minHeight={200}
            paginationText={({ from, to, totalRecords }) =>
              `Affichage de ${from} à ${to} sur ${totalRecords} entrées`
            }
            noRecordsText={
              loading ? (
                <>
                  <span className="delay-800 mt-2 animate-pulse text-black">
                    {" "}
                    Chargement en cours
                  </span>
                  <div className="mt-2 flex items-center justify-center space-x-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-primary delay-200"></span>
                    <span className="delay-400 h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                    <span className="delay-600 h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                    <span className="delay-800 h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                  </div>
                </>
              ) : (
                "Aucune donnée disponible"
              )
            }
          />
        </div>
        {showSettingModal && selectedRow && (
          <div>
            {statutValidation === 0 ? (
              <div>
                <div
                  className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm`}
                  onClick={() => setShowSettingModal(false)}
                ></div>
                <nav
                  className={`fixed bottom-0 top-0 z-[51] w-full max-w-[600px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 dark:bg-black ${
                    showSettingModal
                      ? "ltr:right-0 rtl:left-0"
                      : "ltr:-right-[400px] rtl:-left-[400px]"
                  }`}
                >
                  <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
                    <div className="relative mt-6 pb-5 text-center">
                      <button
                        type="button"
                        className="absolute top-0 opacity-30 hover:opacity-100 dark:text-white ltr:right-0 rtl:left-0"
                        onClick={() => setShowSettingModal(false)}
                      >
                        <IconX className="h-8 w-8" />
                      </button>

                      <h1 className="mb-1 text-[20px] dark:text-white">
                        Formulaire d'édition
                      </h1>
                      <p className="text-white-dark">
                        Modifiez vos encaissements s'ils ne sont pas terminés.
                      </p>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        <p className="font-normal">
                          Journée du <span className="font-bold"> {today}</span>
                        </p>
                      </h5>
                      <p className="text-xs text-white-dark">
                        Détail des montants.
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div>
                          <p className="font-bold">
                            {formatNumber(selectedRow["Montant caisse (A)"])} F
                            CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Montant Caisses
                          </label>
                        </div>
                        <div className="font-bold">
                          <p>
                            {formatNumber(selectedRow["Montant bordereau (B)"])}{" "}
                            F CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Montant Bordereaux
                          </label>
                        </div>
                        <div>
                          <p
                            className={
                              selectedRow["Montant caisse (A)"] -
                                selectedRow["Montant bordereau (B)"] <
                              0
                                ? "text-danger"
                                : selectedRow["Montant caisse (A)"] -
                                    selectedRow["Montant bordereau (B)"] >
                                  0
                                ? "text-success"
                                : "font-bold"
                            }
                            style={{
                              color:
                                selectedRow["Montant caisse (A)"] -
                                  selectedRow["Montant bordereau (B)"] ===
                                0
                                  ? "black"
                                  : undefined,
                            }}
                          >
                            {formatNumber(
                              selectedRow["Montant caisse (A)"] -
                                selectedRow["Montant bordereau (B)"]
                            )}{" "}
                            F CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Ecart 1
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Observation
                      </h5>
                      <div className="flex items-center">
                        <p className="text-xs text-white-dark">
                          Observation sur l'écart entre les montants de la
                          caisse et du bordereau
                        </p>
                        <label className="mb-0 ml-[80px] inline-flex">
                          <input
                            type="checkbox"
                            className="peer form-checkbox text-[#ED6C03]"
                            checked={rasChecked1}
                            onChange={handleRasChecked1Change}
                          />
                          <span className="peer-checked:text-[#ED6C03]">
                            RAS
                          </span>
                        </label>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2"></div>
                      <div className="mt-8 px-4">
                        <textarea
                          id="notes1"
                          name="notes1"
                          className="form-textarea min-h-[130px]"
                          placeholder="Saisir votre observation ici"
                          disabled={rasChecked1}
                          value={observationCaisse}
                          onChange={(e) => setObservationCaisse(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      {/* <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Date
                      </h5>
                      <p className="text-xs text-white-dark">**********</p>
                      <div className="mt-3 flex gap-2">
                        <div>
                          <input
                            id="montant"
                            type="date"
                            name="montant"
                            className="form-input w-[480px]"
                            placeholder="Montant"
                            // value={selectedRow["Montant revelé"] || ""}
                            // onChange={(e) =>
                            //   handleAmountChange(e, "Montant revelé")
                            // }
                          />
                        </div>
                      </div>
                    </div> */}
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Montant Banque
                      </h5>
                      <p className="text-xs text-white-dark">
                        Saisir le montant provenant de la banque.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <div>
                          <input
                            id="montant"
                            type="text"
                            name="montant"
                            className="form-input w-[480px]"
                            placeholder="Montant"
                            value={selectedRow["Montant revelé (C)"] || ""}
                            onChange={(e) =>
                              handleAmountChange(e, "Montant revelé (C)")
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-[#ED6C03] bg-gray-300 p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Relevé du{" "}
                        <span className="font-bold">
                          {selectedRow["Date cloture"]}
                        </span>
                      </h5>
                      <p className="text-xs text-white-dark">
                        Le relevé banquaire à une date donnée.
                      </p>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div>
                          <p className="font-bold">
                            {formatNumber(selectedRow["Montant bordereau (B)"])}{" "}
                            F CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Montant Bordereaux
                          </label>
                        </div>
                        <div>
                          <p className="font-bold">{selectedRow.banque}</p>
                          <label className="font-normal text-white-dark">
                            Banque
                          </label>
                        </div>
                        <div className="font-bold">
                          <p>
                            {formatNumber(selectedRow["Montant revelé (C)"])} F
                            CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Montant Banque
                          </label>
                        </div>
                        <div>
                          <p
                            className={
                              selectedRow["Montant bordereau (B)"] -
                                selectedRow["Montant revelé (C)"] <
                              0
                                ? "text-danger"
                                : selectedRow["Montant bordereau (B)"] -
                                    selectedRow["Montant revelé (C)"] >
                                  0
                                ? "text-success"
                                : "font-bold"
                            }
                            style={{
                              color:
                                selectedRow["Montant bordereau (B)"] -
                                  selectedRow["Montant revelé (C)"] ===
                                0
                                  ? "black"
                                  : undefined,
                            }}
                          >
                            {formatNumber(
                              selectedRow["Montant bordereau (B)"] -
                                selectedRow["Montant revelé (C)"]
                            )}{" "}
                            F CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Ecart 2
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Observation
                      </h5>
                      <div className="flex items-center">
                        <p className="text-xs text-white-dark">
                          Observation sur l'écart entre les montants de la
                          caisse et de la banque
                        </p>
                        <label className="mb-0 ml-[80px] inline-flex">
                          <input
                            type="checkbox"
                            className="peer form-checkbox text-[#ED6C03]"
                            checked={rasChecked2}
                            onChange={handleRasChecked2Change}
                          />
                          <span className="peer-checked:text-[#ED6C03]">
                            RAS
                          </span>
                        </label>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2"></div>
                      <div className="mt-8 px-4">
                        <textarea
                          id="notes2"
                          name="notes2"
                          className="form-textarea min-h-[130px]"
                          placeholder="Saisir votre observation ici"
                          disabled={rasChecked2}
                          value={observationBanque}
                          onChange={(e) => setObservationBanque(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div
                      className="custom-file-container"
                      data-upload-id="mySecondImage"
                    >
                      <div className="label-container">
                        <label>Importer le coupon </label>
                        <button
                          type="button"
                          className="custom-file-container__image-clear"
                          title="Supprimer l'mage"
                          onClick={() => {
                            setImages2([]);
                          }}
                        >
                          ×
                        </button>
                      </div>
                      <label className="custom-file-container__custom-file"></label>
                      <input
                        type="file"
                        className="custom-file-container__custom-file__custom-file-input"
                        accept="image/*"
                      />
                      <input
                        type="hidden"
                        name="MAX_FILE_SIZE"
                        value="10485760"
                      />
                      <ImageUploading
                        multiple
                        value={images2}
                        onChange={onChange2}
                        maxNumber={maxNumber}
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          <div className="upload__image-wrapper ">
                            <button
                              className="custom-file-container__custom-file__custom-file-control flex gap-4"
                              onClick={onImageUpload}
                            >
                              <IconPaperclip className="h-5 w-5" />

                              <p>Cliquez ici pour importer vos coupons</p>
                            </button>
                            &nbsp;
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                              {imageList.map((image, index) => (
                                <div
                                  key={index}
                                  className="custom-file-container__image-preview relative"
                                  onClick={() => onImageRemove(index)}
                                >
                                  <IconX className="h-6 w-6 cursor-pointer" />
                                  <img
                                    src={image.dataURL}
                                    alt="img"
                                    className="!max-h-48 w-full rounded object-cover shadow"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </ImageUploading>
                      {images2.length === 0 ? (
                        <img
                          src="/assets/images/file-preview.svg"
                          className="m-auto w-[170px] max-w-md"
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="mb-4 mt-10">
                      <div className="flex flex-col gap-4">
                        <button
                          type="button"
                          className="btn btn-success h-[50px] w-full border-none bg-[#ED6C03] shadow-sm"
                          onClick={handleSubmit}
                        >
                          VALIDER
                        </button>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            ) : (
              <div>
                <div
                  className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                  onClick={() => setShowCustomizer(false)}
                ></div>
                <nav
                  className={`fixed bottom-0 top-0 z-[51] w-full max-w-[600px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 dark:bg-black ${
                    showSettingModal
                      ? "ltr:right-0 rtl:left-0"
                      : "ltr:-right-[400px] rtl:-left-[400px]"
                  }`}
                >
                  <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
                    <div className="relative mt-6 pb-5 text-center">
                      <button
                        type="button"
                        className="absolute top-0 opacity-30 hover:opacity-100 dark:text-white ltr:right-0 rtl:left-0"
                        onClick={() => setShowSettingModal(false)}
                      >
                        <IconX className="h-8 w-8" />
                      </button>

                      <h1 className="mb-1 text-[20px] dark:text-white">
                        Formulaire de visualisation
                      </h1>
                      <p className="text-white-dark">
                        Vous permet de voir vos encaissements terminés.
                      </p>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        <p className="font-normal">
                          Journée du <span className="font-bold"> {today}</span>
                        </p>
                      </h5>
                      <p className="text-xs text-white-dark">
                        Détail des montants.
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div>
                          <p className="font-bold">
                            {formatNumber(selectedRow["Montant caisse (A)"])} F
                            CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Montant Caisses
                          </label>
                        </div>
                        <div className="font-bold">
                          <p>
                            {formatNumber(selectedRow["Montant bordereau (B)"])}{" "}
                            F CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Montant Bordereaux
                          </label>
                        </div>
                        <div>
                          <p
                            className={
                              selectedRow["Montant caisse (A)"] -
                                selectedRow["Montant bordereau (B)"] <
                              0
                                ? "text-danger"
                                : selectedRow["Montant caisse (A)"] -
                                    selectedRow["Montant bordereau (B)"] >
                                  0
                                ? "text-success"
                                : "font-bold"
                            }
                            style={{
                              color:
                                selectedRow["Montant caisse (A)"] -
                                  selectedRow["Montant bordereau (B)"] ===
                                0
                                  ? "black"
                                  : undefined,
                            }}
                          >
                            {formatNumber(
                              selectedRow["Montant caisse (A)"] -
                                selectedRow["Montant bordereau (B)"]
                            )}{" "}
                            F CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Ecart (A-B)
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Observation
                      </h5>
                      <div className="flex items-center">
                        <p className="text-xs text-white-dark">
                          Observation sur l'écart entre les montants de la
                          caisse et du bordereau
                        </p>
                        <label className="mb-0 ml-[80px] inline-flex">
                          <input
                            type="checkbox"
                            className="peer form-checkbox text-[#ED6C03]"
                            checked={rasChecked1}
                            onChange={handleRasChecked1Change}
                            disabled={statutValidation !== 1}
                          />
                          <span className="peer-checked:text-[#ED6C03]">
                            RAS
                          </span>
                        </label>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2"></div>
                      <div className="mt-8 px-4">
                        <textarea
                          id="notes1"
                          name="notes1"
                          className="form-textarea min-h-[130px]"
                          placeholder="Saisir votre observation ici"
                          disabled={statutValidation !== 1 || rasChecked1}
                          value={observationCaisse}
                          onChange={(e) => setObservationCaisse(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-[#ED6C03] bg-gray-300 p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Relevé du{" "}
                        <span className="font-bold">
                          {selectedRow["Date cloture"]}
                        </span>
                      </h5>
                      <p className="text-xs text-white-dark">
                        Le relevé banquaire à une date donnée.
                      </p>

                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div>
                          <p className="font-bold">
                            {formatNumber(selectedRow["Montant bordereau (B)"])}{" "}
                            F CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Montant Bordereaux
                          </label>
                        </div>
                        <div>
                          <p className="font-bold">{selectedRow.banque}</p>
                          <label className="font-normal text-white-dark">
                            Banque
                          </label>
                        </div>
                        <div className="font-bold">
                          <p>
                            {formatNumber(selectedRow["Montant revelé (C)"])} F
                            CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Montant Banque
                          </label>
                        </div>
                        <div>
                          <p
                            className={
                              selectedRow["Montant bordereau (B)"] -
                                selectedRow["Montant revelé (C)"] <
                              0
                                ? "text-danger"
                                : selectedRow["Montant bordereau (B)"] -
                                    selectedRow["Montant revelé (C)"] >
                                  0
                                ? "text-success"
                                : "font-bold"
                            }
                            style={{
                              color:
                                selectedRow["Montant bordereau (B)"] -
                                  selectedRow["Montant revelé (C)"] ===
                                0
                                  ? "black"
                                  : undefined,
                            }}
                          >
                            {formatNumber(
                              selectedRow["Montant bordereau (B)"] -
                                selectedRow["Montant revelé (C)"]
                            )}{" "}
                            F CFA
                          </p>
                          <label className="font-normal text-white-dark">
                            Ecart (B-C)
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Montant Banque
                      </h5>
                      <p className="text-xs text-white-dark">
                        Saisir le montant provenant de la banque.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <div>
                          <input
                            id="montant"
                            type="text"
                            name="montant"
                            className="form-input w-[480px]"
                            placeholder="Montant"
                            value={selectedRow["Montant revelé (C)"] || ""}
                            onChange={(e) =>
                              handleAmountChange(e, "Montant revelé")
                            }
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                      <h5 className="mb-1 text-base leading-none dark:text-white">
                        Observation
                      </h5>
                      <div className="flex items-center">
                        <p className="text-xs text-white-dark">
                          Observation sur l'écart entre les montants de la
                          caisse et de la banque
                        </p>
                        <label className="mb-0 ml-[80px] inline-flex">
                          <input
                            type="checkbox"
                            className="peer form-checkbox text-[#ED6C03]"
                            checked={rasChecked2}
                            onChange={handleRasChecked2Change}
                            disabled={statutValidation !== 1}
                          />
                          <span className="peer-checked:text-[#ED6C03]">
                            RAS
                          </span>
                        </label>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2"></div>
                      <div className="mt-8 px-4">
                        <textarea
                          id="notes2"
                          name="notes2"
                          className="form-textarea min-h-[130px]"
                          placeholder="Saisir votre observation ici"
                          disabled={statutValidation !== 1 || rasChecked2}
                          value={observationBanque}
                          onChange={(e) => setObservationBanque(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flex gap-2">
                        {statutValidation === 3 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-danger w-full"
                              onClick={() =>
                                showAlertReclamation(selectedRow.id)
                              }
                            >
                              {"Passer en réclamation"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-success w-full"
                              onClick={() => showAlertCloture(selectedRow.id)}
                            >
                              {"Valider"}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setModal22(true);
                              }}
                              className="btn btn-primary w-full"
                            >
                              Preuve photo
                            </button>
                          </>
                        )}

                        {/* Si statutValidation = 2 */}
                        {statutValidation === 2 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-danger w-full"
                              onClick={() => showAlertRejete(selectedRow.id)}
                            >
                              {"Rejeté"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-success w-full"
                              onClick={() => showAlertValide(selectedRow.id)}
                            >
                              {"Valider"}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setModal22(true);
                              }}
                              className="btn btn-primary w-full"
                            >
                              Preuve photo
                            </button>
                          </>
                        )}
                        {statutValidation === 1 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-success w-full"
                              onClick={() => showAlertRamener(selectedRow.id)}
                            >
                              {"Ramener"}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setModal22(true);
                              }}
                              className="btn btn-primary w-full"
                            >
                              Preuve photo
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            )}
          </div>
        )}
        <Transition appear show={modal17} as={Fragment}>
          <Dialog
            as="div"
            open={modal17}
            className={"fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"}
            onClose={() => setModal17(false)}
          >
            <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
              <div className="flex min-h-screen items-start justify-center px-4">
                <Dialog.Panel className="panel my-8 w-[2200px] max-w-4xl overflow-hidden rounded-lg border-0 p-5 text-black dark:text-white-dark">
                  <div className="flex items-center justify-center p-5 text-base font-medium text-[#1f2937] dark:text-white-dark/70">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-white/10">
                      <IconMail className="h-7 w-7 bg-orange-100 text-orange-500" />
                    </span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      À (Email principal)
                    </label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="form-input mt-1 block w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      CC (Emails supplémentaires)
                    </label>
                    <div className="form-input mt-1  flex w-full flex-wrap items-center rounded-md border border-gray-300 bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-orange-500 sm:text-sm">
                      {ccEmails.map((email, index) => (
                        <div
                          key={index}
                          className="mb-1 mr-2 flex items-center rounded bg-orange-100 px-2 py-1 text-sm text-orange-800"
                        >
                          {email}
                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => removeEmail(index)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ajouter un email"
                        className="flex-grow bg-transparent outline-none"
                      />
                    </div>
                  </div>
                  {/* <div className="mb-4 h-fit">
                  <label className="block text-sm font-medium text-gray-700">
                    Contenu du message
                  </label>
                  <textarea
                    className="form-textarea mt-1 h-48 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    value={params.description || ""}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        description: e.target.value,
                        displayDescription: e.target.value,
                      })
                    }
                    placeholder="Saisissez votre message ici"
                  ></textarea>
                </div> */}

                  <div className="h-fit">
                    <ReactQuill
                      theme="snow"
                      value={params.description || ""}
                      defaultValue={params.description || ""}
                      onChange={(content, delta, source, editor) => {
                        params.description = content;
                        params.displayDescription = editor.getText();
                        setParams({
                          ...params,
                        });
                      }}
                      style={{ minHeight: "200px" }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setModal17(false)}
                      className="btn btn-outline-danger mr-2"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="btn btn-primary"
                    >
                      Envoyer
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </Transition>

        <Dialog
          as="div"
          open={modal22}
          onClose={() => {
            setModal22(false);
          }}
        >
          <div
            id="slider_modal"
            className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60"
          >
            <div className="flex min-h-screen items-start justify-center px-4">
              <Dialog.Panel className="animate__animated animate__fadeIn panel my-8 w-full max-w-xl overflow-hidden rounded-lg border-0 px-4 py-1">
                <div className="flex items-center justify-between py-5 text-lg font-semibold dark:text-white">
                  <span>Preuves photos</span>
                  <button
                    onClick={() => setModal22(false)}
                    type="button"
                    className="text-white-dark hover:text-dark"
                  >
                    <IconX />
                  </button>
                </div>
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Pagination]}
                  navigation={{
                    nextEl: ".swiper-button-next-ex1",
                    prevEl: ".swiper-button-prev-ex1",
                  }}
                  observer={true}
                  observeParents={true}
                  pagination={{ clickable: true }}
                  className="swiper mx-auto mb-5 max-w-3xl"
                  id="slider1"
                  parallax={true}
                >
                  <div className="swiper-wrapper">
                    {items.map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <img
                            src={`/assets/images/${item}`}
                            className="max-h-80 w-full object-cover"
                            alt="img"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    className="swiper-button-prev-ex1 absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1  text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:left-2 rtl:right-2"
                  >
                    <IconCaretDown className="h-5 w-5 rotate-90 rtl:-rotate-90" />
                  </button>
                  <button
                    type="button"
                    className="swiper-button-next-ex1 absolute top-1/2 z-[999] grid -translate-y-1/2 place-content-center rounded-full border border-primary p-1 text-primary transition hover:border-primary hover:bg-primary hover:text-white ltr:right-2 rtl:left-2"
                  >
                    <IconCaretDown className="h-5 w-5 -rotate-90 rtl:rotate-90" />
                  </button>
                  <div className="swiper-pagination"></div>
                </Swiper>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ComponentsDatatablesColumnChooser;
