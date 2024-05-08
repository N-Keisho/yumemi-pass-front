export interface Prefectures {
  message: null;
  result: Prefecture[];
}

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface ExtendedPopulation extends Population {
  prefCode: number;
  prefName: string;
}

export interface Population {
  message: null;
  result: PopulationResult;
}

export interface PopulationResult {
  boundaryYear: number;
  data: PopulationData[];
}

export interface PopulationData {
  label: string;
  data: PopulationDataDetail[];
}

export interface PopulationDataDetail {
  year: number;
  value: number;
}
