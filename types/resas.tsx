// getPrefactures()の戻り値
export interface Prefactures {
    message: null;
    result: Prefecture[];
}

// getPrefactures()の戻り値のresult
export interface Prefecture {
    prefCode: number;
    prefName: string;
}

// Populationの拡張
export interface ExtendedPopulation extends Population {
    prefCode: number;
    prefName: string;
}

// getPopulation()の戻り値
export interface Population {
    message: null;
    result: PopulationResult;
}

// getPopulation()の戻り値のresult
export interface PopulationResult {
    boundaryYear: number;
    data: PopulationData[];
}

// getPopulation()の戻り値のresultのdata
export interface PopulationData {
    label: string;
    data: PopulationDataDetail[];
}

// getPopulation()の戻り値のresultのdataのdata
export interface PopulationDataDetail {
    year: number;
    value: number;
}

