import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import sortBy from "lodash/sortBy";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconPencil from "@/components/icon/icon-pencil";
import IconX from "../icon/icon-x";
import Dropdown from "@/components/dropdown";

import ImageUploading, { ImageListType } from "react-images-uploading";
import IconDownload from "../icon/icon-download";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { French } from "flatpickr/dist/l10n/fr.js";
import Link from "next/link";
import IconEdit from "../icon/icon-edit";
import IconPlus from "../icon/icon-plus";
import IconPrinter from "../icon/icon-printer";
import IconSend from "../icon/icon-send";
import IconExcel from "../icon/excel";
import IconPaperclip from "../icon/icon-paperclip";
import Csv from "../icon/csv";
import Pdf from "../icon/pdf";
import Select from "react-select";

interface RowData {
  id: number;
  "Date Encais": string;
  "Caisse mode": string;
  Banque: string;
  "Montant caisse (A)": number;
  "Montant bordereau (B)": number;
  "Date cloture": string;
  Bordereau: string;
  "Date revelé": string;
  "Montant revelé (C)": number;
  validated: boolean;
  "Observation caisse"?: string;
  "Observation banque"?: string;
  DR?: string;
  EXP?: string;
  Produit?: string;
  "Journee caisse"?: number;
  "Compte banque Jade"?: string;
}

