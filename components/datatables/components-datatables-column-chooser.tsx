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
import { IRootState } from "@/store";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface RowData {
  id: number;
  "Date Encais": string;
  "Caisse mode": string;
  Banque: string;
  "Montant caisse": number;
  "Montant bordereau": number;
  "Date cloture": string;
  Bordereau: string;
  "Date revelé": string;
  "Montant revelé": number;
  validated: boolean;
  "Observation caisse"?: string;
  "Observation banque"?: string;
}

const rowData: RowData[] = [
  {
    id: 1,
    "Date Encais": "2024-07-20",
    "Caisse mode": "2 -1<br/>Espèces",
    Banque: "BNP Paribas",
    "Montant caisse": 25000000,
    "Montant bordereau": 2500000,
    "Date cloture": "2024-07-21",
    Bordereau: "12345",
    "Date revelé": "2024-07-22",
    "Montant revelé": 2500000,
    validated: false,
  },
  {
    id: 2,
    "Date Encais": "2024-07-21",
    "Caisse mode": "2 -1<br/>Carte",
    Banque: "Crédit Agricole",
    "Montant caisse": 180000,
    "Montant bordereau": 1800000,
    "Date cloture": "2024-07-22",
    Bordereau: "67890",
    "Date revelé": "2024-07-23",
    "Montant revelé": 1800000,
    validated: false,
  },
  {
    id: 3,
    "Date Encais": "2024-07-22",
    "Caisse mode": "2 -1<br/>Virement",
    Banque: "BNP Paribas",
    "Montant caisse": 30020000,
    "Montant bordereau": 3000000,
    "Date cloture": "2024-07-23",
    Bordereau: "54321",
    "Date revelé": "2024-07-24",
    "Montant revelé": 3000000,
    validated: false,
  },
  {
    id: 4,
    "Date Encais": "2024-07-23",
    "Caisse mode": "2 -1<br/>Espèces",
    Banque: "Société Générale",
    "Montant caisse": 2000000,
    "Montant bordereau": 200870000,
    "Date cloture": "2024-07-24",
    Bordereau: "11223",
    "Date revelé": "2024-07-25",
    "Montant revelé": 2000000,
    validated: false,
  },
  {
    id: 5,
    "Date Encais": "2024-07-24",
    "Caisse mode": "2 -1<br/>Chèque",
    Banque: "Crédit Agricole",
    "Montant caisse": 150004300,
    "Montant bordereau": 1500000,
    "Date cloture": "2024-07-25",
    Bordereau: "33445",
    "Date revelé": "2024-07-26",
    "Montant revelé": 1500000,
    validated: false,
  },
  {
    id: 6,
    "Date Encais": "2024-07-25",
    "Caisse mode": "2 -1<br/>Virement",
    Banque: "Société Générale",
    "Montant caisse": 3200000,
    "Montant bordereau": 3200000,
    "Date cloture": "2024-07-26",
    Bordereau: "99887",
    "Date revelé": "2024-07-27",
    "Montant revelé": 3200000,
    validated: false,
  },
  {
    id: 7,
    "Date Encais": "2024-07-26",
    "Caisse mode": "2 -1<br/>Carte",
    Banque: "BNP Paribas",
    "Montant caisse": 2100000,
    "Montant bordereau": 2100000,
    "Date cloture": "2024-07-27",
    Bordereau: "77665",
    "Date revelé": "2024-07-28",
    "Montant revelé": 2100000,
    validated: false,
  },
  {
    id: 8,
    "Date Encais": "2024-07-27",
    "Caisse mode": "2 -1<br/>Chèque",
    Banque: "Crédit Lyonnais",
    "Montant caisse": 1900000,
    "Montant bordereau": 19300000,
    "Date cloture": "2024-07-28",
    Bordereau: "55667",
    "Date revelé": "2024-07-29",
    "Montant revelé": 1900000,
    validated: false,
  },
  {
    id: 9,
    "Date Encais": "2024-07-28",
    "Caisse mode": "2 -1<br/>Espèces",
    Banque: "BNP Paribas",
    "Montant caisse": 22004000,
    "Montant bordereau": 2200000,
    "Date cloture": "2024-07-29",
    Bordereau: "44556",
    "Date revelé": "2024-07-30",
    "Montant revelé": 2200000,
    validated: false,
  },
  {
    id: 10,
    "Date Encais": "2024-07-29",
    "Caisse mode": "2 -1<br/>Carte",
    Banque: "Crédit Lyonnais",
    "Montant caisse": 2500000,
    "Montant bordereau": 2500000,
    "Date cloture": "2024-07-30",
    Bordereau: "66778",
    "Date revelé": "2024-07-31",
    "Montant revelé": 2500000,
    validated: false,
  },
];

const formatNumber = (num: number | undefined): string => {
  return num?.toLocaleString("fr-FR") || "";
};

const formatDate = (date: string): string => {
  if (date) {
    const dt = new Date(date);
    const month =
      dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
    const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    return day + "/" + month + "/" + dt.getFullYear();
  }
  return "";
};

