import { HospitalData, GovernorateHealth } from '../lib/types';

export const GOVERNORATE_HEALTH: GovernorateHealth[] = [
  { governorateCode: 'MUS', govtHospitals: 15, govtBeds: 3467, healthCentres: 7, extendedHC: 117, privateHospitals: 21, privateBeds: 1278, medicalCentres: 189, pharmacies: 305 },
  { governorateCode: 'DHO', govtHospitals: 11, govtBeds: 711, healthCentres: 0, extendedHC: 34, privateHospitals: 3, privateBeds: 102, medicalCentres: 25, pharmacies: 30 },
  { governorateCode: 'MSN', govtHospitals: 3, govtBeds: 158, healthCentres: 1, extendedHC: 3, privateHospitals: 0, privateBeds: 0, medicalCentres: 1, pharmacies: 1 },
  { governorateCode: 'BUR', govtHospitals: 2, govtBeds: 150, healthCentres: 1, extendedHC: 7, privateHospitals: 1, privateBeds: 12, medicalCentres: 5, pharmacies: 8 },
  { governorateCode: 'DAK', govtHospitals: 6, govtBeds: 599, healthCentres: 4, extendedHC: 24, privateHospitals: 1, privateBeds: 35, medicalCentres: 35, pharmacies: 47 },
  { governorateCode: 'BTN', govtHospitals: 5, govtBeds: 560, healthCentres: 6, extendedHC: 19, privateHospitals: 6, privateBeds: 245, medicalCentres: 48, pharmacies: 65 },
  { governorateCode: 'BTS', govtHospitals: 5, govtBeds: 256, healthCentres: 3, extendedHC: 15, privateHospitals: 3, privateBeds: 159, medicalCentres: 30, pharmacies: 28 },
  { governorateCode: 'SHS', govtHospitals: 4, govtBeds: 354, healthCentres: 2, extendedHC: 17, privateHospitals: 0, privateBeds: 0, medicalCentres: 15, pharmacies: 21 },
  { governorateCode: 'SHN', govtHospitals: 6, govtBeds: 366, healthCentres: 0, extendedHC: 16, privateHospitals: 0, privateBeds: 0, medicalCentres: 14, pharmacies: 7 },
  { governorateCode: 'DHH', govtHospitals: 2, govtBeds: 261, healthCentres: 1, extendedHC: 16, privateHospitals: 1, privateBeds: 23, medicalCentres: 13, pharmacies: 15 },
  { governorateCode: 'WUS', govtHospitals: 3, govtBeds: 80, healthCentres: 0, extendedHC: 12, privateHospitals: 0, privateBeds: 0, medicalCentres: 3, pharmacies: 3 },
];

