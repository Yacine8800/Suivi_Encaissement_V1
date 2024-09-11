"use client";
import Dropdown from "@/components/dropdown";
import Iconcloture from "@/components/icon/icon-archive";
import IconArrowBackward from "@/components/icon/icon-arrow-backward";
import IconArrowForward from "@/components/icon/icon-arrow-forward";
import IconArrowLeft from "@/components/icon/icon-arrow-left";
import IconBook from "@/components/icon/icon-book";
import IconBookmark from "@/components/icon/icon-bookmark";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconChartSquare from "@/components/icon/icon-chart-square";
import IconDownload from "@/components/icon/icon-download";
import IconFile from "@/components/icon/icon-file";
import IconFolder from "@/components/icon/icon-folder";
import IconGallery from "@/components/icon/icon-gallery";
import IconHelpCircle from "@/components/icon/icon-help-circle";
import IconHorizontalDots from "@/components/icon/icon-horizontal-dots";
import IconInfoHexagon from "@/components/icon/icon-info-hexagon";
import IconMail from "@/components/icon/icon-mail";
import IconMenu from "@/components/icon/icon-menu";
import IconMessage2 from "@/components/icon/icon-message2";
import IconOpenBook from "@/components/icon/icon-open-book";
import IconPaperclip from "@/components/icon/icon-paperclip";
import IconPlus from "@/components/icon/icon-plus";
import IconPrinter from "@/components/icon/icon-printer";
import IconRefresh from "@/components/icon/icon-refresh";
import IconRestore from "@/components/icon/icon-restore";
import IconSearch from "@/components/icon/icon-search";
import IconSend from "@/components/icon/icon-send";
import IconSettings from "@/components/icon/icon-settings";
import IconStar from "@/components/icon/icon-star";
import IconTag from "@/components/icon/icon-tag";
import IconTrash from "@/components/icon/icon-trash";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import IconTxtFile from "@/components/icon/icon-txt-file";
import IconUser from "@/components/icon/icon-user";
import IconUserPlus from "@/components/icon/icon-user-plus";
import IconUsers from "@/components/icon/icon-users";
import IconVideo from "@/components/icon/icon-video";
import IconWheel from "@/components/icon/icon-wheel";
import IconZipFile from "@/components/icon/icon-zip-file";
import { IRootState } from "@/store";
import { Disclosure } from "@headlessui/react";
import Tippy from "@tippyjs/react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import PerfectScrollbar from "react-perfect-scrollbar";
import "tippy.js/dist/tippy.css";
import "react-quill/dist/quill.snow.css";

