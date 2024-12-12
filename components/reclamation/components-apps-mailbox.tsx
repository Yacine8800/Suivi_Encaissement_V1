"use client";
import Iconcloture from "@/components/icon/icon-archive";
import IconArrowBackward from "@/components/icon/icon-arrow-backward";
import IconArrowForward from "@/components/icon/icon-arrow-forward";
import IconArrowLeft from "@/components/icon/icon-arrow-left";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconInfoHexagon from "@/components/icon/icon-info-hexagon";
import IconMail from "@/components/icon/icon-mail";
import IconMenu from "@/components/icon/icon-menu";
import IconPrinter from "@/components/icon/icon-printer";
import IconRefresh from "@/components/icon/icon-refresh";
import IconRestore from "@/components/icon/icon-restore";
import IconSearch from "@/components/icon/icon-search";
import IconTag from "@/components/icon/icon-tag";
import IconTrash from "@/components/icon/icon-trash";
import IconUser from "@/components/icon/icon-user";
import IconUsers from "@/components/icon/icon-users";
import { TAppDispatch, TRootState } from "@/store";
import Tippy from "@tippyjs/react";
import React, { Fragment, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PerfectScrollbar from "react-perfect-scrollbar";
import "tippy.js/dist/tippy.css";
import "react-quill/dist/quill.snow.css";
import DayCounter from "@/utils/Daycounter";
import { Dialog, Transition } from "@headlessui/react";
import { EncaissementTerminer } from "@/types/litigeVisualisation.types";
import DatatablesLitigesView from "../datatables/components-datatables-litiges-view";

import { fetchDataReleve } from "@/store/reducers/encaissements/relevé-slice";
import { EStatutEncaissement } from "@/utils/enums";

type DataReverse = Array<{
  id: string;
  caisse: string;
  numeroBordereau: string;
  validationEncaissement: {
    dateValidation: string;
    observationReclamation: string;
    montantReleve: number;
    ecartReleve: number;
    statutValidation: string;
  };
  directionRegionale: string;
  codeExpl: string;
  produit: string;
  montantRestitutionCaisse: number;
  modeReglement: string;
  banque: string;
  compteBanque: string;
  montantBordereauBanque: number;
  dateEncaissement: string;
  dateRemiseBanque: string;
}>;

const ComponentsAppsMailbox = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const dataReclamation: DataReverse = useSelector(
    (state: any) => state.encaissementReleve.data?.result
  );

  useEffect(() => {
    dispatch(
      fetchDataReleve({ id: EStatutEncaissement.RECLAMATION.toString() })
    );
  }, [dispatch]);

  const mailModal: EncaissementTerminer[] = [
    {
      detailsMontants: {
        montantCaisses: 25000000,
        montantBordereaux: 2500000,
        ecart1: 22500000,
        observationEcartCaisseBordereau: "RAS",
      },
      releveBancaire: {
        dateReleve: "2024-07-21",
        montantBordereaux: 2500000,
        nomBanque: "BNP Paribas",
        montantBanque: 2500000,
        ecart2: 0,
        observationEcartCaisseBanque: "", // Pas d'observation pour l'écart 2
      },
    },
  ];

  const transformDataToMailList = (dataReclamation: any | DataReverse) => {
    return dataReclamation?.map(
      (reclamation: {
        id: any;
        caisse: any;
        numeroBordereau: any;
        validationEncaissement: {
          dateValidation: any;
          observationReclamation: any;
          montantReleve: any;
          ecartReleve: any;
          statutValidation: any;
        };
        directionRegionale: any;
        codeExpl: any;
        produit: any;
        montantRestitutionCaisse: any;
        modeReglement: any;
        banque: any;
        compteBanque: any;
        montantBordereauBanque: any;
        dateEncaissement: any;
        dateRemiseBanque: any;
      }) => {
        const {
          id,
          caisse,
          numeroBordereau,
          validationEncaissement: {
            dateValidation,
            observationReclamation,
            montantReleve,
            ecartReleve,
          },
          directionRegionale,
          codeExpl,
          produit,
          montantRestitutionCaisse,
          modeReglement,
          banque,
          compteBanque,
          montantBordereauBanque,
          dateEncaissement,
          dateRemiseBanque,
        } = reclamation;

        const formattedDescription = `
          <p>
            L’opération a été enregistrée par la caisse <strong>${caisse}</strong> de la direction régionale 
            <strong>${directionRegionale}</strong>, pour le produit <strong>${produit}</strong> (code exploitation : 
            <strong>${codeExpl}</strong>). Le règlement a été effectué par <strong>${modeReglement}</strong> via la 
            banque <strong>${banque}</strong> avec le numero de compte (<strong>${compteBanque}</strong>). Le montant bordereau en banque est de 
            <strong>${montantBordereauBanque.toLocaleString()} FCFA</strong>, enregistré le 
            <strong>${new Date(
              dateEncaissement
            ).toLocaleDateString()}</strong> et remis à la banque le 
            <strong>${new Date(
              dateRemiseBanque
            ).toLocaleDateString()}</strong>. L'écart caisse-banque est de 
            <strong>${ecartReleve?.toLocaleString()} FCFA</strong>. La validation, réalisée le 
            <strong>${new Date(
              dateValidation
            ).toLocaleDateString()}</strong>. Le montant de restitution en caisse est de 
            <strong>${montantRestitutionCaisse.toLocaleString()} FCFA</strong>, et le montant relevé est de 
            <strong>${montantReleve?.toLocaleString()} FCFA</strong>. Observation : 
            <strong>${observationReclamation || "Aucune observation"}</strong>.
          </p>
        `;

        return {
          id,
          path: "profile-15.jpeg", // Peut être remplacé par une image réelle
          caisse: caisse,
          email: "example@mail.com", // Peut être remplacé par une adresse email réelle
          date: new Date(dateEncaissement), // Conversion de dateEncaissement
          time: new Date(dateValidation).toLocaleDateString(), // Format de dateValidation
          title: numeroBordereau,
          displayDescription: observationReclamation || "Pas d'observation",
          type: "Message",
          isImportant: false,
          isStar: true,
          group: "En cours", // Peut être adapté
          attachments: [
            {
              name: "Document.pdf",
              size: "2MB",
              type: "file",
            },
          ],
          description: formattedDescription,
        };
      }
    );
  };

  // Utilisation
  const [mailList, setMailList] = useState([]);

  useEffect(() => {
    if (dataReclamation) {
      const transformedData = transformDataToMailList(dataReclamation);
      setMailList(transformedData);
    }
  }, [dataReclamation]);

  const defaultParams = {
    id: null,
    from: "dstd@cie.ci",
    to: "",
    cc: "",
    title: "",
    file: null,
    description: "",
    displayDescription: "",
  };

  const [isShowMailMenu, setIsShowMailMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Message");
  const [filteredMailList, setFilteredMailList] = useState<any>(
    mailList?.filter((d: { type: string }) => d.type === "Message")
  );
  const [ids, setIds] = useState<any>([]);
  const [searchText, setSearchText] = useState<any>("");
  const [selectedMail, setSelectedMail] = useState<any>(null);
  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );
  const [pagedMails, setPagedMails] = useState<any>([]);

  const [pager] = useState<any>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    startIndex: 0,
    endIndex: 0,
  });
  // Popup qui s'affiche lorsqu'un élément est selectionner et qu'on click sur le
  const [modal2, setModal2] = useState(false);

  useEffect(() => {}, [selectedTab, searchText, mailList]);

  const refreshMails = () => {
    setSearchText("");
  };

  const setcloture = () => {
    if (ids.length) {
      let items = filteredMailList.filter((d: any) => ids.includes(d.id));
      for (let item of items) {
        item.type = item.type === "cloture" ? "Message" : "cloture";
      }
      if (selectedTab === "cloture") {
        showMessage(ids.length + " Mail has been removed from cloture.");
      } else {
        showMessage(ids.length + " Mail has been added to cloture.");
      }
    }
  };

  const setinapproprie = () => {
    if (ids.length) {
      let items = filteredMailList.filter((d: any) => ids.includes(d.id));
      for (let item of items) {
        item.type = item.type === "inapproprie" ? "Message" : "inapproprie";
      }
      if (selectedTab === "inapproprie") {
        showMessage(ids.length + " Mail has been removed from inapproprie.");
      } else {
        showMessage(ids.length + " Mail has been added to inapproprie.");
      }
    }
  };

  const setAction = (type: any) => {
    if (ids.length) {
      const totalSelected = ids.length;
      let items = filteredMailList.filter((d: any) => ids.includes(d.id));
      for (let item of items) {
        if (type === "trash") {
          item.type = "trash";
          item.group = "";
          item.isStar = false;
          item.isImportant = false;
          showMessage(totalSelected + " Mail has been deleted.");
        } else if (type === "read") {
          item.isUnread = false;
          showMessage(totalSelected + " Mail has been marked as Read.");
        } else if (type === "unread") {
          item.isUnread = true;
          showMessage(totalSelected + " Mail has been marked as UnRead.");
        } else if (type === "important") {
          item.isImportant = true;
          showMessage(totalSelected + " Mail has been marked as Important.");
        } else if (type === "unimportant") {
          item.isImportant = false;
          showMessage(totalSelected + " Mail has been marked as UnImportant.");
        } else if (type === "star") {
          item.isStar = true;
          showMessage(totalSelected + " Mail has been marked as Star.");
        }
        //restore & permanent delete
        else if (type === "restore") {
          item.type = "Message";
          showMessage(totalSelected + " Mail Restored.");
        } else if (type === "delete") {
          setMailList(mailList.filter((d: any) => d.id != item.id));
          showMessage(totalSelected + " Mail Permanently Deleted.");
        }
      }
      clearSelection();
    }
  };

  const selectMail = (item: any) => {
    if (item) {
      if (item.type !== "draft") {
        if (item && item.isUnread) {
          item.isUnread = false;
        }
        setSelectedMail(item);
      } else {
        openMail("draft", item);
      }
    } else {
      setSelectedMail("");
    }
  };

  const showTime = (item: any) => {
    const displayDt: any = new Date(item.date);
    const cDt: any = new Date();
    if (displayDt.toDateString() === cDt.toDateString()) {
      return item.time;
    } else {
      if (displayDt.getFullYear() === cDt.getFullYear()) {
        var monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return (
          monthNames[displayDt.getMonth()] +
          " " +
          String(displayDt.getDate()).padStart(2, "0")
        );
      } else {
        return (
          String(displayDt.getMonth() + 1).padStart(2, "0") +
          "/" +
          String(displayDt.getDate()).padStart(2, "0") +
          "/" +
          displayDt.getFullYear()
        );
      }
    }
  };

  const openMail = (type: string, item: any) => {
    if (type === "add") {
      setIsShowMailMenu(false);
      setParams(JSON.parse(JSON.stringify(defaultParams)));
    } else if (type === "draft") {
      let data = JSON.parse(JSON.stringify(item));
      setParams({
        ...data,
        from: defaultParams.from,
        to: data.email,
        displayDescription: data.email,
      });
    } else if (type === "reply") {
      let data = JSON.parse(JSON.stringify(item));
      setParams({
        ...data,
        from: defaultParams.from,
        to: data.email,
        title: "Re: " + data.title,
        displayDescription: "Re: " + data.title,
      });
    } else if (type === "forward") {
      let data = JSON.parse(JSON.stringify(item));
      setParams({
        ...data,
        from: defaultParams.from,
        to: data.email,
        title: "Fwd: " + data.title,
        displayDescription: "Fwd: " + data.title,
      });
    }
    setIsEdit(true);
  };

  const clearSelection = () => {
    setIds([]);
  };

  const tabChanged = (tabType: any) => {
    setIsEdit(false);
    setIsShowMailMenu(false);
    setSelectedMail(null);
  };

  const changeValue = (e: any) => {
    const { value, id } = e.target;
    setParams({ ...params, [id]: value });
  };

  const [msgchecked, setMsgChecked] = useState(false);

  const handleCheckboxChange = (id: any) => {
    if (ids.includes(id)) {
      setIds((value: any) => value.filter((d: any) => d !== id));
      setMsgChecked(false);
    } else {
      setIds([...ids, id]);
      setMsgChecked(true);
      console.log({ first: "1" });
    }
  };

  const checkAllCheckbox = () => {
    if (filteredMailList?.length && ids.length === filteredMailList.length) {
      return true;
    } else {
      return false;
    }
  };

  const closeMsgPopUp = () => {
    setIsEdit(false);
    setSelectedTab("Message");
  };

  const showMessage = (msg = "", type = "success") => {
    const toast: any = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: "toast" },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: "10px 20px",
    });
  };

  useEffect(() => {
    if (filteredMailList?.length) {
      const pagedData = filteredMailList.slice(
        pager.startIndex,
        pager.endIndex + 1
      );
      setPagedMails(pagedData);
    } else {
      setPagedMails([]);
    }
  }, [filteredMailList, pager]);

  useEffect(() => {
    if (dataReclamation && dataReclamation.length > 0) {
      const transformedData = transformDataToMailList(dataReclamation);
      setMailList(transformedData);
      setFilteredMailList(
        transformedData.filter((d: { type: string }) => d.type === "Message")
      );
    } else {
      setMailList([]);
      setFilteredMailList([]);
    }
  }, [dataReclamation]);

  return (
    <div>
      <div className="relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)]">
        <div
          className={`overlay absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${
            isShowMailMenu ? "!block xl:!hidden" : ""
          }`}
          onClick={() => setIsShowMailMenu(!isShowMailMenu)}
        ></div>
        <div
          className={`panel dark:gray-50 absolute z-10 hidden h-full w-[250px] max-w-full flex-none space-y-3 overflow-hidden p-4 xl:relative xl:block xl:h-auto ltr:rounded-r-none ltr:xl:rounded-r-md rtl:rounded-l-none rtl:xl:rounded-l-md ${
            isShowMailMenu ? "!block" : ""
          }`}
        >
          <div className="flex h-full flex-col pb-16">
            <PerfectScrollbar className="relative h-full grow ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5">
              <div className="space-y-1">
                <button
                  type="button"
                  className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                    !isEdit && selectedTab === "Message"
                      ? "bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTab("Message");
                    tabChanged("Message");
                  }}
                >
                  <div className="flex items-center">
                    <IconMail className="h-5 w-5 shrink-0" />
                    <div className="ltr:ml-3 rtl:mr-3">Réclamations</div>
                  </div>
                  <div className="whitespace-nowrap rounded-md bg-red-500 px-2 py-0.5 font-semibold text-white dark:bg-[#060818]">
                    {mailList &&
                      mailList.filter(
                        (d: { type: string }) => d.type === "Message"
                      ).length}
                  </div>
                </button>

                <li className="list-none">
                  <button
                    type="button"
                    className={`flex h-10 w-full items-center rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                      !isEdit && selectedTab === "cloture"
                        ? "bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedTab("cloture");
                      tabChanged("cloture");
                    }}
                  >
                    <Iconcloture className="shrink-0" />
                    <div className="ltr:ml-3 rtl:mr-3">Réclamations Clos</div>
                  </button>
                </li>
                <li className="list-none">
                  <button
                    type="button"
                    className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                      !isEdit && selectedTab === "inapproprie"
                        ? "bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedTab("inapproprie");
                      tabChanged("inapproprie");
                    }}
                  >
                    <div className="flex items-center">
                      <IconInfoHexagon className="shrink-0" />
                      <div className="ltr:ml-3 rtl:mr-3">
                        Réclamations inappropriés
                      </div>
                    </div>
                  </button>
                </li>
              </div>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="panel h-full flex-1 overflow-x-hidden p-0">
          {!selectedMail && !isEdit && (
            <div className="flex h-full flex-col">
              <div className="flex flex-wrap-reverse items-center justify-between gap-4 p-4">
                <div className="flex w-full items-center sm:w-auto">
                  <div className="ltr:mr-4 rtl:ml-4">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={checkAllCheckbox()}
                      value={ids}
                      onChange={() => {
                        if (ids.length === filteredMailList.length) {
                          setIds([]);
                          setMsgChecked(false);
                        } else {
                          let checkedIds = filteredMailList.map((d: any) => {
                            return d.id;
                          });
                          setMsgChecked(true);

                          setIds([...checkedIds]);
                        }
                      }}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </div>

                  <div className="ltr:mr-4 rtl:ml-4">
                    <Tippy content="Refresh">
                      <button
                        type="button"
                        className="flex items-center hover:text-primary"
                        onClick={() => refreshMails()}
                      >
                        <IconRefresh />
                      </button>
                    </Tippy>
                  </div>

                  {selectedTab !== "trash" && (
                    <ul className="flex grow items-center gap-4 sm:flex-none ltr:sm:mr-4 rtl:sm:ml-4">
                      <li>
                        <div>
                          <Tippy content="cloture">
                            <button
                              type="button"
                              className="flex items-center hover:text-primary"
                              onClick={setcloture}
                            >
                              <Iconcloture />
                            </button>
                          </Tippy>
                        </div>
                      </li>

                      <li>
                        <div>
                          <Tippy content="inapproprie">
                            <button
                              type="button"
                              className="flex items-center hover:text-primary"
                              onClick={setinapproprie}
                            >
                              <IconInfoHexagon />
                            </button>
                          </Tippy>
                        </div>
                      </li>
                    </ul>
                  )}

                  {selectedTab === "trash" && (
                    <ul className="flex flex-1 items-center gap-4 sm:flex-none ltr:sm:mr-3 rtl:sm:ml-4">
                      <li>
                        <div>
                          <Tippy content="Permanently Delete">
                            <button
                              type="button"
                              className="block hover:text-primary"
                              onClick={() => setAction("delete")}
                            >
                              <IconTrash />
                            </button>
                          </Tippy>
                        </div>
                      </li>
                      <li>
                        <div>
                          <Tippy content="Restore">
                            <button
                              type="button"
                              className="block hover:text-primary"
                              onClick={() => setAction("restore")}
                            >
                              <IconRestore />
                            </button>
                          </Tippy>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>

                <div className="flex w-full items-center justify-between sm:w-auto">
                  <div className="flex items-center ltr:mr-4 rtl:ml-4">
                    <button
                      type="button"
                      className="block hover:text-primary xl:hidden ltr:mr-3 rtl:ml-3"
                      onClick={() => setIsShowMailMenu(!isShowMailMenu)}
                    >
                      <IconMenu />
                    </button>
                    <div className="group relative">
                      <input
                        type="text"
                        className="peer form-input ltr:pr-8 rtl:pl-8"
                        placeholder="Rechercher une reclamation..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        // onKeyUp={() => searchMails()}
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                        <IconSearch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

              <div className="flex flex-col flex-wrap items-center justify-between px-4 pb-4 md:flex-row xl:w-auto">
                <div className="mt-4 grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-4">
                  <button
                    type="button"
                    className={`btn btn-outline-danger flex ${
                      selectedTab === "Transmis" ? "bg-danger text-white" : ""
                    }`}
                    onClick={() => {
                      setSelectedTab("Transmis");
                      tabChanged("Transmis");
                    }}
                  >
                    <IconTag className="ltr:mr-2 rtl:ml-2" />
                    Transmis
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-primary flex ${
                      selectedTab === "En cours" ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => {
                      setSelectedTab("En cours");
                      tabChanged("En cours");
                    }}
                  >
                    <IconUsers className="ltr:mr-2 rtl:ml-2" />
                    En cours
                  </button>
                  <button
                    type="button"
                    className={`btn btn-outline-success flex ${
                      selectedTab === "Terminer" ? "bg-success text-white" : ""
                    }`}
                    onClick={() => {
                      setSelectedTab("Terminer");
                      tabChanged("Terminer");
                    }}
                  >
                    <IconUsers className="ltr:mr-2 rtl:ml-2" />
                    Terminer
                  </button>
                </div>
                {/* ? ------------------------------------------------ */}
                <div className="">
                  <div className="flex-row justify-end "></div>
                  {msgchecked && filteredMailList && (
                    <Transition appear show={modal2} as={Fragment}>
                      <Dialog
                        as="div"
                        open={modal2}
                        onClose={() => setModal2(false)}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                          <div className="flex min-h-screen items-center justify-center px-4">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <Dialog.Panel
                                as="div"
                                className="panel my-8 w-full max-w-[900px] overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                              >
                                {/* <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
																	<h5 className="text-lg font-bold">
																		<h4 className="text-base font-medium md:text-lg ltr:mr-2 rtl:ml-2">
																			{mailList[0].titre} {mailList[0].caisse}
																		</h4>
																	</h5>
																</div> */}
                                <div className="p-5">
                                  {/* <p>
																		{mailList[0].displayDescription}
																	</p> */}
                                  {/* <PerfectScrollbar> */}
                                  <DatatablesLitigesView
                                    data={mailModal ? mailModal : []}
                                  />
                                  {/* </PerfectScrollbar> */}
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  )}
                </div>
                {/* ? ------------------------------------------------ */}

                <div className="mt-4 flex-1 md:flex-auto">
                  <div className="flex items-center justify-center md:justify-end">
                    <div className="ltr:mr-3 rtl:ml-3">
                      {pager.startIndex +
                        1 +
                        "-" +
                        (pager.endIndex + 1) +
                        " of " +
                        filteredMailList?.length}
                    </div>
                    <button
                      type="button"
                      disabled={pager.currentPage === 1}
                      className="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3"
                      onClick={() => {
                        pager.currentPage--;
                      }}
                    >
                      <IconCaretDown className="h-5 w-5 rotate-90 rtl:-rotate-90" />
                    </button>
                    <button
                      type="button"
                      disabled={pager.currentPage === pager.totalPages}
                      className="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30"
                      onClick={() => {
                        pager.currentPage++;
                      }}
                    >
                      <IconCaretDown className="h-5 w-5 -rotate-90 rtl:rotate-90" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>

              {pagedMails.length ? (
                <div className="table-responsive min-h-[400px] grow overflow-y-auto sm:min-h-[300px]">
                  <table className="table-hover">
                    <tbody>
                      {pagedMails.map((mail: any) => {
                        return (
                          <tr
                            key={mail.id}
                            className="cursor-pointer"
                            onClick={() => selectMail(mail)}
                          >
                            <td>
                              <div className="flex items-center whitespace-nowrap">
                                <div className="ltr:mr-3 rtl:ml-3">
                                  {ids.includes(mail.id)}
                                  <input
                                    type="checkbox"
                                    id={`chk-${mail.id}`}
                                    value={mail.id}
                                    checked={
                                      ids.length ? ids.includes(mail.id) : false
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(mail.id)
                                    }
                                    onClick={(event) => event.stopPropagation()}
                                    className="form-checkbox"
                                  />
                                </div>

                                <div
                                  className={`whitespace-nowrap font-semibold dark:text-gray-300 ${
                                    !mail.isUnread
                                      ? "text-gray-500 dark:text-gray-500"
                                      : ""
                                  }`}
                                >
                                  {mail.titre
                                    ? mail.titre + " " + mail.caisse
                                    : mail.email}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="line-clamp-1 min-w-[300px] overflow-hidden font-medium text-white-dark">
                                <span
                                  className={`${
                                    mail.isUnread
                                      ? "font-semibold text-gray-800 dark:text-gray-300"
                                      : ""
                                  }`}
                                >
                                  <span>{mail.title}</span> &minus;
                                  <span> {mail.displayDescription}</span>
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center">
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    (mail.group === "Transmis" &&
                                      "bg-danger") ||
                                    (mail.group === "Transmis" &&
                                      "bg-danger") ||
                                    (mail.group === "Termine" &&
                                      "bg-success") ||
                                    (mail.group === "En cours" && "bg-primary")
                                  }`}
                                ></div>
                                {/* {mail.attachments && (
                                  <div className="ltr:ml-4 rtl:mr-4">
                                    <IconPaperclip />
                                  </div>
                                )} */}
                              </div>
                            </td>
                            <td className="whitespace-nowrap font-medium ltr:text-right rtl:text-left">
                              {showTime(mail)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid h-full min-h-[300px] place-content-center text-lg font-semibold">
                  Pas de donnée
                </div>
              )}
            </div>
          )}

          {selectedMail && !isEdit && (
            <div>
              <div className="flex flex-wrap items-center justify-between p-4">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="hover:text-primary ltr:mr-2 rtl:ml-2"
                    onClick={() => setSelectedMail(null)}
                  >
                    <IconArrowLeft className="h-5 w-5 rotate-180" />
                  </button>
                  <h4 className="text-base font-medium md:text-lg ltr:mr-2 rtl:ml-2">
                    {selectedMail.title}
                  </h4>
                  <div className="badge bg-info hover:top-0">
                    {selectedMail.type}
                  </div>
                </div>
                <div>
                  <Tippy content="Print">
                    <button type="button">
                      <IconPrinter />
                    </button>
                  </Tippy>
                </div>
              </div>
              <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
              <div className="relative p-4">
                <div className="flex flex-wrap">
                  <div className="flex-shrink-0 ltr:mr-2 rtl:ml-2">
                    <div className="rounded-full border border-gray-300 p-3 dark:border-gray-800">
                      <IconUser className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1 ltr:mr-2 rtl:ml-2">
                    <div className="flex items-center">
                      <div className="whitespace-nowrap text-lg ltr:mr-4 rtl:ml-4">
                        {selectedMail.titre
                          ? selectedMail.titre + " " + selectedMail.caisse
                          : selectedMail.email}
                      </div>
                      {selectedMail.group && (
                        <div className="ltr:mr-4 rtl:ml-4">
                          <Tippy
                            content={selectedMail.group}
                            className="capitalize"
                          >
                            <div
                              className={`h-2 w-2 rounded-full ${
                                (selectedMail.group === "Transmis" &&
                                  "bg-primary") ||
                                (selectedMail.group === "Transmis" &&
                                  "bg-warning") ||
                                (selectedMail.group === "Terminer" &&
                                  "bg-success") ||
                                (selectedMail.group === "private" &&
                                  "bg-danger")
                              }`}
                            ></div>
                          </Tippy>
                        </div>
                      )}
                      <div className="whitespace-nowrap text-white-dark">
                        <DayCounter initialDays={0} />
                      </div>
                    </div>
                    <div className="flex items-center text-white-dark">
                      <div className="ltr:mr-1 rtl:ml-1">
                        {selectedMail.type === "sent_mail"
                          ? selectedMail.email
                          : selectedMail.nomCaisse}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                      <Tippy content="Reply">
                        <button
                          type="button"
                          className="hover:text-info"
                          onClick={() => openMail("reply", selectedMail)}
                        >
                          <IconArrowBackward className="rtl:hidden" />
                          <IconArrowForward className="ltr:hidden" />
                        </button>
                      </Tippy>
                      <Tippy content="Forward">
                        <button
                          type="button"
                          className="hover:text-info"
                          onClick={() => openMail("forward", selectedMail)}
                        >
                          <IconArrowBackward className="ltr:hidden" />
                          <IconArrowForward className="rtl:hidden" />
                        </button>
                      </Tippy>
                    </div>
                  </div>
                </div>

                <div
                  className="prose mt-8 max-w-full prose-p:text-sm prose-img:m-0 prose-img:inline-block dark:prose-p:text-white md:prose-p:text-sm"
                  dangerouslySetInnerHTML={{ __html: selectedMail.description }}
                ></div>
                <p className="mt-4">Cordialement...</p>
              </div>
            </div>
          )}

          {isEdit && (
            <div className="relative">
              <div className="flex items-center px-6 py-4">
                <button
                  type="button"
                  className="block hover:text-primary xl:hidden ltr:mr-3 rtl:ml-3"
                  onClick={() => setIsShowMailMenu(!isShowMailMenu)}
                >
                  <IconMenu />
                </button>
                <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  Message
                </h4>
              </div>
              <div className="h-px bg-gradient-to-l from-indigo-900/20 via-black to-indigo-900/20 opacity-[0.1] dark:via-white"></div>
              <form className="grid gap-6 p-6">
                <div>
                  <input
                    id="to"
                    type="text"
                    className="form-input"
                    placeholder="Entrer votre nom"
                    // defaultValue={params.to}
                    onChange={(e) => {
                      changeValue(e);
                    }}
                  />
                </div>

                <div>
                  <input
                    id="cc"
                    type="text"
                    className="form-input"
                    placeholder="Entrer votre numero de caisse"
                    // defaultValue={params.cc}
                    onChange={(e) => changeValue(e)}
                  />
                </div>

                <div>
                  <input
                    id="title"
                    type="text"
                    className="form-input"
                    placeholder="Entrer le numero de borderau"
                    // defaultValue={params.title}
                    onChange={(e) => changeValue(e)}
                  />
                </div>

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

                <div>
                  <input
                    type="file"
                    className="form-input p-0 file:border-0 file:bg-primary/90 file:px-4 file:py-2 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5 rtl:file:ml-5"
                    multiple
                    accept="image/*,.zip,.pdf,.xls,.xlsx,.txt.doc,.docx"
                    required
                  />
                </div>
                <div className="mt-8 flex items-center ltr:ml-auto rtl:mr-auto">
                  <button
                    type="button"
                    className="btn btn-outline-danger ltr:mr-3 rtl:ml-3"
                    onClick={closeMsgPopUp}
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ltr:mr-3 rtl:ml-3"
                  >
                    Enregistrer
                  </button>
                  {/* <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => saveMail("send", params.id)}
                  >
                    Send
                  </button> */}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentsAppsMailbox;
