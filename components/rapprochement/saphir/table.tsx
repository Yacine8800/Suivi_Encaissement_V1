import React, { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import IconSquareRotated from "@/components/icon/icon-square-rotated";

// Définition du type pour les données du tableau
interface MontantData {
  Libelle: string;
  Janvier: number;
  Février: number;
  Mars: number;
  Avril: number;
  Mai: number;
  Juin: number;
  Juillet: number;
  Août: number;
  Septembre: number;
  Octobre: number;
  Novembre: number;
  Décembre: number;
  Total?: number; // Ajout de la propriété Total
}

const rowData = [
  {
    id: 1,
    montantsaphirHT: {
      Libelle: "Montant Saphir HT",
      Janvier: 100,
      Février: 120,
      Mars: 90,
      Avril: 150,
      Mai: 130,
      Juin: 110,
      Juillet: 140,
      Août: 160,
      Septembre: 120,
      Octobre: 170,
      Novembre: 180,
      Décembre: 190,
    },
    montantsaphirBT: {
      Libelle: "Montant Saphir BT",
      Janvier: 110,
      Février: 130,
      Mars: 100,
      Avril: 160,
      Mai: 140,
      Juin: 120,
      Juillet: 150,
      Août: 170,
      Septembre: 130,
      Octobre: 180,
      Novembre: 190,
      Décembre: 200,
    },
    montantsaphirPrepaid: {
      Libelle: "Montant Saphir Prepaid",
      Janvier: 90,
      Février: 110,
      Mars: 80,
      Avril: 140,
      Mai: 120,
      Juin: 100,
      Juillet: 130,
      Août: 150,
      Septembre: 110,
      Octobre: 160,
      Novembre: 170,
      Décembre: 180,
    },
  },
];

const Table = () => {
  const [htData, setHtData] = useState<MontantData[]>([]);
  const [btData, setBtData] = useState<MontantData[]>([]);
  const [prepaidData, setPrepaidData] = useState<MontantData[]>([]);

  useEffect(() => {
    const htRecords = rowData.map((item) => item.montantsaphirHT);
    const btRecords = rowData.map((item) => item.montantsaphirBT);
    const prepaidRecords = rowData.map((item) => item.montantsaphirPrepaid);

    // Calcul des totaux pour chaque type
    const htWithTotal = htRecords.map((record) => {
      const total = Object.values(record)
        .slice(1, 13)
        .reduce((acc, val) => acc + Number(val), 0);
      return { ...record, Total: total };
    });

    const btWithTotal = btRecords.map((record) => {
      const total = Object.values(record)
        .slice(1, 13)
        .reduce((acc, val) => acc + Number(val), 0);
      return { ...record, Total: total };
    });

    const prepaidWithTotal = prepaidRecords.map((record) => {
      const total = Object.values(record)
        .slice(1, 13)
        .reduce((acc, val) => acc + Number(val), 0);
      return { ...record, Total: total };
    });

    // Ajout des montants Jade et Écart à chaque tableau
    const combinedHtData = [
      ...htWithTotal,
      {
        Libelle: "Montant Saphir Jade",
        Janvier: htRecords[0].Janvier + btRecords[0].Janvier,
        Février: htRecords[0].Février + btRecords[0].Février,
        Mars: htRecords[0].Mars + btRecords[0].Mars,
        Avril: htRecords[0].Avril + btRecords[0].Avril,
        Mai: htRecords[0].Mai + btRecords[0].Mai,
        Juin: htRecords[0].Juin + btRecords[0].Juin,
        Juillet: htRecords[0].Juillet + btRecords[0].Juillet,
        Août: htRecords[0].Août + btRecords[0].Août,
        Septembre: htRecords[0].Septembre + btRecords[0].Septembre,
        Octobre: htRecords[0].Octobre + btRecords[0].Octobre,
        Novembre: htRecords[0].Novembre + btRecords[0].Novembre,
        Décembre: htRecords[0].Décembre + btRecords[0].Décembre,
        Total: htWithTotal[0].Total + btWithTotal[0].Total,
      },
      {
        Libelle: "Écart",
        Janvier: htRecords[0].Janvier - btRecords[0].Janvier,
        Février: htRecords[0].Février - btRecords[0].Février,
        Mars: htRecords[0].Mars - btRecords[0].Mars,
        Avril: htRecords[0].Avril - btRecords[0].Avril,
        Mai: htRecords[0].Mai - btRecords[0].Mai,
        Juin: htRecords[0].Juin - btRecords[0].Juin,
        Juillet: htRecords[0].Juillet - btRecords[0].Juillet,
        Août: htRecords[0].Août - btRecords[0].Août,
        Septembre: htRecords[0].Septembre - btRecords[0].Septembre,
        Octobre: htRecords[0].Octobre - btRecords[0].Octobre,
        Novembre: htRecords[0].Novembre - btRecords[0].Novembre,
        Décembre: htRecords[0].Décembre - btRecords[0].Décembre,
        Total: htWithTotal[0].Total - btWithTotal[0].Total,
      },
    ];

    const combinedBtData = [
      ...btWithTotal,
      {
        Libelle: "Montant Saphir Jade",
        Janvier: htRecords[0].Janvier + btRecords[0].Janvier,
        Février: htRecords[0].Février + btRecords[0].Février,
        Mars: htRecords[0].Mars + btRecords[0].Mars,
        Avril: htRecords[0].Avril + btRecords[0].Avril,
        Mai: htRecords[0].Mai + btRecords[0].Mai,
        Juin: htRecords[0].Juin + btRecords[0].Juin,
        Juillet: htRecords[0].Juillet + btRecords[0].Juillet,
        Août: htRecords[0].Août + btRecords[0].Août,
        Septembre: htRecords[0].Septembre + btRecords[0].Septembre,
        Octobre: htRecords[0].Octobre + btRecords[0].Octobre,
        Novembre: htRecords[0].Novembre + btRecords[0].Novembre,
        Décembre: htRecords[0].Décembre + btRecords[0].Décembre,
        Total: htWithTotal[0].Total + btWithTotal[0].Total,
      },
      {
        Libelle: "Écart",
        Janvier: htRecords[0].Janvier - btRecords[0].Janvier,
        Février: htRecords[0].Février - btRecords[0].Février,
        Mars: htRecords[0].Mars - btRecords[0].Mars,
        Avril: htRecords[0].Avril - btRecords[0].Avril,
        Mai: htRecords[0].Mai - btRecords[0].Mai,
        Juin: htRecords[0].Juin - btRecords[0].Juin,
        Juillet: htRecords[0].Juillet - btRecords[0].Juillet,
        Août: htRecords[0].Août - btRecords[0].Août,
        Septembre: htRecords[0].Septembre - btRecords[0].Septembre,
        Octobre: htRecords[0].Octobre - btRecords[0].Octobre,
        Novembre: htRecords[0].Novembre - btRecords[0].Novembre,
        Décembre: htRecords[0].Décembre - btRecords[0].Décembre,
        Total: htWithTotal[0].Total - btWithTotal[0].Total,
      },
    ];

    const combinedPrepaidData = [
      ...prepaidWithTotal,
      {
        Libelle: "Montant Saphir Jade",
        Janvier: prepaidRecords[0].Janvier + btRecords[0].Janvier,
        Février: prepaidRecords[0].Février + btRecords[0].Février,
        Mars: prepaidRecords[0].Mars + btRecords[0].Mars,
        Avril: prepaidRecords[0].Avril + btRecords[0].Avril,
        Mai: prepaidRecords[0].Mai + btRecords[0].Mai,
        Juin: prepaidRecords[0].Juin + btRecords[0].Juin,
        Juillet: prepaidRecords[0].Juillet + btRecords[0].Juillet,
        Août: prepaidRecords[0].Août + btRecords[0].Août,
        Septembre: prepaidRecords[0].Septembre + btRecords[0].Septembre,
        Octobre: prepaidRecords[0].Octobre + btRecords[0].Octobre,
        Novembre: prepaidRecords[0].Novembre + btRecords[0].Novembre,
        Décembre: prepaidRecords[0].Décembre + btRecords[0].Décembre,
        Total: prepaidWithTotal[0].Total + btWithTotal[0].Total,
      },
      {
        Libelle: "Écart",
        Janvier: prepaidRecords[0].Janvier - btRecords[0].Janvier,
        Février: prepaidRecords[0].Février - btRecords[0].Février,
        Mars: prepaidRecords[0].Mars - btRecords[0].Mars,
        Avril: prepaidRecords[0].Avril - btRecords[0].Avril,
        Mai: prepaidRecords[0].Mai - btRecords[0].Mai,
        Juin: prepaidRecords[0].Juin - btRecords[0].Juin,
        Juillet: prepaidRecords[0].Juillet - btRecords[0].Juillet,
        Août: prepaidRecords[0].Août - btRecords[0].Août,
        Septembre: prepaidRecords[0].Septembre - btRecords[0].Septembre,
        Octobre: prepaidRecords[0].Octobre - btRecords[0].Octobre,
        Novembre: prepaidRecords[0].Novembre - btRecords[0].Novembre,
        Décembre: prepaidRecords[0].Décembre - btRecords[0].Décembre,
        Total: prepaidWithTotal[0].Total - btWithTotal[0].Total,
      },
    ];

    setHtData(combinedHtData);
    setBtData(combinedBtData);
    setPrepaidData(combinedPrepaidData);
  }, []);

  return (
    <div>
      <div className="panel">
        <p className="flex items-center text-success">
          <button
            type="button"
            className={`flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
          >
            <IconSquareRotated className="shrink-0 fill-success" />
          </button>
          <span className="ml-2"> Montants Saphir HT</span>
        </p>
        <div className="datatables mt-3">
          <DataTable
            className="table-bordered whitespace-nowrap"
            records={htData}
            columns={[
              { accessor: "Libelle", title: "Libelle" },
              { accessor: "Janvier", title: "Janvier" },
              { accessor: "Février", title: "Février" },
              { accessor: "Mars", title: "Mars" },
              { accessor: "Avril", title: "Avril" },
              { accessor: "Mai", title: "Mai" },
              { accessor: "Juin", title: "Juin" },
              { accessor: "Juillet", title: "Juillet" },
              { accessor: "Août", title: "Août" },
              { accessor: "Septembre", title: "Septembre" },
              { accessor: "Octobre", title: "Octobre" },
              { accessor: "Novembre", title: "Novembre" },
              { accessor: "Décembre", title: "Décembre" },
              { accessor: "Total", title: "Total" },
            ]}
            totalRecords={htData.length}
            minHeight={200}
          />
        </div>
      </div>

      <div className="panel mt-5">
        <p className="flex items-center text-success">
          <button
            type="button"
            className={`flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
          >
            <IconSquareRotated className="shrink-0 fill-success" />
          </button>
          <span className="ml-2"> Montants Saphir BT</span>
        </p>
        <div className="datatables mt-3">
          <DataTable
            className="table-bordered whitespace-nowrap"
            records={btData}
            columns={[
              { accessor: "Libelle", title: "Libelle" },
              { accessor: "Janvier", title: "Janvier" },
              { accessor: "Février", title: "Février" },
              { accessor: "Mars", title: "Mars" },
              { accessor: "Avril", title: "Avril" },
              { accessor: "Mai", title: "Mai" },
              { accessor: "Juin", title: "Juin" },
              { accessor: "Juillet", title: "Juillet" },
              { accessor: "Août", title: "Août" },
              { accessor: "Septembre", title: "Septembre" },
              { accessor: "Octobre", title: "Octobre" },
              { accessor: "Novembre", title: "Novembre" },
              { accessor: "Décembre", title: "Décembre" },
              { accessor: "Total", title: "Total" },
            ]}
            totalRecords={btData.length}
            minHeight={200}
          />
        </div>
      </div>

      <div className="panel mt-5">
        <p className="flex items-center text-success">
          <button
            type="button"
            className={`flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
          >
            <IconSquareRotated className="shrink-0 fill-success" />
          </button>
          <span className="ml-2"> Montants Saphir Prepaid</span>
        </p>
        <div className="datatables mt-3">
          <DataTable
            className="table-bordered whitespace-nowrap"
            records={prepaidData}
            columns={[
              { accessor: "Libelle", title: "Libelle" },
              { accessor: "Janvier", title: "Janvier" },
              { accessor: "Février", title: "Février" },
              { accessor: "Mars", title: "Mars" },
              { accessor: "Avril", title: "Avril" },
              { accessor: "Mai", title: "Mai" },
              { accessor: "Juin", title: "Juin" },
              { accessor: "Juillet", title: "Juillet" },
              { accessor: "Août", title: "Août" },
              { accessor: "Septembre", title: "Septembre" },
              { accessor: "Octobre", title: "Octobre" },
              { accessor: "Novembre", title: "Novembre" },
              { accessor: "Décembre", title: "Décembre" },
              { accessor: "Total", title: "Total" },
            ]}
            totalRecords={prepaidData.length}
            minHeight={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;