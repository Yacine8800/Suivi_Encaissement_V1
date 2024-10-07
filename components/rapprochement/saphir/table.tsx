import Csv from "@/components/icon/csv";
import IconExcel from "@/components/icon/excel";
import IconSquareRotated from "@/components/icon/icon-square-rotated";
import Pdf from "@/components/icon/pdf";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";

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
  Total: number; // Rendre cette propriété obligatoire et de type number
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
  const [htData, setHtData] = useState<any[]>([]);
  const [btData, setBtData] = useState<any[]>([]);
  const [prepaidData, setPrepaidData] = useState<any[]>([]);

  const couleurEcartTotaux = (colorRef: number) => {
    if (colorRef > 0) {
      return <div className="text-green-600">{colorRef}</div>;
    } else if (colorRef === 0) {
      return <div className="text-black">{colorRef}</div>;
    } else {
      return <div className="text-red-600">{colorRef}</div>;
    }
  };

  useEffect(() => {
    const htRecords = rowData.map((item) => item.montantsaphirHT);
    const btRecords = rowData.map((item) => item.montantsaphirBT);
    const prepaidRecords = rowData.map((item) => item.montantsaphirPrepaid);

    // Calcul des totaux pour chaque type
    const htWithTotal = htRecords.map((record) => {
      const total = Object.values(record)
        .slice(1, 13)
        .reduce((acc, val) => Number(acc) + Number(val), 0);
      return { ...record, Total: total };
    });

    const btWithTotal = btRecords.map((record) => {
      const total = Object.values(record)
        .slice(1, 13)
        .reduce((acc, val) => Number(acc) + Number(val), 0);
      return { ...record, Total: total };
    });

    const prepaidWithTotal = prepaidRecords.map((record) => {
      const total = Object.values(record)
        .slice(1, 13)
        .reduce((acc, val) => Number(acc) + Number(val), 0);
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
        Total: couleurEcartTotaux(
          Number(htWithTotal[0].Total) + Number(btWithTotal[0].Total)
        ),
      },
      {
        Libelle: "Écart",
        Janvier: couleurEcartTotaux(
          htRecords[0].Janvier - btRecords[0].Janvier
        ),
        Février: couleurEcartTotaux(
          htRecords[0].Février - btRecords[0].Février
        ),
        Mars: couleurEcartTotaux(htRecords[0].Mars - btRecords[0].Mars),
        Avril: couleurEcartTotaux(htRecords[0].Avril - btRecords[0].Avril),
        Mai: couleurEcartTotaux(htRecords[0].Mai - btRecords[0].Mai),
        Juin: couleurEcartTotaux(htRecords[0].Juin - btRecords[0].Juin),
        Juillet: couleurEcartTotaux(
          htRecords[0].Juillet - btRecords[0].Juillet
        ),
        Août: couleurEcartTotaux(htRecords[0].Août - btRecords[0].Août),
        Septembre: couleurEcartTotaux(
          htRecords[0].Septembre - btRecords[0].Septembre
        ),
        Octobre: couleurEcartTotaux(
          htRecords[0].Octobre - btRecords[0].Octobre
        ),
        Novembre: couleurEcartTotaux(
          htRecords[0].Novembre - btRecords[0].Novembre
        ),
        Décembre: couleurEcartTotaux(
          htRecords[0].Décembre - btRecords[0].Décembre
        ),
        Total: couleurEcartTotaux(
          Number(htWithTotal[0].Total) - Number(btWithTotal[0].Total)
        ),
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
        Total: couleurEcartTotaux(
          Number(htWithTotal[0].Total) + Number(btWithTotal[0].Total)
        ),
      },
      {
        Libelle: "Écart",
        Janvier: couleurEcartTotaux(
          htRecords[0].Janvier - btRecords[0].Janvier
        ),
        Février: couleurEcartTotaux(
          htRecords[0].Février - btRecords[0].Février
        ),
        Mars: couleurEcartTotaux(htRecords[0].Mars - btRecords[0].Mars),
        Avril: couleurEcartTotaux(htRecords[0].Avril - btRecords[0].Avril),
        Mai: couleurEcartTotaux(htRecords[0].Mai - btRecords[0].Mai),
        Juin: couleurEcartTotaux(htRecords[0].Juin - btRecords[0].Juin),
        Juillet: couleurEcartTotaux(
          htRecords[0].Juillet - btRecords[0].Juillet
        ),
        Août: couleurEcartTotaux(htRecords[0].Août - btRecords[0].Août),
        Septembre: couleurEcartTotaux(
          htRecords[0].Septembre - btRecords[0].Septembre
        ),
        Octobre: couleurEcartTotaux(
          htRecords[0].Octobre - btRecords[0].Octobre
        ),
        Novembre: couleurEcartTotaux(
          htRecords[0].Novembre - btRecords[0].Novembre
        ),
        Décembre: couleurEcartTotaux(
          htRecords[0].Décembre - btRecords[0].Décembre
        ),
        Total: couleurEcartTotaux(
          Number(htWithTotal[0].Total) - Number(btWithTotal[0].Total)
        ),
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
        Total: couleurEcartTotaux(
          Number(prepaidWithTotal[0].Total) + Number(btWithTotal[0].Total)
        ),
      },
      {
        Libelle: "Écart --",
        Janvier: couleurEcartTotaux(
          prepaidRecords[0].Janvier - btRecords[0].Janvier
        ),
        Février: couleurEcartTotaux(
          prepaidRecords[0].Février - btRecords[0].Février
        ),
        Mars: couleurEcartTotaux(prepaidRecords[0].Mars - btRecords[0].Mars),
        Avril: couleurEcartTotaux(prepaidRecords[0].Avril - btRecords[0].Avril),
        Mai: couleurEcartTotaux(prepaidRecords[0].Mai - btRecords[0].Mai),
        Juin: couleurEcartTotaux(prepaidRecords[0].Juin - btRecords[0].Juin),
        Juillet: couleurEcartTotaux(
          prepaidRecords[0].Juillet - btRecords[0].Juillet
        ),
        Août: couleurEcartTotaux(prepaidRecords[0].Août - btRecords[0].Août),
        Septembre: couleurEcartTotaux(
          prepaidRecords[0].Septembre - btRecords[0].Septembre
        ),
        Octobre: couleurEcartTotaux(
          prepaidRecords[0].Octobre - btRecords[0].Octobre
        ),
        Novembre: couleurEcartTotaux(
          prepaidRecords[0].Novembre - btRecords[0].Novembre
        ),
        Décembre: couleurEcartTotaux(
          prepaidRecords[0].Décembre - btRecords[0].Décembre
        ),
        Total: couleurEcartTotaux(
          Number(prepaidWithTotal[0].Total) - Number(btWithTotal[0].Total)
        ),
      },
    ];

    setHtData(combinedHtData);
    setBtData(combinedBtData);
    setPrepaidData(combinedPrepaidData);
  }, []);

  const [page, setPage] = useState(1); // état pour la page actuelle
  const [recordsPerPage, setRecordsPerPage] = useState(10); // état pour le nombre d'éléments par page

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
    setRecordsPerPage(newRecordsPerPage);
  };

  return (
    <div>
      <div className="panel">
        <div className="flex w-full ">
          <div className="flex w-full items-center  text-success">
            <button
              type="button"
              className={`flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
            >
              <IconSquareRotated className="shrink-0 fill-success" />
            </button>
            <span className="ml-2"> Montants Saphir HT</span>
          </div>

          <div className=" flex  items-center justify-center   lg:justify-end">
            <button type="button" className="mr-1">
              <IconExcel />
            </button>
            <button type="button" className="text-white">
              <Csv />
            </button>
            <button type="button" className="mr-7">
              <Pdf />
            </button>
          </div>
        </div>
        <div className="datatables mt-3 ">
          <DataTable
            className="table-bordered whitespace-nowrap"
            records={htData.slice(
              (page - 1) * recordsPerPage,
              page * recordsPerPage
            )} // éléments de la page actuelle
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
            totalRecords={htData.length} // total des enregistrements
            minHeight={200}
            withBorder={true}
            borderRadius={10}
            page={page} // page actuelle
            onPageChange={handlePageChange} // gestionnaire de changement de page
            recordsPerPage={recordsPerPage} // éléments par page
            onRecordsPerPageChange={handleRecordsPerPageChange} // gestionnaire du changement du nombre d'éléments par page
            recordsPerPageOptions={[10, 20, 50]} // options pour les éléments par page
          />
        </div>
      </div>

      <div className="panel mt-5">
        <div className="flex w-full ">
          <div className="flex w-full items-center  text-success">
            <button
              type="button"
              className={`flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
            >
              <IconSquareRotated className="shrink-0 fill-success" />
            </button>
            <span className="ml-2"> Montants Saphir BT</span>
          </div>

          <div className=" flex  items-center justify-center   lg:justify-end">
            <button type="button" className="mr-1">
              <IconExcel />
            </button>
            <button type="button" className="text-white">
              <Csv />
            </button>
            <button type="button" className="mr-7">
              <Pdf />
            </button>
          </div>
        </div>
        <div className="datatables mt-3">
          <DataTable
            className="table-bordered whitespace-nowrap"
            records={btData.slice(
              (page - 1) * recordsPerPage,
              page * recordsPerPage
            )} // Affiche uniquement les éléments de la page actuelle
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
            totalRecords={btData.length} // Nombre total d'enregistrements
            minHeight={200}
            withBorder={true}
            page={page} // Page actuelle
            onPageChange={handlePageChange} // Gestionnaire de changement de page
            recordsPerPage={recordsPerPage} // Nombre d'éléments par page
            onRecordsPerPageChange={handleRecordsPerPageChange} // Gestionnaire de changement du nombre d'éléments par page
            recordsPerPageOptions={[10, 20, 50]} // Options de pagination
          />
        </div>
      </div>

      <div className="panel mt-5">
        <div className="flex w-full ">
          <div className="flex w-full items-center  text-success">
            <button
              type="button"
              className={`flex h-10 cursor-default items-center rounded-md font-medium text-success duration-300`}
            >
              <IconSquareRotated className="shrink-0 fill-success" />
            </button>
            <span className="ml-2"> Montants Saphir Prepaid</span>
          </div>

          <div className=" flex  items-center justify-center   lg:justify-end">
            <button type="button" className="mr-1">
              <IconExcel />
            </button>
            <button type="button" className="text-white">
              <Csv />
            </button>
            <button type="button" className="mr-7">
              <Pdf />
            </button>
          </div>
        </div>

        <div className="datatables mt-3">
          <DataTable
            className="table-bordered whitespace-nowrap"
            records={prepaidData.slice(
              (page - 1) * recordsPerPage,
              page * recordsPerPage
            )} // Affichage des enregistrements paginés
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
            totalRecords={prepaidData.length} // Total des enregistrements
            minHeight={200}
            withBorder={true} // Ajoute une bordure à la table
            page={page} // Page actuelle
            onPageChange={handlePageChange} // Gestionnaire de changement de page
            recordsPerPage={recordsPerPage} // Nombre d'enregistrements par page
            onRecordsPerPageChange={handleRecordsPerPageChange} // Gestionnaire de changement du nombre d'enregistrements par page
            recordsPerPageOptions={[10, 20, 50]} // Options pour le nombre d'enregistrements par page
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
