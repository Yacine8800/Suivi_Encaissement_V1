"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const items1 = [
  {
    id: 6,
    text: "Comptable",
    name: "Agence",
  },
  {
    id: 7,
    text: "AGC",
    name: "Assistant Gestion Comptable",
  },
  {
    id: 8,
    text: "RC",
    name: "Responsable Commercial",
  },
  {
    id: 9,
    text: "DR",
    name: "Directeur Régional",
  },
  {
    id: 10,
    text: "DFC",
    name: "Direction Financière et Comptable",
  },
];

const ComponentsDragndropSortable = () => {
  const [sortable1, setSortable1] = useState(items1);

  return (
    <div className="panel">
      <div className="mb-5 text-lg font-semibold">Rôle et Permission</div>
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
    </div>
  );
};

export default ComponentsDragndropSortable;
