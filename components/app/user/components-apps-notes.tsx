"use client";
import IconLayoutGrid from "@/components/icon/icon-layout-grid";
import IconListCheck from "@/components/icon/icon-list-check";
import IconSearch from "@/components/icon/icon-search";
import IconX from "@/components/icon/icon-x";
import IconPlus from "@/components/icon/icon-plus";
import Link from "next/link";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Select from "react-select"; // Sélecteurs multiples
import axios from "axios";
import IconUser from "@/components/icon/icon-user"; // Assuming you have an IconUser component for the grid view
import Swal from "sweetalert2";

const ComponentsAppsUsers = () => {
  const [addUserModal, setAddUserModal] = useState<any>(false);
  const [isDeleteUserModal, setIsDeleteUserModal] = useState<any>(false);
  const [value, setValue] = useState<any>("list");
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [availableDRs, setAvailableDRs] = useState<any[]>([]); // Directions Régionales disponibles
  const [availableSecteurs, setAvailableSecteurs] = useState<any[]>([]); // Secteurs disponibles
  const [availableProfiles, setAvailableProfiles] = useState<any[]>([]); // Profils dynamiques
  const [drSecteurs, setDrSecteurs] = useState<{ [key: string]: any[] }>({}); // Secteurs par DR

  const [defaultParams] = useState({
    id: null,
    name: "",
    prenom: "",
    email: "",
    number: "",
    matricule: "",
    profil: "",
    dr: [],
    secteur: [],
  });

  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );

  const [search, setSearch] = useState<any>("");
  const [usersList, setUsersList] = useState<any>([]);
  const [filteredItems, setFilteredItems] = useState<any>([]);

  // Récupération des utilisateurs, DR, Secteurs et Profils depuis l'API
  const fetchUsersAndData = async () => {
    try {
      const [usersResponse, dataResponse] = await Promise.all([
        axios.get("/api/getUsers"),
        axios.get("/api/data"), // API data.json pour DR, Secteurs et Profils
      ]);
      setUsersList(usersResponse.data);
      setFilteredItems(usersResponse.data);
      setDrSecteurs(dataResponse.data.dr_secteurs); // Stockage des secteurs par DR

      const drOptions = Object.keys(dataResponse.data.dr_secteurs).map(
        (dr) => ({
          value: dr,
          label: dr,
        })
      );
      setAvailableDRs(drOptions);

      const profileOptions = dataResponse.data.profils.map((profil: any) => ({
        value: profil.value,
        label: profil.label,
      }));
      setAvailableProfiles(profileOptions);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des utilisateurs ou données",
        error
      );
    }
  };

  const searchUsers = () => {
    let filtered = usersList.filter((user: any) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (selectedTag !== "all") {
      filtered = filtered.filter((user: any) => user.profil === selectedTag);
    }

    setFilteredItems(filtered);
  };

  useEffect(() => {
    fetchUsersAndData(); // Charger utilisateurs, DR, Secteurs, et Profils au montage
  }, []);

  useEffect(() => {
    searchUsers();
  }, [search, selectedTag]);

  // Filtrer les secteurs selon les DR sélectionnées
  const handleDRChange = (selectedDRs: any) => {
    const selectedDRValues = selectedDRs.map((dr: any) => dr.value);
    const secteursForSelectedDRs = selectedDRValues.flatMap(
      (dr: any) => drSecteurs[dr] || []
    );
    setAvailableSecteurs(secteursForSelectedDRs);
    setParams((prev: any) => ({
      ...prev,
      dr: selectedDRs,
      secteur: params.secteur.filter((secteur: any) =>
        secteursForSelectedDRs.some((s: any) => s.value === secteur.value)
      ),
    }));
  };

  const editUser = (user: any = null) => {
    const json = JSON.parse(JSON.stringify(defaultParams));
    setParams(json);
    if (user) {
      let json1 = JSON.parse(JSON.stringify(user));
      setParams(json1);

      // Précharger les secteurs selon les DR
      const secteursForSelectedDRs = user.dr.flatMap(
        (dr: any) => drSecteurs[dr.value] || []
      );
      setAvailableSecteurs(secteursForSelectedDRs);
    }
    setAddUserModal(true);
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

  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`/api/deleteUsers`, {
        params: { id: selectedUserToDelete?.id }, // Pass the ID as a query parameter
      });
      setFilteredItems(
        filteredItems.filter((u: any) => u.id !== selectedUserToDelete.id)
      );
      setIsDeleteUserModal(false); // Close the modal after deletion
      setSelectedUserToDelete(null); // Reset selected user
      showMessage("L'utilisateur a été supprimer avec succes");
    } catch (error) {
      showMessage("Erreur lors de la suppression de l'utilisateur");
    }
  };

  const changeValue = (e: any) => {
    const { value, id } = e.target;
    setParams({ ...params, [id]: value });
  };

  const updateUser = async () => {
    try {
      await axios.post("/api/updateUsers", params);
      setAddUserModal(false);
      fetchUsersAndData(); // Recharger après mise à jour
      showMessage("L'utilisateur a été modifier avec succes");
    } catch (error) {
      showMessage("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl">{filteredItems.length} Utilisateurs </h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="flex gap-3">
            <div>
              <Link href="/utilisateur/add" className="btn btn-primary gap-2">
                <IconPlus />
                Ajouter un utilisateur
              </Link>
            </div>
            <div>
              <button
                type="button"
                className={`btn btn-outline-primary p-2 ${value === "list" && "bg-primary text-white"
                  }`}
                onClick={() => setValue("list")}
              >
                <IconListCheck />
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`btn btn-outline-primary p-2 ${value === "grid" && "bg-primary text-white"
                  }`}
                onClick={() => setValue("grid")}
              >
                <IconLayoutGrid />
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher"
              className="peer form-input py-2 ltr:pr-11 rtl:pl-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]"
            >
              <IconSearch className="mx-auto" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setSelectedTag("all")}
          className={`btn ${selectedTag === "all" ? "btn-primary" : "btn-outline-primary"
            }`}
        >
          Tous
        </button>

        {/* Génération dynamique des filtres de profils */}
        {availableProfiles.map((profile) => (
          <button
            key={profile.value}
            onClick={() => setSelectedTag(profile.value)}
            className={`btn ${selectedTag === profile.value
                ? "btn-primary"
                : "btn-outline-primary"
              }`}
          >
            {profile.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {value === "list" && (
        <div className="panel mt-5 overflow-hidden border-0 p-0">
          <div className="table-responsive">
            <table className="table-striped table-hover">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Matricule</th>
                  <th>Profil</th>
                  <th>Direction Régionale</th>
                  <th>Secteur</th>
                  <th className="!text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((user: any) => {
                  return (
                    <tr key={user.email}>
                      <td>{user.name}</td>
                      <td>{user.prenom}</td>
                      <td>{user.email}</td>
                      <td>{user.number}</td>
                      <td>{user.matricule}</td>
                      <td>{user.profil}</td>
                      <td>
                        {user.dr.length > 0
                          ? user.dr.map((d: any) => d.label).join(", ")
                          : "Toutes les DR"}
                      </td>
                      <td>
                        {user.secteur.length > 0
                          ? user.secteur.map((s: any) => s.label).join(", ")
                          : "Tous les secteurs"}
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-4">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => editUser(user)}
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              setSelectedUserToDelete(user);
                              setIsDeleteUserModal(true);
                            }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation de suppression */}
      <Transition appear show={isDeleteUserModal} as={Fragment}>
        <Dialog
          as="div"
          open={isDeleteUserModal}
          onClose={() => setIsDeleteUserModal(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-[black]/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                  <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                    Supprimer l'utilisateur
                  </div>

                  <div className="p-5 text-center">
                    {/* Icone d'alerte rouge */}
                    <div className="mx-auto w-fit rounded-full bg-danger p-4 text-white ring-4 ring-danger/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    <p className="mb-5 mt-4 text-gray-600 dark:text-gray-300">
                      Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
                      <span className="font-bold">
                        {selectedUserToDelete?.name}{" "}
                        {selectedUserToDelete?.prenom}
                      </span>{" "}
                      ?
                    </p>

                    <div className="flex items-center justify-end gap-4">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => setIsDeleteUserModal(false)}
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={confirmDeleteUser}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Grid */}
      {value === "grid" && (
        <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredItems.map((user: any) => {
            return (
              <div
                className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]"
                key={user.email}
              >
                <div className="relative -mt-10 px-6 pb-24">
                  <div className="rounded-t-md bg-white/40 bg-[url('/assets/images/notification-bg.png')] bg-cover bg-center p-6 pb-0">
                    <br />
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success text-white">
                      <IconUser className="h-12 w-12" />
                    </div>
                  </div>
                  <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                    <div className="text-xl">{user.name}</div>
                    <div className="text-white-dark">
                      {user.prenom.split(" ")[0]} {/* Premier prénom */}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                    <div className="flex items-center">
                      <div className="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                      <div className="truncate text-white-dark">
                        {user.email}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-none ltr:mr-2 rtl:ml-2">
                        Téléphone :
                      </div>
                      <div className="text-white-dark">{user.number}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-none ltr:mr-2 rtl:ml-2">
                        Profil :
                      </div>
                      <div className="text-white-dark">{user.profil}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-none ltr:mr-2 rtl:ml-2">
                        Direction Régionale :
                      </div>
                      <div className="text-white-dark">
                        {user.dr.length > 0
                          ? user.dr.map((d: any) => d.label).join(", ")
                          : "Toutes les DR"}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-none ltr:mr-2 rtl:ml-2">
                        Secteur :
                      </div>
                      <div className="text-white-dark">
                        {user.secteur.length > 0
                          ? user.secteur.map((s: any) => s.label).join(", ")
                          : "Tous les secteurs"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                  <button
                    type="button"
                    className="btn btn-outline-primary w-1/2"
                    onClick={() => editUser(user)}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger w-1/2"
                    onClick={() => {
                      setSelectedUserToDelete(user);
                      setIsDeleteUserModal(true);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modale d'ajout ou modification d'utilisateur */}
      <Transition appear show={addUserModal} as={Fragment}>
        <Dialog
          as="div"
          open={addUserModal}
          onClose={() => setAddUserModal(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-[black]/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                  <button
                    type="button"
                    onClick={() => setAddUserModal(false)}
                    className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 dark:hover:text-gray-600 ltr:right-4 rtl:left-4"
                  >
                    <IconX />
                  </button>
                  <div className="bg-[#fbfbfb] py-3 text-lg font-medium dark:bg-[#121c2c] ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5">
                    Modifier l'utilisateur
                  </div>
                  <div className="p-5">
                    <form>
                      <div className="mb-5">
                        <label htmlFor="name">Nom</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Entrez le nom"
                          className="form-input"
                          value={params.name}
                          onChange={(e) => changeValue(e)}
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="prenom">Prénom</label>
                        <input
                          id="prenom"
                          type="text"
                          placeholder="Entrez le prénom"
                          className="form-input"
                          value={params.prenom}
                          onChange={(e) => changeValue(e)}
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Entrez l'email"
                          className="form-input"
                          value={params.email}
                          onChange={(e) => changeValue(e)}
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="number">Téléphone</label>
                        <input
                          id="number"
                          type="text"
                          placeholder="Entrez le numéro de téléphone"
                          className="form-input"
                          value={params.number}
                          onChange={(e) => changeValue(e)}
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="matricule">Matricule</label>
                        <input
                          id="matricule"
                          type="text"
                          placeholder="Entrez le matricule"
                          className="form-input"
                          value={params.matricule}
                          onChange={(e) => changeValue(e)}
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="profil">Profil</label>
                        <Select
                          id="profil"
                          value={availableProfiles.find(
                            (p) => p.value === params.profil
                          )}
                          options={availableProfiles}
                          onChange={(selectedProfile) =>
                            setParams({
                              ...params,
                              profil: selectedProfile.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="dr">Direction Régionale</label>
                        <Select
                          id="dr"
                          isMulti
                          value={params.dr}
                          options={availableDRs}
                          onChange={handleDRChange}
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="secteur">Secteurs</label>
                        <Select
                          id="secteur"
                          isMulti
                          value={params.secteur}
                          options={availableSecteurs}
                          onChange={(selectedSecteurs) =>
                            setParams({ ...params, secteur: selectedSecteurs })
                          }
                        />
                      </div>

                      <div className="mt-8 flex items-center justify-end">
                        <button
                          type="button"
                          className="btn btn-outline-danger gap-2"
                          onClick={() => setAddUserModal(false)}
                        >
                          Annuler
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary ltr:ml-4 rtl:mr-4"
                          onClick={updateUser}
                        >
                          Mettre à jour l'utilisateur
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ComponentsAppsUsers;
