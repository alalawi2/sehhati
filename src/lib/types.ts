export interface Governorate {
  code: string;
  nameEn: string;
  nameAr: string;
  centroid: [number, number];
  area: number;
}

export interface PopulationData {
  governorateCode: string;
  omani2025: number;
  expat2025: number;
  total2025: number;
  total2024: number;
  total2023: number;
  density2025: number;
}

export interface HospitalData {
  name: string;
  governorateCode: string;
  sector: 'government' | 'private';
  beds: number;
  dischargesTotal: number;
  dischargesFemale: number;
  dischargesMale: number;
  meanStayDays: number;
  occupancyRate: number;
}

export interface HealthIndicator {
  year: number;
  bedsPerTenK: number;
  doctorsPerTenK: number;
  dentistsPerTenK: number;
  nursesPerTenK: number;
  pharmacistsPerTenK: number;
}

export interface GovernorateHealth {
  governorateCode: string;
  govtHospitals: number;
  govtBeds: number;
  healthCentres: number;
  extendedHC: number;
  privateHospitals: number;
  privateBeds: number;
  medicalCentres: number;
  pharmacies: number;
}

export interface DiseaseDeathData {
  category: string;
  categoryAr: string;
  total: number;
  byGovernorate: Record<string, number>;
}

export interface InfectiousDisease {
  name: string;
  nameAr: string;
  cases2025: number;
  cases2024: number;
  cases2023: number;
  group: 'A' | 'B' | 'C';
}

export interface ClimateData {
  governorateCode: string;
  station: string;
  temperature: number[];  // Jan-Dec
  humidity: number[];     // Jan-Dec
  rainfall: number[];     // Jan-Dec
}

export interface EquityScore {
  governorateCode: string;
  overall: number;
  bedScore: number;
  doctorScore: number;
  nurseScore: number;
  accessScore: number;
  stressScore: number;
}

export interface CapacityProjection {
  hospitalName: string;
  governorateCode: string;
  currentBeds: number;
  currentOccupancy: number;
  projectedOccupancy2027: number;
  projectedOccupancy2030: number;
  monthsUntil85Pct: number | null;
  riskLevel: 'critical' | 'high' | 'moderate' | 'low' | 'surplus';
}

export interface PopulationIndicator {
  year: number;
  totalPop: number;
  omaniPop: number;
  expatPop: number;
  lifeExpectancy: number;
  fertilityRate: number;
  crudeBirthRate: number;
  crudeDeathRate: number;
  infantMortality: number;
  under5Mortality: number;
  maternalMortality: number;
}