const ComponentsAppsMailbox = () => {
  const [mailList, setMailList] = useState([
    {
      id: 1,
      path: "profile-15.jpeg",
      firstName: "Laurie",
      lastName: "Fox",
      email: "laurieFox@mail.com",
      date: new Date(),
      time: "2:00 PM",
      title: "Promotion Page",
      displayDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.",
      type: "inbox",
      isImportant: false,
      isStar: true,
      group: "Termine",
      isUnread: false,
      attachments: [
        {
          name: "Confirm File.txt",
          size: "450KB",
          type: "file",
        },
        {
          name: "Important Docs.xml",
          size: "2.1MB",
          type: "file",
        },
      ],
      description: `
                              <p class="mail-content"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <div class="gallery text-center">
                                  <img alt="image-gallery" src="${"/assets/images/carousel3.jpeg"}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${"/assets/images/carousel2.jpeg"}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${"/assets/images/carousel1.jpeg"}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                              </div>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
    },
    {
      id: 2,
      path: "profile-14.jpeg",
      firstName: "Andy",
      lastName: "King",
      email: "kingAndy@mail.com",
      date: new Date(),
      time: "6:28 PM",
      title: "Hosting Payment Reminder",
      displayDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.",
      type: "inbox",
      isImportant: false,
      isStar: false,
      group: "",
      isUnread: false,
      description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
    },
    {
      id: 3,
      path: "",
      firstName: "Kristen",
      lastName: "Beck",
      email: "kirsten.beck@mail.com",
      date: new Date(),
      time: "11:09 AM",
      title: "Verification Link",
      displayDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.",
      type: "inbox",
      isImportant: false,
      isStar: false,
      group: "Termine",
      isUnread: true,
      description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
    },
    {
      id: 4,
      path: "profile-16.jpeg",
      firstName: "Christian",
      lastName: "",
      email: "christian@mail.com",
      date: "11/30/2021",
      time: "2:00 PM",
      title: "New Updates",
      displayDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.",
      type: "inbox",
      isImportant: false,
      isStar: false,
      group: "private",
      isUnread: false,
      attachments: [
        {
          name: "update.zip",
          size: "1.38MB",
          type: "zip",
        },
      ],
      description: `
                              <p class="mail-content"> Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. </p>
                              <p>Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              `,
    },
  ]);

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
  const [selectedTab, setSelectedTab] = useState("inbox");
  const [filteredMailList, setFilteredMailList] = useState<any>(
    mailList.filter((d) => d.type === "inbox")
  );
  const [ids, setIds] = useState<any>([]);
  const [searchText, setSearchText] = useState<any>("");
  const [selectedMail, setSelectedMail] = useState<any>(null);
  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );
  const [pagedMails, setPagedMails] = useState<any>([]);

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";

  const [pager] = useState<any>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    startIndex: 0,
    endIndex: 0,
  });

  useEffect(() => {
    searchMails();
  }, [selectedTab, searchText, mailList]);

  const refreshMails = () => {
    setSearchText("");
    searchMails(false);
  };

  const setcloture = () => {
    if (ids.length) {
      let items = filteredMailList.filter((d: any) => ids.includes(d.id));
      for (let item of items) {
        item.type = item.type === "cloture" ? "inbox" : "cloture";
      }
      if (selectedTab === "cloture") {
        showMessage(ids.length + " Mail has been removed from cloture.");
      } else {
        showMessage(ids.length + " Mail has been added to cloture.");
      }
      searchMails(false);
    }
  };

  const setinapproprie = () => {
    if (ids.length) {
      let items = filteredMailList.filter((d: any) => ids.includes(d.id));
      for (let item of items) {
        item.type = item.type === "inapproprie" ? "inbox" : "inapproprie";
      }
      if (selectedTab === "inapproprie") {
        showMessage(ids.length + " Mail has been removed from inapproprie.");
      } else {
        showMessage(ids.length + " Mail has been added to inapproprie.");
      }
      searchMails(false);
    }
  };

  const setGroup = (group: any) => {
    if (ids.length) {
      let items = mailList.filter((d: any) => ids.includes(d.id));
      for (let item of items) {
        item.group = group;
      }

      showMessage(
        ids.length + " Mail has been grouped as " + group.toUpperCase()
      );
      clearSelection();
      setTimeout(() => {
        searchMails(false);
      });
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
          searchMails(false);
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
          item.type = "inbox";
          showMessage(totalSelected + " Mail Restored.");
          searchMails(false);
        } else if (type === "delete") {
          setMailList(mailList.filter((d: any) => d.id != item.id));
          showMessage(totalSelected + " Mail Permanently Deleted.");
          searchMails(false);
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

  const setStar = (mailId: number) => {
    if (mailId) {
      let item = filteredMailList.find((d: any) => d.id === mailId);
      item.isStar = !item.isStar;
      setTimeout(() => {
        searchMails(false);
      });
    }
  };

  const setImportant = (mailId: number) => {
    if (mailId) {
      let item = filteredMailList.find((d: any) => d.id === mailId);
      item.isImportant = !item.isImportant;
      setTimeout(() => {
        searchMails(false);
      });
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

  const searchMails = (isResetPage = true) => {
    if (isResetPage) {
      pager.currentPage = 1;
    }

    let res;
    if (selectedTab === "important") {
      res = mailList.filter((d) => d.isImportant);
    } else if (selectedTab === "star") {
      res = mailList.filter((d) => d.isStar);
    } else if (selectedTab === "En cours" || selectedTab === "Transmis") {
      res = mailList.filter((d) => d.group === selectedTab);
    } else {
      res = mailList.filter((d) => d.type === selectedTab);
    }

    let filteredRes = res.filter(
      (d) =>
        (d.title && d.title.toLowerCase().includes(searchText)) ||
        (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
        (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
        (d.displayDescription &&
          d.displayDescription.toLowerCase().includes(searchText))
    );

    setFilteredMailList([
      ...res.filter(
        (d) =>
          (d.title && d.title.toLowerCase().includes(searchText)) ||
          (d.firstName && d.firstName.toLowerCase().includes(searchText)) ||
          (d.lastName && d.lastName.toLowerCase().includes(searchText)) ||
          (d.displayDescription &&
            d.displayDescription.toLowerCase().includes(searchText))
      ),
    ]);

    if (filteredRes.length) {
      pager.totalPages =
        pager.pageSize < 1 ? 1 : Math.ceil(filteredRes.length / pager.pageSize);
      if (pager.currentPage > pager.totalPages) {
        pager.currentPage = 1;
      }
      pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
      pager.endIndex = Math.min(
        pager.startIndex + pager.pageSize - 1,
        filteredRes.length - 1
      );
      setPagedMails([
        ...filteredRes.slice(pager.startIndex, pager.endIndex + 1),
      ]);
    } else {
      setPagedMails([]);
      pager.startIndex = -1;
      pager.endIndex = -1;
    }
    clearSelection();
  };

  const saveMail = (type: any, id: any) => {
    if (!params.to) {
      showMessage("To email address is required.", "error");
      return false;
    }
    if (!params.title) {
      showMessage("Title of email is required.", "error");
      return false;
    }

    let maxId = 0;
    if (!params.id) {
      maxId = mailList.length
        ? mailList.reduce(
            (max, character) => (character.id > max ? character.id : max),
            mailList[0].id
          )
        : 0;
    }
    let cDt = new Date();

    let obj: any = {
      id: maxId + 1,
      path: "",
      firstName: "",
      lastName: "",
      email: params.to,
      date: cDt.getMonth() + 1 + "/" + cDt.getDate() + "/" + cDt.getFullYear(),
      time: cDt.toLocaleTimeString(),
      title: params.title,
      displayDescription: params.displayDescription,
      type: "draft",
      isImportant: false,
      group: "",
      isUnread: false,
      description: params.description,
      attachments: null,
    };
    if (params.file && params.file.length) {
      obj.attachments = [];
      for (let file of params.file) {
        let flObj = {
          name: file.name,
          size: getFileSize(file.size),
          type: getFileType(file.type),
        };
        obj.attachments.push(flObj);
      }
    }
    if (type === "save" || type === "save_reply" || type === "save_forward") {
      //saved to draft
      obj.type = "draft";
      mailList.splice(0, 0, obj);
      searchMails();
      showMessage("Mail has been saved successfully to draft.");
    } else if (type === "send" || type === "reply" || type === "forward") {
      //saved to sent mail
      obj.type = "sent_mail";
      mailList.splice(0, 0, obj);
      searchMails();
      showMessage("Mail has been sent successfully.");
    }

    setSelectedMail(null);
    setIsEdit(false);
  };

  const getFileSize = (file_type: any) => {
    let type = "file";
    if (file_type.includes("image/")) {
      type = "image";
    } else if (file_type.includes("application/x-zip")) {
      type = "zip";
    }
    return type;
  };

  const getFileType = (total_bytes: number) => {
    let size = "";
    if (total_bytes < 1000000) {
      size = Math.floor(total_bytes / 1000) + "KB";
    } else {
      size = Math.floor(total_bytes / 1000000) + "MB";
    }
    return size;
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

  const handleCheckboxChange = (id: any) => {
    if (ids.includes(id)) {
      setIds((value: any) => value.filter((d: any) => d !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  const checkAllCheckbox = () => {
    if (filteredMailList.length && ids.length === filteredMailList.length) {
      return true;
    } else {
      return false;
    }
  };

  const closeMsgPopUp = () => {
    setIsEdit(false);
    setSelectedTab("inbox");
    searchMails();
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
                    !isEdit && selectedTab === "inbox"
                      ? "bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTab("inbox");
                    tabChanged("inbox");
                  }}
                >
                  <div className="flex items-center">
                    <IconMail className="h-5 w-5 shrink-0" />
                    <div className="ltr:ml-3 rtl:mr-3">Litiges</div>
                  </div>
                  <div className="whitespace-nowrap rounded-md bg-primary-light px-2 py-0.5 font-semibold dark:bg-[#060818]">
                    {mailList &&
                      mailList.filter((d) => d.type === "inbox").length}
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
                    <div className="ltr:ml-3 rtl:mr-3">Litiges Clos</div>
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
                        Litiges inappropriés
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
                        } else {
                          let checkedIds = filteredMailList.map((d: any) => {
                            return d.id;
                          });
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
                        placeholder="Rechercher un litige"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyUp={() => searchMails()}
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
                    className={`btn btn-outline-success flex ${
                      selectedTab === "En cours" ? "bg-success text-white" : ""
                    }`}
                    onClick={() => {
                      setSelectedTab("En cours");
                      tabChanged("En cours");
                    }}
                  >
                    <IconUsers className="ltr:mr-2 rtl:ml-2" />
                    En cours
                  </button>
                </div>

                <div className="mt-4 flex-1 md:flex-auto">
                  <div className="flex items-center justify-center md:justify-end">
                    <div className="ltr:mr-3 rtl:ml-3">
                      {pager.startIndex +
                        1 +
                        "-" +
                        (pager.endIndex + 1) +
                        " of " +
                        filteredMailList.length}
                    </div>
                    <button
                      type="button"
                      disabled={pager.currentPage === 1}
                      className="rounded-md bg-[#f4f4f4] p-1 enabled:hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3"
                      onClick={() => {
                        pager.currentPage--;
                        searchMails(false);
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
                        searchMails(false);
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
                                {/* <div className="ltr:mr-3 rtl:ml-3">
                                  <Tippy content="Star">
                                    <button
                                      type="button"
                                      className={`flex items-center enabled:hover:text-warning disabled:opacity-60 ${
                                        mail.isStar ? "text-warning" : ""
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setStar(mail.id);
                                      }}
                                      disabled={selectedTab === "trash"}
                                    >
                                      <IconStar
                                        className={
                                          mail.isStar ? "fill-warning" : ""
                                        }
                                      />
                                    </button>
                                  </Tippy>
                                </div> */}
                                {/* <div className="ltr:mr-3 rtl:ml-3">
                                  <Tippy content="Important">
                                    <button
                                      type="button"
                                      className={`flex rotate-90 items-center enabled:hover:text-primary disabled:opacity-60 ${
                                        mail.isImportant ? "text-primary" : ""
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setImportant(mail.id);
                                      }}
                                      disabled={selectedTab === "trash"}
                                    >
                                      <IconBookmark
                                        bookmark={false}
                                        className={`h-4.5 w-4.5 ${
                                          mail.isImportant && "fill-primary"
                                        }`}
                                      />
                                    </button>
                                  </Tippy>
                                </div> */}
                                <div
                                  className={`whitespace-nowrap font-semibold dark:text-gray-300 ${
                                    !mail.isUnread
                                      ? "text-gray-500 dark:text-gray-500"
                                      : ""
                                  }`}
                                >
                                  {mail.firstName
                                    ? mail.firstName + " " + mail.lastName
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
                                      "bg-primary") ||
                                    (mail.group === "Transmis" &&
                                      "bg-warning") ||
                                    (mail.group === "Termine" &&
                                      "bg-success") ||
                                    (mail.group === "private" && "bg-danger")
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
                    {selectedMail.path ? (
                      <img
                        src={`/assets/images/${selectedMail.path}`}
                        className="h-12 w-12 rounded-full object-cover"
                        alt="avatar"
                      />
                    ) : (
                      <div className="rounded-full border border-gray-300 p-3 dark:border-gray-800">
                        <IconUser className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 ltr:mr-2 rtl:ml-2">
                    <div className="flex items-center">
                      <div className="whitespace-nowrap text-lg ltr:mr-4 rtl:ml-4">
                        {selectedMail.firstName
                          ? selectedMail.firstName + " " + selectedMail.lastName
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
                                (selectedMail.group === "Termine" &&
                                  "bg-success") ||
                                (selectedMail.group === "private" &&
                                  "bg-danger")
                              }`}
                            ></div>
                          </Tippy>
                        </div>
                      )}
                      <div className="whitespace-nowrap text-white-dark">
                        1 days ago
                      </div>
                    </div>
                    <div className="flex items-center text-white-dark">
                      <div className="ltr:mr-1 rtl:ml-1">
                        {selectedMail.type === "sent_mail"
                          ? selectedMail.email
                          : "to me"}
                      </div>
                      <div className="dropdown">
                        <Dropdown
                          offset={[0, 5]}
                          placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                          btnClassName="hover:text-primary flex items-center"
                          button={<IconCaretDown className="h-5 w-5" />}
                        >
                          <ul className="sm:w-56">
                            <li>
                              <div className="flex items-center px-4 py-2">
                                <div className="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">
                                  From:
                                </div>
                                <div className="flex-1 truncate">
                                  {selectedMail.type === "sent_mail"
                                    ? "NOTARIAT@gmail.com"
                                    : selectedMail.email}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center px-4 py-2">
                                <div className="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">
                                  To:
                                </div>
                                <div className="flex-1 truncate">
                                  {selectedMail.type !== "sent_mail"
                                    ? "NOTARIAT@gmail.com"
                                    : selectedMail.email}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center px-4 py-2">
                                <div className="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">
                                  Date:
                                </div>
                                <div className="flex-1">
                                  {selectedMail.date + ", " + selectedMail.time}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="flex items-center px-4 py-2">
                                <div className="w-1/4 text-white-dark ltr:mr-2 rtl:ml-2">
                                  Subject:
                                </div>
                                <div className="flex-1">
                                  {selectedMail.title}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </Dropdown>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                      <Tippy content="Star">
                        <button
                          type="button"
                          className={`enabled:hover:text-warning disabled:opacity-60 ${
                            selectedMail.isStar ? "text-warning" : ""
                          }`}
                          onClick={() => setStar(selectedMail.id)}
                          disabled={selectedTab === "trash"}
                        >
                          <IconStar
                            className={
                              selectedMail.isStar ? "fill-warning" : ""
                            }
                          />
                        </button>
                      </Tippy>
                      <Tippy content="Important">
                        <button
                          type="button"
                          className={`enabled:hover:text-primary disabled:opacity-60 ${
                            selectedMail.isImportant ? "text-primary" : ""
                          }`}
                          onClick={() => setImportant(selectedMail.id)}
                          disabled={selectedTab === "trash"}
                        >
                          <IconBookmark
                            bookmark={false}
                            className={`h-4.5 w-4.5 rotate-90 ${
                              selectedMail.isImportant && "fill-primary"
                            }`}
                          />
                        </button>
                      </Tippy>
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
                <p className="mt-4">Best Regards,</p>
                <p>{selectedMail.firstName + " " + selectedMail.lastName}</p>

                {selectedMail.attachments && (
                  <div className="mt-8">
                    <div className="mb-4 text-base">Attachments</div>
                    <div className="h-px border-b border-white-light dark:border-[#1b2e4b]"></div>
                    <div className="mt-6 flex flex-wrap items-center">
                      {selectedMail.attachments.map(
                        (attachment: any, i: number) => {
                          return (
                            <button
                              key={i}
                              type="button"
                              className="group relative mb-4 flex items-center rounded-md border border-white-light px-4 py-2.5 transition-all duration-300 hover:border-primary hover:text-primary dark:border-[#1b2e4b] ltr:mr-4 rtl:ml-4"
                            >
                              {attachment.type === "image" && <IconGallery />}
                              {attachment.type === "folder" && <IconFolder />}
                              {attachment.type === "zip" && <IconZipFile />}
                              {attachment.type !== "zip" &&
                                attachment.type !== "image" &&
                                attachment.type !== "folder" && (
                                  <IconTxtFile className="h-5 w-5" />
                                )}

                              <div className="ltr:ml-3 rtl:mr-3">
                                <p className="text-xs font-semibold text-primary">
                                  {attachment.name}
                                </p>
                                <p className="text-[11px] text-gray-400 dark:text-gray-600">
                                  {attachment.size}
                                </p>
                              </div>
                              <div className="absolute top-0 z-[5] hidden h-full w-full rounded-md bg-dark-light/40 group-hover:block ltr:left-0 rtl:right-0"></div>
                              <div className="btn btn-primary absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full p-1 group-hover:block">
                                <IconDownload className="h-4.5 w-4.5" />
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
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
                    placeholder="Enter To"
                    defaultValue={params.to}
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
                    placeholder="Enter Cc"
                    defaultValue={params.cc}
                    onChange={(e) => changeValue(e)}
                  />
                </div>

                <div>
                  <input
                    id="title"
                    type="text"
                    className="form-input"
                    placeholder="Enter Subject"
                    defaultValue={params.title}
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
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success ltr:mr-3 rtl:ml-3"
                    onClick={() => saveMail("save", null)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => saveMail("send", params.id)}
                  >
                    Send
                  </button>
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
