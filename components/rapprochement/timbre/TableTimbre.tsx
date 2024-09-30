import React, { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import IconSquareRotated from "@/components/icon/icon-square-rotated";

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
  Total?: number;
}

const rowData = [
  {
    id: 1,
    montantEncaisse: {
      Libelle: "Montant Encaissé",
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
    montantTimbre: {
      Libelle: "Montant Timbre",
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
  },
];

const Table = () => {
  const [encaisseData, setEncaisseData] = useState<MontantData[]>([]);
  const [timbreData, setTimbreData] = useState<MontantData[]>([]);

  useEffect(() => {
    const encaisseRecords = rowData.map((item) => item.montantEncaisse);
    const timbreRecords = rowData.map((item) => item.montantTimbre);

    const encaisseWithTotal = encaisseRecords.map((record) => {
      const total = Object.values(record)
        .slice(1, 13)
        .reduce((acc, val) => acc + Number(val), 0);
      return { ...record, Total: total };
    });

    const timbreWithTotal = timbreRecords.map((record) => {
      const total = Object.values(record)
        .slice(1, 13)
        .reduce((acc, val) => acc + Number(val), 0);
      return { ...record, Total: total };
    });

    const combinedEncaisseData = [
      ...encaisseWithTotal,
      {
        Libelle: "Écart",
        Janvier: encaisseRecords[0].Janvier - timbreRecords[0].Janvier,
        Février: encaisseRecords[0].Février - timbreRecords[0].Février,
        Mars: encaisseRecords[0].Mars - timbreRecords[0].Mars,
        Avril: encaisseRecords[0].Avril - timbreRecords[0].Avril,
        Mai: encaisseRecords[0].Mai - timbreRecords[0].Mai,
        Juin: encaisseRecords[0].Juin - timbreRecords[0].Juin,
        Juillet: encaisseRecords[0].Juillet - timbreRecords[0].Juillet,
        Août: encaisseRecords[0].Août - timbreRecords[0].Août,
        Septembre: encaisseRecords[0].Septembre - timbreRecords[0].Septembre,
        Octobre: encaisseRecords[0].Octobre - timbreRecords[0].Octobre,
        Novembre: encaisseRecords[0].Novembre - timbreRecords[0].Novembre,
        Décembre: encaisseRecords[0].Décembre - timbreRecords[0].Décembre,
        Total: encaisseWithTotal[0].Total - timbreWithTotal[0].Total,
      },
    ];

    setEncaisseData(combinedEncaisseData);
    setTimbreData(timbreWithTotal);
  }, []);

  return (
    <div>
      <div className="panel">
        <p className="flex items-center text-success">
          <button
            type="button"
            className="flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300"
          >
            <IconSquareRotated className="shrink-0 fill-success" />
          </button>
          <span className="ml-2"> Montant Encaissé</span>
        </p>
        <div className="datatables mt-3">
          <DataTable
            className="table-bordered whitespace-nowrap"
            records={encaisseData}
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
            totalRecords={encaisseData.length}
            minHeight={200}
          />
        </div>
      </div>

      <div className="panel mt-5">
        <p className="flex items-center text-success">
          <button
            type="button"
            className="flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300"
          >
            <IconSquareRotated className="shrink-0 fill-success" />
          </button>
          <span className="ml-2"> Montant Timbre</span>
        </p>
        <div className="datatables mt-3">
          <DataTable
            className="table-bordered whitespace-nowrap"
            records={timbreData}
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
            totalRecords={timbreData.length}
            minHeight={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
