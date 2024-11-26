"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import IconPlus from "../icon/icon-plus";
import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "@/store";
import { fetchProfile } from "@/store/reducers/select/profile.slice";
import { deleteProfile } from "@/store/reducers/permission/delete-habilitation.slice";
import { Transition, Dialog } from "@headlessui/react";

const ComponentsDragndropSortable = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const [isDeleteProfileModal, setIsDeleteProfileModal] = useState(false);
  const [selectedProfileDelete, setSelectedProfileDelete] = useState<any>(null);

  const ProfilList: any = useSelector(
    (state: TRootState) => state.profile?.data
  );

  const [sortable1, setSortable1] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (ProfilList && Array.isArray(ProfilList)) {
      const formattedProfiles = ProfilList?.map((profile: any) => ({
        id: profile.id,
        text: profile.name,
        name: profile.description || "Pas de description",
      }));
      setSortable1(formattedProfiles);
    }
  }, [ProfilList]);

  const confirmDeleteUser = async (profile: any) => {
    try {
      await dispatch(deleteProfile(profile.id)).unwrap();
      setSortable1((prev) => prev.filter((item) => item.id !== profile.id));
      setIsDeleteProfileModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const openDeleteModal = (profile: any) => {
    setSelectedProfileDelete(profile);
    setIsDeleteProfileModal(true);
  };

  return (
    <div className="panel">
      <div className="mb-5 text-lg font-semibold">Rôle et Permission</div>
      <div className="flex gap-3">
        <div className="absolute right-0 -mt-[50px]">
          <Link href="/role/add" className="btn btn-primary -left-5 gap-2">
            <IconPlus />
            Ajouter un rôle
          </Link>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 px-4 sm:grid-cols-2">
        {" "}
        {/* Added px-4 for equal padding */}
        <ul id="example1" className="w-[1360px]">
          <ReactSortable
            list={sortable1}
            setList={setSortable1}
            animation={200}
            delay={2}
            ghostClass="gu-transit"
            group="shared"
          >
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
              {sortable1.map((item) => {
                return (
                  <li key={item.id} className="w-full cursor-grab">
                    <div className="flex w-full flex-col items-center justify-between rounded-md border border-white-light bg-white px-6 py-3.5 dark:border-dark dark:bg-[#1b2e4b] md:flex-row">
                      <div className="sm:mr-4">
                        <img
                          alt="avatar"
                          src={`/assets/images/profile-${item.id}.jpeg`}
                          className="mx-auto h-11 w-11 rounded-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-between md:flex-row">
                        <div className="my-3 font-semibold">
                          <div className="text-base text-dark dark:text-[#bfc9d4]">
                            {item.text}
                          </div>
                          <div className="text-xs text-white-dark">
                            {item.name}
                          </div>
                        </div>
                        <div className="ml-10 mt-4 flex gap-4">
                          <Link
                            href="/permission"
                            className="btn btn-success btn-sm px-5 py-2"
                          >
                            Modifier
                          </Link>
                          <Link
                            href=""
                            className="btn btn-primary btn-sm px-5 py-2"
                            onClick={() => openDeleteModal(item)}
                          >
                            Supprimer
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
          </ReactSortable>
        </ul>
      </div>

      <Transition appear show={isDeleteProfileModal} as={Fragment}>
        <Dialog
          as="div"
          open={isDeleteProfileModal}
          onClose={() => setIsDeleteProfileModal(false)}
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
                    Supprimer le profile
                  </div>

                  <div className="p-5 text-center">
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
                      Êtes-vous sûr de vouloir supprimer le profile{" "}
                      <span className="font-bold">
                        {selectedProfileDelete?.text} (
                        {selectedProfileDelete?.name})
                      </span>
                      ?
                    </p>

                    <div className="flex items-center justify-end gap-4">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => setIsDeleteProfileModal(false)}
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          selectedProfileDelete &&
                          confirmDeleteUser(selectedProfileDelete)
                        }
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
    </div>
  );
};

export default ComponentsDragndropSortable;