export const MOH_HOSPITALS: HospitalData[] = [
  // Muscat
  { name: 'Royal Hospital', governorateCode: 'MUS', sector: 'government', beds: 748, dischargesTotal: 46761, dischargesFemale: 28151, dischargesMale: 18610, meanStayDays: 4.5, occupancyRate: 80.4 },
  { name: 'Khoula Hospital', governorateCode: 'MUS', sector: 'government', beds: 501, dischargesTotal: 21924, dischargesFemale: 13402, dischargesMale: 8522, meanStayDays: 5.1, occupancyRate: 65.8 },
  { name: 'Al-Nahdha Hospital', governorateCode: 'MUS', sector: 'government', beds: 157, dischargesTotal: 9960, dischargesFemale: 4874, dischargesMale: 5086, meanStayDays: 2.8, occupancyRate: 58.7 },
  { name: 'Al Masarra Hospital', governorateCode: 'MUS', sector: 'government', beds: 185, dischargesTotal: 1433, dischargesFemale: 432, dischargesMale: 1001, meanStayDays: 43.3, occupancyRate: 62.6 },
  { name: 'Muscat Taafi Center', governorateCode: 'MUS', sector: 'government', beds: 170, dischargesTotal: 403, dischargesFemale: 1, dischargesMale: 402, meanStayDays: 13.9, occupancyRate: 11.9 },
  { name: 'Al-Rahma', governorateCode: 'MUS', sector: 'government', beds: 24, dischargesTotal: 123, dischargesFemale: 47, dischargesMale: 76, meanStayDays: 23.9, occupancyRate: 17.4 },
  { name: 'Qurayyat', governorateCode: 'MUS', sector: 'government', beds: 31, dischargesTotal: 818, dischargesFemale: 433, dischargesMale: 385, meanStayDays: 3.2, occupancyRate: 27.3 },
  // Dhofar
  { name: 'Sultan Qaboos Hospital (Dhofar)', governorateCode: 'DHO', sector: 'government', beds: 515, dischargesTotal: 26835, dischargesFemale: 15922, dischargesMale: 10913, meanStayDays: 4.5, occupancyRate: 65.2 },
  { name: 'Madinat Al Haq', governorateCode: 'DHO', sector: 'government', beds: 14, dischargesTotal: 152, dischargesFemale: 81, dischargesMale: 71, meanStayDays: 2.1, occupancyRate: 8.8 },
  { name: 'Sadh', governorateCode: 'DHO', sector: 'government', beds: 18, dischargesTotal: 248, dischargesFemale: 122, dischargesMale: 126, meanStayDays: 2.3, occupancyRate: 11.4 },
  { name: 'Taqah', governorateCode: 'DHO', sector: 'government', beds: 25, dischargesTotal: 568, dischargesFemale: 330, dischargesMale: 238, meanStayDays: 2.8, occupancyRate: 23.7 },
  { name: 'Mirbat', governorateCode: 'DHO', sector: 'government', beds: 20, dischargesTotal: 485, dischargesFemale: 238, dischargesMale: 247, meanStayDays: 4.0, occupancyRate: 30.1 },
  { name: 'Al Mazuynah Hospital', governorateCode: 'DHO', sector: 'government', beds: 36, dischargesTotal: 1269, dischargesFemale: 735, dischargesMale: 534, meanStayDays: 2.4, occupancyRate: 30.0 },
  { name: 'Thumrayt Hospital', governorateCode: 'DHO', sector: 'government', beds: 2, dischargesTotal: 29, dischargesFemale: 27, dischargesMale: 2, meanStayDays: 19.1, occupancyRate: 34.9 },
  // Musandam
  { name: 'Khasab Hospital', governorateCode: 'MSN', sector: 'government', beds: 102, dischargesTotal: 2793, dischargesFemale: 1381, dischargesMale: 1412, meanStayDays: 2.7, occupancyRate: 28.1 },
  { name: 'Bukha', governorateCode: 'MSN', sector: 'government', beds: 40, dischargesTotal: 459, dischargesFemale: 179, dischargesMale: 280, meanStayDays: 1.7, occupancyRate: 7.4 },
  { name: 'Daba', governorateCode: 'MSN', sector: 'government', beds: 16, dischargesTotal: 78, dischargesFemale: 35, dischargesMale: 43, meanStayDays: 1.8, occupancyRate: 3.6 },
  // Al Buraymi
  { name: 'Al Buraymi Hospital', governorateCode: 'BUR', sector: 'government', beds: 144, dischargesTotal: 8068, dischargesFemale: 4710, dischargesMale: 3358, meanStayDays: 2.7, occupancyRate: 52.2 },
  // Ad Dakhliyah
  { name: 'Nizwa Hospital', governorateCode: 'DAK', sector: 'government', beds: 368, dischargesTotal: 26645, dischargesFemale: 15634, dischargesMale: 11011, meanStayDays: 3.0, occupancyRate: 71.7 },
  { name: 'Samail', governorateCode: 'DAK', sector: 'government', beds: 93, dischargesTotal: 5633, dischargesFemale: 3810, dischargesMale: 1823, meanStayDays: 2.0, occupancyRate: 44.3 },
  { name: 'Bahla', governorateCode: 'DAK', sector: 'government', beds: 58, dischargesTotal: 4493, dischargesFemale: 2654, dischargesMale: 1839, meanStayDays: 1.9, occupancyRate: 56.5 },
  { name: 'Izki', governorateCode: 'DAK', sector: 'government', beds: 30, dischargesTotal: 3230, dischargesFemale: 1697, dischargesMale: 1533, meanStayDays: 1.6, occupancyRate: 70.9 },
  { name: 'Adam', governorateCode: 'DAK', sector: 'government', beds: 25, dischargesTotal: 1787, dischargesFemale: 1195, dischargesMale: 592, meanStayDays: 2.2, occupancyRate: 58.5 },
  { name: 'Al Jebel Al Akhdar', governorateCode: 'DAK', sector: 'government', beds: 25, dischargesTotal: 367, dischargesFemale: 196, dischargesMale: 171, meanStayDays: 2.0, occupancyRate: 11.3 },
  // Al Batinah North
  { name: 'Sohar Hospital', governorateCode: 'BTN', sector: 'government', beds: 469, dischargesTotal: 36973, dischargesFemale: 23113, dischargesMale: 13860, meanStayDays: 3.6, occupancyRate: 71.7 },
  { name: 'Saham', governorateCode: 'BTN', sector: 'government', beds: 55, dischargesTotal: 1583, dischargesFemale: 576, dischargesMale: 1001, meanStayDays: 1.8, occupancyRate: 44.3 },
  { name: 'Shinas', governorateCode: 'BTN', sector: 'government', beds: 9, dischargesTotal: 0, dischargesFemale: 0, dischargesMale: 0, meanStayDays: 0, occupancyRate: 0 },
  { name: 'As Suwaiq Hospital', governorateCode: 'BTN', sector: 'government', beds: 0, dischargesTotal: 46, dischargesFemale: 44, dischargesMale: 2, meanStayDays: 1.0, occupancyRate: 11.3 },
  // Al Batinah South
  { name: 'Ar Rustaq Hospital', governorateCode: 'BTS', sector: 'government', beds: 217, dischargesTotal: 20908, dischargesFemale: 13102, dischargesMale: 7806, meanStayDays: 2.7, occupancyRate: 88.4 },
  // Ash Sharqiyah South
  { name: 'Sur Hospital', governorateCode: 'SHS', sector: 'government', beds: 184, dischargesTotal: 11341, dischargesFemale: 7714, dischargesMale: 3627, meanStayDays: 3.1, occupancyRate: 62.0 },
  { name: 'Jaalan Bani Bu Ali', governorateCode: 'SHS', sector: 'government', beds: 89, dischargesTotal: 10754, dischargesFemale: 6549, dischargesMale: 4205, meanStayDays: 2.2, occupancyRate: 79.2 },
  { name: 'Jaalan Bani Bu Hasan', governorateCode: 'SHS', sector: 'government', beds: 41, dischargesTotal: 3178, dischargesFemale: 1903, dischargesMale: 1275, meanStayDays: 2.2, occupancyRate: 60.5 },
  { name: 'Masirah', governorateCode: 'SHS', sector: 'government', beds: 40, dischargesTotal: 1284, dischargesFemale: 706, dischargesMale: 578, meanStayDays: 2.6, occupancyRate: 30.3 },
  // Ash Sharqiyah North
  { name: 'Ibra Hospital', governorateCode: 'SHN', sector: 'government', beds: 190, dischargesTotal: 24981, dischargesFemale: 10329, dischargesMale: 14652, meanStayDays: 2.2, occupancyRate: 95.6 },
  { name: 'Sinaw', governorateCode: 'SHN', sector: 'government', beds: 89, dischargesTotal: 7721, dischargesFemale: 4663, dischargesMale: 3058, meanStayDays: 2.0, occupancyRate: 65.8 },
  { name: 'Bidiyah', governorateCode: 'SHN', sector: 'government', beds: 24, dischargesTotal: 806, dischargesFemale: 448, dischargesMale: 358, meanStayDays: 2.7, occupancyRate: 23.2 },
  { name: 'Dama Wa AT Taiyyin', governorateCode: 'SHN', sector: 'government', beds: 26, dischargesTotal: 1842, dischargesFemale: 975, dischargesMale: 867, meanStayDays: 1.4, occupancyRate: 43.4 },
  { name: 'Wadi Bani Khalid', governorateCode: 'SHN', sector: 'government', beds: 13, dischargesTotal: 331, dischargesFemale: 196, dischargesMale: 135, meanStayDays: 1.2, occupancyRate: 13.4 },
  // Adh Dhahirah
  { name: 'Ibri Hospital', governorateCode: 'DHH', sector: 'government', beds: 249, dischargesTotal: 19082, dischargesFemale: 11405, dischargesMale: 7677, meanStayDays: 2.6, occupancyRate: 67.2 },
  { name: 'Yanqul', governorateCode: 'DHH', sector: 'government', beds: 12, dischargesTotal: 451, dischargesFemale: 271, dischargesMale: 180, meanStayDays: 2.8, occupancyRate: 29.5 },
  // Al Wusta
  { name: 'Hayma', governorateCode: 'WUS', sector: 'government', beds: 40, dischargesTotal: 2161, dischargesFemale: 961, dischargesMale: 1200, meanStayDays: 2.6, occupancyRate: 51.7 },
  { name: 'Ad Duqm', governorateCode: 'WUS', sector: 'government', beds: 17, dischargesTotal: 1442, dischargesFemale: 747, dischargesMale: 695, meanStayDays: 1.9, occupancyRate: 63.6 },
  { name: 'Al Jazir', governorateCode: 'WUS', sector: 'government', beds: 23, dischargesTotal: 1892, dischargesFemale: 944, dischargesMale: 948, meanStayDays: 2.5, occupancyRate: 76.8 },
];