const ComponentsDatatablesColumnChooser = () => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  const [showSettingModal, setShowSettingModal] = useState(false);
  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";

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
    totalUnvalidatedRecords > 1 ? "s" : ""
  }`;

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
    { accessor: "Date Encais", title: "Date Encais", sortable: true },
    {
      accessor: "Caisse mode",
      title: "Caisse mode",
      sortable: true,
      render: ({ "Caisse mode": caisseMode }: RowData) => (
        <div dangerouslySetInnerHTML={{ __html: caisseMode }} />
      ),
    },
    { accessor: "Banque", title: "Banque", sortable: true },
    {
      accessor: "Montant caisse",
      title: "Montant caisse",
      sortable: true,
      render: ({ "Montant caisse": montantCaisse }: RowData) =>
        `${formatNumber(montantCaisse)} F CFA`,
    },
    {
      accessor: "Montant bordereau",
      title: "Montant bordereau",
      sortable: true,
      render: ({ "Montant bordereau": montantBordereau }: RowData) =>
        `${formatNumber(montantBordereau)} F CFA`,
    },
    { accessor: "Date cloture", title: "Date cloture", sortable: true },
    { accessor: "Bordereau", title: "Bordereau", sortable: true },
    {
      accessor: "Ecart1",
      title: "Ecart 1",
      sortable: true,
      render: ({
        "Montant caisse": montantCaisse,
        "Montant bordereau": montantBordereau,
      }: RowData) => {
        const ecart1 = montantCaisse - montantBordereau;
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
    {
      accessor: "Ecart2",
      title: "Ecart 2",
      sortable: true,
      render: ({
        "Montant bordereau": montantBordereau,
        "Montant revelé": montantRevele,
      }: RowData) => {
        const ecart2 = montantBordereau - montantRevele;
        return (
          <div
            className={
              ecart2 < 0
                ? "text-danger"
                : ecart2 > 0
                ? "text-success"
                : "font-bold"
            }
            style={{ color: ecart2 === 0 ? "black" : undefined }}
          >
            {formatNumber(ecart2)} F CFA
          </div>
        );
      },
    },
    { accessor: "Date revelé", title: "Date revelé", sortable: true },
    {
      accessor: "Montant revelé",
      title: "Montant revelé",
      sortable: true,
      render: ({ "Montant revelé": montantRevele }: RowData) =>
        `${formatNumber(montantRevele)} F CFA`,
    },
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
          item["Montant caisse"].toString().includes(search.toLowerCase()) ||
          item["Montant bordereau"]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item["Date cloture"]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.Bordereau.toLowerCase().includes(search.toLowerCase()) ||
          item["Montant revelé"]
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

  return (
    <div className="panel mt-6">
      <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
        <h5 className="text-lg font-semibold dark:text-white-light">
          {totalUnvalidatedRecords}
          {encaissementText}
        </h5>
        <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="dropdown">
              <Dropdown
                placement={`${isRtl ? "bottom-end" : "bottom-start"}`}
                btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                button={
                  <>
                    <span className="ltr:mr-1 rtl:ml-1">Colonne</span>
                    <IconCaretDown className="h-5 w-[100px]" />
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
          <div className="text-right">
            <input
              type="text"
              className="form-input w-[400px]"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
                      {formatNumber(selectedRow["Montant caisse"])} F CFA
                    </p>
                    <label className="font-normal text-white-dark">
                      Montant Caisses
                    </label>
                  </div>
                  <div className="font-bold">
                    <p>
                      {formatNumber(selectedRow["Montant bordereau"])} F CFA
                    </p>
                    <label className="font-normal text-white-dark">
                      Montant Bordereaux
                    </label>
                  </div>
                  <div>
                    <p
                      className={
                        selectedRow["Montant caisse"] -
                          selectedRow["Montant bordereau"] <
                        0
                          ? "text-danger"
                          : selectedRow["Montant caisse"] -
                              selectedRow["Montant bordereau"] >
                            0
                          ? "text-success"
                          : "font-bold"
                      }
                      style={{
                        color:
                          selectedRow["Montant caisse"] -
                            selectedRow["Montant bordereau"] ===
                          0
                            ? "black"
                            : undefined,
                      }}
                    >
                      {formatNumber(
                        selectedRow["Montant caisse"] -
                          selectedRow["Montant bordereau"]
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
                      value={selectedRow["Montant revelé"] || ""}
                      onChange={(e) => handleAmountChange(e, "Montant revelé")}
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
                      {formatNumber(selectedRow["Montant bordereau"])} F CFA
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
                    <p>{formatNumber(selectedRow["Montant revelé"])} F CFA</p>
                    <label className="font-normal text-white-dark">
                      Montant Banque
                    </label>
                  </div>
                  <div>
                    <p
                      className={
                        selectedRow["Montant bordereau"] -
                          selectedRow["Montant revelé"] <
                        0
                          ? "text-danger"
                          : selectedRow["Montant bordereau"] -
                              selectedRow["Montant revelé"] >
                            0
                          ? "text-success"
                          : "font-bold"
                      }
                      style={{
                        color:
                          selectedRow["Montant bordereau"] -
                            selectedRow["Montant revelé"] ===
                          0
                            ? "black"
                            : undefined,
                      }}
                    >
                      {formatNumber(
                        selectedRow["Montant bordereau"] -
                          selectedRow["Montant revelé"]
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
              <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                <div
                  className="custom-file-container"
                  data-upload-id="mySecondImage"
                >
                  <div className="label-container">
                    <label>Ajouter le(s) coupon(s) </label>
                    <button
                      type="button"
                      className="custom-file-container__image-clear"
                      title="Supprimer le coupon"
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
                      <div className="upload__image-wrapper">
                        <button
                          className="custom-file-container__custom-file__custom-file-control"
                          onClick={onImageUpload}
                        >
                          Choisir les images...
                        </button>
                        &nbsp;
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {imageList.map((image, index) => (
                            <div
                              key={index}
                              className="custom-file-container__image-preview relative"
                            >
                              <button
                                type="button"
                                className="custom-file-container__image-clear"
                                title="Supprimer le coupon"
                                onClick={() => onImageRemove(index)}
                              >
                                ×
                              </button>

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
                      className="m-auto w-full max-w-md"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </div>
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