const rowData: RowData[] = [
  {
    id: 1,
    "Date Encais": "2024-07-20",
    "Caisse mode": "2 -1<br/>Espèces",
    Banque: "SGBCI",
    "Montant caisse (A)": 25000000,
    "Montant bordereau (B)": 2500000,
    "Date cloture": "2024-07-21",
    Bordereau: "12345",
    "Date revelé": "2024-07-22",
    "Montant revelé (C)": 2500000,
    validated: false,
    DR: "DRAN",
    EXP: "021",
    Produit: "V2",
    "Journee caisse": 1,
    "Compte banque Jade": "21232XXX",
  },
  {
    id: 2,
    "Date Encais": "2024-07-21",
    "Caisse mode": "2 -1<br/>Carte",
    Banque: "NSIA",
    "Montant caisse (A)": 180000,
    "Montant bordereau (B)": 1800000,
    "Date cloture": "2024-07-22",
    Bordereau: "67890",
    "Date revelé": "2024-07-23",
    "Montant revelé (C)": 1800000,
    validated: false,
    DR: "DRABO",
    EXP: "022",
    Produit: "V3",
    "Journee caisse": 1,
    "Compte banque Jade": "21232XXX",
  },
  {
    id: 3,
    "Date Encais": "2024-07-22",
    "Caisse mode": "2 -1<br/>Virement",
    Banque: "SGBCI",
    "Montant caisse (A)": 30020000,
    "Montant bordereau (B)": 3000000,
    "Date cloture": "2024-07-23",
    Bordereau: "54321",
    "Date revelé": "2024-07-24",
    "Montant revelé (C)": 3000000,
    validated: false,
    DR: "DRYOP",
    EXP: "023",
    Produit: "SMART",
    "Journee caisse": 2,
    "Compte banque Jade": "21232AAA",
  },
  {
    id: 4,
    "Date Encais": "2024-07-23",
    "Caisse mode": "2 -1<br/>Espèces",
    Banque: "SIB",
    "Montant caisse (A)": 2000000,
    "Montant bordereau (B)": 200870000,
    "Date cloture": "2024-07-24",
    Bordereau: "11223",
    "Date revelé": "2024-07-25",
    "Montant revelé (C)": 2000000,
    validated: false,
    DR: "DRYOP1",
    EXP: "024",
    Produit: "SMART",
    "Journee caisse": 1,
    "Compte banque Jade": "21232XXX",
  },
  {
    id: 5,
    "Date Encais": "2024-07-24",
    "Caisse mode": "2 -1<br/>Chèque",
    Banque: "NSIA",
    "Montant caisse (A)": 150004300,
    "Montant bordereau (B)": 1500000,
    "Date cloture": "2024-07-25",
    Bordereau: "33445",
    "Date revelé": "2024-07-26",
    "Montant revelé (C)": 1500000,
    validated: false,
    DR: "DRAN2",
    EXP: "025",
    Produit: "V2",
    "Journee caisse": 3,
    "Compte banque Jade": "2123SSS",
  },
  {
    id: 6,
    "Date Encais": "2024-07-25",
    "Caisse mode": "2 -1<br/>Virement",
    Banque: "SIB",
    "Montant caisse (A)": 3200000,
    "Montant bordereau (B)": 3200000,
    "Date cloture": "2024-07-26",
    Bordereau: "99887",
    "Date revelé": "2024-07-27",
    "Montant revelé (C)": 3200000,
    validated: false,
    DR: "DRAS",
    EXP: "026",
    Produit: "V2",
    "Journee caisse": 2,
    "Compte banque Jade": "21232AAA",
  },
  {
    id: 7,
    "Date Encais": "2024-07-26",
    "Caisse mode": "2 -1<br/>Carte",
    Banque: "SGBCI",
    "Montant caisse (A)": 2100000,
    "Montant bordereau (B)": 2100000,
    "Date cloture": "2024-07-27",
    Bordereau: "77665",
    "Date revelé": "2024-07-28",
    "Montant revelé (C)": 2100000,
    validated: false,
    DR: "DRAS2",
    EXP: "027",
    Produit: "SMART",
    "Journee caisse": 7,
    "Compte banque Jade": "21232LLL",
  },
  {
    id: 8,
    "Date Encais": "2024-07-27",
    "Caisse mode": "2 -1<br/>Chèque",
    Banque: "ECOBANK",
    "Montant caisse (A)": 1900000,
    "Montant bordereau (B)": 19300000,
    "Date cloture": "2024-07-28",
    Bordereau: "55667",
    "Date revelé": "2024-07-29",
    "Montant revelé (C)": 1900000,
    validated: false,
    DR: "DRAN3",
    EXP: "028",
    Produit: "V3",
    "Journee caisse": 5,
    "Compte banque Jade": "21232RRR",
  },
  {
    id: 9,
    "Date Encais": "2024-07-28",
    "Caisse mode": "2 -1<br/>Espèces",
    Banque: "SGBCI",
    "Montant caisse (A)": 22004000,
    "Montant bordereau (B)": 2200000,
    "Date cloture": "2024-07-29",
    Bordereau: "44556",
    "Date revelé": "2024-07-30",
    "Montant revelé (C)": 2200000,
    validated: false,
    DR: "DRSE",
    EXP: "029",
    Produit: "SMART",
    "Journee caisse": 2,
    "Compte banque Jade": "21232GGG",
  },
  {
    id: 10,
    "Date Encais": "2024-07-29",
    "Caisse mode": "2 -1<br/>Carte",
    Banque: "ECOBANK",
    "Montant caisse (A)": 2500000,
    "Montant bordereau (B)": 2500000,
    "Date cloture": "2024-07-30",
    Bordereau: "66778",
    "Date revelé": "2024-07-31",
    "Montant revelé (C)": 2500000,
    validated: false,
    DR: "DRSE",
    EXP: "029",
    Produit: "V2",
    "Journee caisse": 1,
    "Compte banque Jade": "21232XXX",
  },
];

const formatNumber = (num: number | undefined): string => {
  return num?.toLocaleString("fr-FR") || "";
};