export const HEALTH_INDICATORS = [
  { year: 2016, bedsPerTenK: 14.9, doctorsPerTenK: 19.6, dentistsPerTenK: 2.8, nursesPerTenK: 44.8, pharmacistsPerTenK: 5.5 },
  { year: 2017, bedsPerTenK: 14.7, doctorsPerTenK: 20.0, dentistsPerTenK: 3.0, nursesPerTenK: 43.7, pharmacistsPerTenK: 5.4 },
  { year: 2018, bedsPerTenK: 14.8, doctorsPerTenK: 21.0, dentistsPerTenK: 3.1, nursesPerTenK: 44.0, pharmacistsPerTenK: 5.9 },
  { year: 2019, bedsPerTenK: 15.0, doctorsPerTenK: 20.8, dentistsPerTenK: 3.2, nursesPerTenK: 44.0, pharmacistsPerTenK: 5.7 },
  { year: 2020, bedsPerTenK: 16.0, doctorsPerTenK: 20.2, dentistsPerTenK: 3.3, nursesPerTenK: 44.9, pharmacistsPerTenK: 6.3 },
  { year: 2021, bedsPerTenK: 15.7, doctorsPerTenK: 19.9, dentistsPerTenK: 3.6, nursesPerTenK: 43.9, pharmacistsPerTenK: 6.2 },
  { year: 2022, bedsPerTenK: 14.7, doctorsPerTenK: 19.1, dentistsPerTenK: 3.4, nursesPerTenK: 43.1, pharmacistsPerTenK: 6.7 },
  { year: 2023, bedsPerTenK: 14.9, doctorsPerTenK: 19.2, dentistsPerTenK: 3.1, nursesPerTenK: 42.8, pharmacistsPerTenK: 6.9 },
  { year: 2024, bedsPerTenK: 15.7, doctorsPerTenK: 21.4, dentistsPerTenK: 3.3, nursesPerTenK: 44.6, pharmacistsPerTenK: 8.3 },
  { year: 2025, bedsPerTenK: 16.4, doctorsPerTenK: 22.6, dentistsPerTenK: 3.5, nursesPerTenK: 46.3, pharmacistsPerTenK: 7.9 },
];
