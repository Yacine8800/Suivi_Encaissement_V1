export interface ValidationEncaissement {
  dateValidation: string;
  statutValidation: number;
  observationCaisse: string;
  observationReleve: string;
  observationReclamation: string;
  observationRejete: string;
  ecartReleve: number;
  montantReleve: number;
}

export interface Result {
  id: number;
  directionRegionale: string;
  codeExpl: string;
  dateEncaissement: string;
  journeeCaisse: string;
  produit: string;
  montantRestitutionCaisse: number;
  modeReglement: string;
  banque: string;
  compteBanque: string;
  montantBordereauBanque: number;
  dateRemiseBanque: string;
  numeroBordereau: string;
  ecartCaisseBanque: number;
  caisse: string;
  validationEncaissement: ValidationEncaissement;
}

export interface Paginations {
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  count: number;
  totalCount: number;
  totalPages: number;
}
export interface ITotal {
  totalMontantRestitutionCaisse: number;
  totalMontantReleve: number;
  totalMontantBordereauBanque: number;
}

export interface DataReverse {
  pagination: Paginations;
  result: Result[];
  totals: ITotal;
}