const ComponentsDatatablesColumnChooser = () => {
  const [showSettingModal, setShowSettingModal] = useState(false);

  const [initialLoad, setInitialLoad] = useState(true);
  const [savedRecords, setSavedRecords] = useState<RowData[]>([]);
  const [recordsData, setRecordsData] = useState<RowData[]>(rowData);

  const savedRecordsString =
    typeof window !== "undefined"
      ? localStorage.getItem("validatedRecords")
      : null;

  useEffect(() => {
    if (savedRecordsString) {
      const parsedSavedRecords: RowData[] = JSON.parse(savedRecordsString);
      setSavedRecords(parsedSavedRecords);
      if (parsedSavedRecords.length > 0) {
        setRecordsData(parsedSavedRecords);
      }
    }
  }, [savedRecordsString]);

  const unvalidatedRecords = recordsData.filter((record) => !record.validated);

  const totalUnvalidatedRecords = unvalidatedRecords.length;
  const encaissementText = ` Encaissement${
    totalUnvalidatedRecords > 1 ? "s " : " "
  } `;

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "Date Encais",
    direction: "asc",
  });

  const [hideCols, setHideCols] = useState<string[]>([]);
  const [rasChecked1, setRasChecked1] = useState(false);
  const [rasChecked2, setRasChecked2] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [observationCaisse, setObservationCaisse] = useState("");
  const [observationBanque, setObservationBanque] = useState("");

  const showHideColumns = (col: string) => {
    if (hideCols.includes(col)) {
      setHideCols((prev) => prev.filter((d) => d !== col));
    } else {
      setHideCols((prev) => [...prev, col]);
    }
  };

  const handleEdit = (row: RowData) => {
    setSelectedRow(row);
    setObservationCaisse(row["Observation caisse"] || "");
    setObservationBanque(row["Observation banque"] || "");
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
      ...(prev as RowData),
      [field]: isNaN(value) ? "" : value,
    }));
  };

  const handleValidate = () => {
    if (selectedRow) {
      const updatedRecords = recordsData.map((record) =>
        record.id === selectedRow.id
          ? { ...selectedRow, validated: true }
          : record
      );

      setRecordsData(updatedRecords);
      setSavedRecords(updatedRecords);
      localStorage.setItem("validatedRecords", JSON.stringify(updatedRecords));
      setShowSettingModal(false);
    }
  };

  const cols = [
    { accessor: "DR", title: "DR", sortable: true },
    {
      accessor: "EXP",
      title: "Code Exp",
      sortable: true,
    },
    { accessor: "Date Encais", title: "Date Encais", sortable: true },
    { accessor: "Journee caisse", title: "Journee caisse", sortable: true },

    { accessor: "Produit", title: "Produit", sortable: true },
    {
      accessor: "Montant caisse (A)",
      title: "Montant Restitution Caisse (A)",
      sortable: true,
      render: ({ "Montant caisse (A)": montantCaisse }: RowData) =>
        `${formatNumber(montantCaisse ?? 0)} F CFA`,
    },

    {
      accessor: "Caisse mode",
      title: "Mode reglement",
      sortable: true,
      render: ({ "Caisse mode": caisseMode }: RowData) => (
        <div dangerouslySetInnerHTML={{ __html: caisseMode }} />
      ),
    },
    { accessor: "Banque", title: "Banque", sortable: true },
    {
      accessor: "Compte banque Jade",
      title: "Compte banque Jade",
      sortable: true,
    },

    {
      accessor: "Montant bordereau (B)",
      title: "Montant bordereau banque (B)",
      sortable: true,
      render: ({ "Montant bordereau (B)": montantBordereau }: RowData) =>
        `${formatNumber(montantBordereau ?? 0)} F CFA`,
    },
    { accessor: "Date cloture", title: "Date cachet banque", sortable: true },
    { accessor: "Bordereau", title: "Numéro Bordereau", sortable: true },
    {
      accessor: "Ecart(A-B)",
      title: "Ecart (A-B)",
      sortable: true,
      render: ({
        "Montant caisse (A)": montantCaisse,
        "Montant bordereau (B)": montantBordereau,
      }: RowData) => {
        const ecart1 = (montantCaisse ?? 0) - (montantBordereau ?? 0);
        return (
          <div
            className={
              ecart1 < 0
                ? "text-danger"
                : ecart1 > 0
                ? "text-success"
                : "font-bold"
            }
            style={{ color: ecart1 === 0 ? "black" : undefined }}
          >
            {formatNumber(ecart1)} F CFA
          </div>
        );
      },
    },
    // {
    //   accessor: "Ecart(B-C)",
    //   title: "Ecart (B-C)",
    //   sortable: true,
    //   render: ({
    //     "Montant bordereau (B)": montantBordereau,
    //     "Montant revelé (C)": montantRevele,
    //   }: RowData) => {
    //     const ecart2 = (montantBordereau ?? 0) - (montantRevele ?? 0);
    //     return (
    //       <div
    //         className={
    //           ecart2 < 0
    //             ? "text-danger"
    //             : ecart2 > 0
    //             ? "text-success"
    //             : "font-bold"
    //         }
    //         style={{ color: ecart2 === 0 ? "black" : undefined }}
    //       >
    //         {formatNumber(ecart2)} F CFA
    //       </div>
    //     );
    //   },
    // },
    { accessor: "Date revelé", title: "Date opération relevé", sortable: true },
    // {
    //   accessor: "Montant revelé (C)",
    //   title: "Montant revelé (C)",
    //   sortable: true,
    //   render: ({ "Montant revelé (C)": montantRevele }: RowData) =>
    //     `${formatNumber(montantRevele ?? 0)} F CFA`,
    // },
    {
      accessor: "Actions",
      title: "Actions",
      sortable: false,
      render: (row: RowData) => (
        <Tippy content="Modifier">
          <button type="button" onClick={() => handleEdit(row)}>
            <IconPencil className="ltr:mr-2 rtl:ml-2" />
          </button>
        </Tippy>
      ),
    },
  ];

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData((prevData) => {
      const slicedData = prevData.slice(from, to);
      return initialLoad ? rowData : slicedData;
    });
    if (initialLoad) setInitialLoad(false);
  }, [page, pageSize, initialLoad]);

  useEffect(() => {
    if (search !== "") {
      const filteredRecords = rowData.filter((item) => {
        return (
          item["Date Encais"].toString().includes(search.toLowerCase()) ||
          item["Caisse mode"].toLowerCase().includes(search.toLowerCase()) ||
          item.Banque.toLowerCase().includes(search.toLowerCase()) ||
          item["Montant caisse (A)"]
            .toString()
            .includes(search.toLowerCase()) ||
          item["Montant bordereau (B)"]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item["Date cloture"]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.Bordereau.toLowerCase().includes(search.toLowerCase()) ||
          item["Montant revelé (C)"]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      });
      setRecordsData(filteredRecords);
    } else {
      setRecordsData(savedRecords.length > 0 ? savedRecords : rowData);
    }
  }, [search, savedRecords]);

  useEffect(() => {
    const data = sortBy(recordsData, sortStatus.columnAccessor);
    setRecordsData(sortStatus.direction === "desc" ? data.reverse() : data);
    setPage(1);
  }, [sortStatus]);

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

  const validatedRecordsExist = recordsData.some((record) => record.validated);

  const [images2, setImages2] = useState<any>([]);
  const maxNumber = 69;

  const onChange2 = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
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

  const [formattedRange, setFormattedRange] = useState<string>(
    `De ${formatDate(jour)} à ${formatDate(lendemain)}`
  );

  useEffect(() => {
    // Met à jour l'affichage formaté quand la plage de dates change
    if (dateRange.length === 2) {
      setFormattedRange(
        ` De ${formatDate(dateRange[0])} à ${formatDate(dateRange[1])}`
      );
    }
  }, [dateRange]);

  const DR = [
    { value: "DRAN", label: "DRAN" },
    { value: "DRAS", label: "DRAS" },
    { value: "DRABO", label: "DRABO" },
  ];
  const exploitation = [
    { value: "EXP 1", label: "EXP 1" },
    { value: "EXP 2", label: "EXP 2" },
    { value: "EXP 3", label: "EXP 3" },
  ];
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

  return (
    <div className=" mt-9">
      <div className="flex w-full">
        <h5 className="mb-8 ml-9 flex w-full flex-wrap items-center gap-6 text-xl font-bold text-orange-400">
          {totalUnvalidatedRecords}
          {encaissementText}{" "}
        </h5>

        <div className="mb-8 flex w-full flex-wrap items-center gap-2 ">
          <button type="button" className="btn btn-success w-2/12 gap-2">
            <IconExcel className="" />
            XLS
          </button>
          <button
            type="button"
            className="btn w-2/12 gap-2 bg-black text-white"
          >
            <Csv className="" />
            CSV
          </button>
          <button type="button" className="btn btn-danger w-2/12 gap-2">
            <Pdf className="" />
            PDF
          </button>

          <div className="h-full w-5/12  text-right">
            <input
              type="text"
              className="form-input h-full"
              placeholder="Recherche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
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
              className="form-input  w-[220px]"
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
                          <span className="ltr:ml-2 rtl:mr-2">{col.value}</span>
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
                          <span className="ltr:ml-2 rtl:mr-2">{col.value}</span>
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
                    <span className="ltr:mr-1 rtl:ml-1">Exploitation</span>
                    <IconCaretDown className="absolute right-3 justify-end " />
                  </>
                }
              >
                <ul className="!min-w-[140px]">
                  {exploitation.map((col, i) => (
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
                          <span className="ltr:ml-2 rtl:mr-2">{col.value}</span>
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
                      Direction régional
                    </span>
                    <IconCaretDown className="absolute right-3 justify-end " />
                  </>
                }
              >
                <ul className="!min-w-[140px]">
                  {DR.map((col, i) => (
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
                          <span className="ltr:ml-2 rtl:mr-2">{col.value}</span>
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
                    <span className="ltr:mr-1 rtl:ml-1">Colonne</span>
                    <IconCaretDown className="absolute right-3 justify-end " />
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
                          <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div className="datatables">
        <DataTable
          className="table-hover whitespace-nowrap"
          records={
            validatedRecordsExist
              ? recordsData.filter((record) => !record.validated)
              : recordsData
          }
          columns={cols.map((col) => ({
            ...col,
            hidden: hideCols.includes(col.accessor),
          }))}
          highlightOnHover
          totalRecords={recordsData.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={(p) => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Affichage de ${from} à ${to} sur ${totalRecords} entrées`
          }
          noRecordsText="Pas de donnée"
        />
      </div>
      {showSettingModal && selectedRow && (
        <div>
          <div
            className={`${
              showCustomizer && "!block"
            } fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`}
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
                <p className="text-xs text-white-dark">Détail des montants.</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div>
                    <p className="font-bold">
                      {formatNumber(selectedRow["Montant caisse (A)"])} F CFA
                    </p>
                    <label className="font-normal text-white-dark">
                      Montant Caisses
                    </label>
                  </div>
                  <div className="font-bold">
                    <p>
                      {formatNumber(selectedRow["Montant bordereau (B)"])} F CFA
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
                    Observation sur l'écart entre les montants de la caisse et
                    du bordereau
                  </p>
                  <label className="mb-0 ml-[80px] inline-flex">
                    <input
                      type="checkbox"
                      className="peer form-checkbox text-[#ED6C03]"
                      checked={rasChecked1}
                      onChange={handleRasChecked1Change}
                    />
                    <span className="peer-checked:text-[#ED6C03]">RAS</span>
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
                <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
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
                </div>
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
                      {formatNumber(selectedRow["Montant bordereau (B)"])} F CFA
                    </p>
                    <label className="font-normal text-white-dark">
                      Montant Bordereaux
                    </label>
                  </div>
                  <div>
                    <p className="font-bold">{selectedRow.Banque}</p>
                    <label className="font-normal text-white-dark">
                      Banque
                    </label>
                  </div>
                  <div className="font-bold">
                    <p>
                      {formatNumber(selectedRow["Montant revelé (C)"])} F CFA
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
                    Observation sur l'écart entre les montants de la caisse et
                    de la banque
                  </p>
                  <label className="mb-0 ml-[80px] inline-flex">
                    <input
                      type="checkbox"
                      className="peer form-checkbox text-[#ED6C03]"
                      checked={rasChecked2}
                      onChange={handleRasChecked2Change}
                    />
                    <span className="peer-checked:text-[#ED6C03]">RAS</span>
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
                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
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
                    onClick={handleValidate}
                  >
                    VALIDER
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ComponentsDatatablesColumnChooser;
