"use client";
import Dropdown from "@/components/dropdown";
import Iconcloture from "@/components/icon/icon-archive";
import IconArrowBackward from "@/components/icon/icon-arrow-backward";
import IconArrowForward from "@/components/icon/icon-arrow-forward";
import IconArrowLeft from "@/components/icon/icon-arrow-left";
import IconBookmark from "@/components/icon/icon-bookmark";
import IconCaretDown from "@/components/icon/icon-caret-down";
import IconDownload from "@/components/icon/icon-download";
import IconFolder from "@/components/icon/icon-folder";
import IconGallery from "@/components/icon/icon-gallery";
import IconInfoHexagon from "@/components/icon/icon-info-hexagon";
import IconMail from "@/components/icon/icon-mail";
import IconMenu from "@/components/icon/icon-menu";
import IconPrinter from "@/components/icon/icon-printer";
import IconRefresh from "@/components/icon/icon-refresh";
import IconRestore from "@/components/icon/icon-restore";
import IconSearch from "@/components/icon/icon-search";
import IconStar from "@/components/icon/icon-star";
import IconTag from "@/components/icon/icon-tag";
import IconTrash from "@/components/icon/icon-trash";
import IconTxtFile from "@/components/icon/icon-txt-file";
import IconUser from "@/components/icon/icon-user";
import IconUsers from "@/components/icon/icon-users";
import IconZipFile from "@/components/icon/icon-zip-file";
import { IRootState } from "@/store";
import Tippy from "@tippyjs/react";
import React, { Fragment, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import PerfectScrollbar from "react-perfect-scrollbar";
import "tippy.js/dist/tippy.css";
import "react-quill/dist/quill.snow.css";
import DayCounter from "@/utils/Daycounter";
import { Dialog, Transition } from "@headlessui/react";

const ComponentsAppsMailbox = () => {
	const [mailList, setMailList] = useState([
		{
			id: 1,
			path: "profile-15.jpeg",
			titre: "Justificatif",
			caisse: "Caisse",
			nomCaisse: "Ano Raymond",
			email: "laurieFox@mail.com",
			date: new Date(),
			time: "27-07-2024",
			title: "234XXX...",
			displayDescription:
				"La justification de l'ecart entre le montant banque et le montant relevé n'est pas cohérent j'ai besoin de plus d'eclairssiement a ce sujet",
			type: "Message",
			isImportant: false,
			isStar: true,
			group: "En cours",
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
                              <p class="mail-content">Montant sur le relevé bancaire : 1 500 000 FCFA
                                Montant dans le système Saphir/Jade : 1 700 000 FCFA
                                Bordereau joint : Mentionne deux virements :
                                Virement 1 : 100 000 FCFA
                                Virement 2 : 100 000 FCFA
                                Écart :
                                Le système comptable affiche un montant supérieur de 200 000 FCFA (1 700 000 - 1 500 000 FCFA).
                                <br />

Justification de l'écart :
Dans ce cas, il apparaît que le système Saphir ou Jade a déjà comptabilisé deux virements, chacun de 100 000 FCFA (mentionnés sur le bordereau), qui n'ont pas encore été pris en compte par la banque. Ces virements sont encore en attente de traitement par la banque et ne figurent donc pas encore sur le relevé bancaire.

Montant en banque : 1 500 000 FCFA
Montant dans Saphir/Jade (y compris les virements en attente) : 1 700 000 FCFA
Écart : 200 000 FCFA (qui correspond aux virements en attente)
<br />
L’écart de 200 000 FCFA s’explique par le fait que les virements figurant sur le bordereau n'ont pas encore été pris en compte sur le relevé bancaire. Ces virements sont enregistrés dans Saphir/Jade mais apparaîtront sur le relevé lors de leur traitement effectif par la banque.

 </p>
                              <div class="gallery text-center">
                                  <img alt="image-gallery" src="${"/assets/images/caisse1.jpeg"}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${"/assets/images/caisse1.jpeg"}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${"/assets/images/caisse1.jpeg"}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                                  <img alt="image-gallery" src="${"/assets/images/caisse1.jpeg"}" class="mb-4 mt-4" style="width: 250px; height: 180px;" />
                        
                              </div>
                              <p>L’écart de 200 000 FCFA entre le montant en banque et le montant relevé dans Saphir/Jade est dû à deux virements de 100 000 FCFA chacun, mentionnés dans le bordereau joint. Ces virements sont en cours de traitement par la banque et ne figurent pas encore sur le relevé bancaire. Une fois ces virements encaissés, l’écart sera résorbé.</p>
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
	const [selectedTab, setSelectedTab] = useState("Message");
	const [filteredMailList, setFilteredMailList] = useState<any>(
		mailList.filter((d) => d.type === "Message")
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
	// Popup qui s'affiche lorsqu'un élément est selectionner et qu'on click sur le
	const [modal2, setModal2] = useState(false);

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
				item.type = item.type === "cloture" ? "Message" : "cloture";
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
				item.type = item.type === "inapproprie" ? "Message" : "inapproprie";
			}
			if (selectedTab === "inapproprie") {
				showMessage(ids.length + " Mail has been removed from inapproprie.");
			} else {
				showMessage(ids.length + " Mail has been added to inapproprie.");
			}
			searchMails(false);
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
					item.type = "Message";
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
		} else if (
			selectedTab === "En cours" ||
			selectedTab === "Transmis" ||
			selectedTab === "Terminer"
		) {
			res = mailList.filter((d) => d.group === selectedTab);
		} else {
			res = mailList.filter((d) => d.type === selectedTab);
		}

		let filteredRes = res.filter(
			(d) =>
				(d.title && d.title.toLowerCase().includes(searchText)) ||
				(d.titre && d.titre.toLowerCase().includes(searchText)) ||
				(d.caisse && d.caisse.toLowerCase().includes(searchText)) ||
				(d.displayDescription &&
					d.displayDescription.toLowerCase().includes(searchText))
		);

		setFilteredMailList([
			...res.filter(
				(d) =>
					(d.title && d.title.toLowerCase().includes(searchText)) ||
					(d.titre && d.titre.toLowerCase().includes(searchText)) ||
					(d.caisse && d.caisse.toLowerCase().includes(searchText)) ||
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
			titre: "",
			caisse: "",
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
		};

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
		if (filteredMailList.length && ids.length === filteredMailList.length) {
			return true;
		} else {
			return false;
		}
	};

	const closeMsgPopUp = () => {
		setIsEdit(false);
		setSelectedTab("Message");
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
										<div className="ltr:ml-3 rtl:mr-3">Litiges</div>
									</div>
									<div className="whitespace-nowrap rounded-md bg-primary-light px-2 py-0.5 font-semibold dark:bg-[#060818]">
										{mailList &&
											mailList.filter((d) => d.type === "Message").length}
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
												placeholder="Rechercher un litige..."
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
																className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
															>
																<div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
																	<h5 className="text-lg font-bold">
																		<h4 className="text-base font-medium md:text-lg ltr:mr-2 rtl:ml-2">
																			{mailList[0].titre} {mailList[0].caisse}
																		</h4>
																	</h5>
																	{/* <button
																		type="button"
																		className="text-white-dark hover:text-dark"
																		onClick={() => setModal2(false)}
																	>
																		<svg>...</svg>
																	</button> */}
																</div>
																<div className="p-5">
																	<p>
																		{/* <div className="badge bg-info hover:top-0"> */}
																		{mailList[0].displayDescription}
																		{/* </div> */}
																	</p>
																	{/* <div className="mt-8 flex items-center justify-end">
																		<button
																			type="button"
																			className="btn btn-outline-danger"
																			onClick={() => setModal2(false)}
																		>
																			Discard
																		</button>
																		<button
																			type="button"
																			className="btn btn-primary ltr:ml-4 rtl:mr-4"
																			onClick={() => setModal2(false)}
																		>
																			Save
																		</button>
																	</div> */}
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
										<button
											type="button"
											onClick={() => setModal2(true)}
											className="btn btn-info right-5"
											disabled={!msgchecked}
										>
											Voir Plus +
										</button>
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
										onClick={() => saveMail("save", null)}
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
