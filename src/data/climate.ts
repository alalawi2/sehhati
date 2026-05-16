import { ClimateData } from '../lib/types';

export const CLIMATE_DATA: ClimateData[] = [
  {
    governorateCode: 'MUS', station: 'Muscat International Airport',
    temperature: [20.5, 23.0, 25.5, 31.8, 34.9, 35.9, 32.2, 31.9, 31.0, 29.3, 24.7, 23.0],
    humidity: [54, 64, 50, 36, 43, 49, 77, 76, 77, 63, 55, 60],
    rainfall: [0.2, 0.2, 0, 0, 0, 0, 2.0, 0, 0, 0, 0, 3.8],
  },
  {
    governorateCode: 'DHO', station: 'Salalah Port',
    temperature: [23.8, 24.1, 26.7, 27.8, 29.6, 28.3, 25.7, 25.8, 24.4, 27.1, 26.1, 24.5],
    humidity: [46, 65, 66, 79, 83, 88, 95, 95, 93, 69, 57, 57],
    rainfall: [0, 0, 0, 0.4, 5.8, 27.6, 61.0, 17.0, 0, 0, 0, 0],
  },
  {
    governorateCode: 'MSN', station: 'Khasab Port',
    temperature: [21.4, 22.8, 25.7, 30.3, 33.7, 34.4, 34.9, 34.7, 33.1, 31.0, 26.5, 22.8],
    humidity: [46, 53, 44, 46, 48, 59, 63, 62, 68, 62, 46, 62],
    rainfall: [0.8, 3.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97.0],
  },
  {
    governorateCode: 'BUR', station: 'Al Buraymi Station',
    temperature: [18.4, 22.0, 25.6, 31.8, 35.3, 36.7, 37.2, 38.1, 34.8, 30.6, 25.1, 21.0],
    humidity: [49, 42, 28, 17, 20, 27, 28, 31, 28, 38, 37, 53],
    rainfall: [0, 0.6, 0, 0, 0, 7.4, 0, 0, 0.6, 0, 0, 10.0],
  },
  {
    governorateCode: 'DAK', station: 'Adam Airport',
    temperature: [19.6, 23.5, 26.6, 32.6, 35.7, 36.9, 37.5, 37.2, 33.5, 32.8, 30.1, 24.8],
    humidity: [43, 43, 27, 19, 26, 30, 30, 48, 47, 35, 39, 52],
    rainfall: [0, 0, 0, 0, 2.0, 3.0, 67.2, 5.0, 0, 0, 0, 0],
  },
  {
    governorateCode: 'BTN', station: 'Sohar (Majis)',
    temperature: [21.0, 22.9, 25.0, 30.6, 33.5, 34.9, 32.6, 31.7, 31.2, 29.8, 25.4, 23.1],
    humidity: [52, 64, 54, 54, 54, 58, 78, 79, 76, 64, 53, 61],
    rainfall: [0, 0.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.2],
  },
  {
    // Note: Jan and Feb data for Nakhal was unavailable; values are estimated as average of Dec and Mar
    governorateCode: 'BTS', station: 'Nakhal Station',
    temperature: [24.2, 25.4, 26.7, 29.0, 33.5, 36.9, 37.8, 36.5, 34.9, 30.3, 24.4, 21.6],
    humidity: [42, 36, 29, 16, 19, 26, 43, 48, 48, 36, 39, 55],
    rainfall: [0, 0, 0, 0, 0, 7.4, 3.0, 0, 0, 0, 0, 0],
  },
  {
    governorateCode: 'SHS', station: 'Sur Station',
    temperature: [21.5, 24.1, 26.4, 33.2, 36.1, 35.3, 33.4, 31.6, 31.4, 29.1, 24.8, 23.0],
    humidity: [56, 60, 47, 28, 38, 38, 52, 57, 55, 52, 52, 57],
    rainfall: [0, 0, 0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0],
  },
  {
    governorateCode: 'SHN', station: 'Ibra Station',
    temperature: [19.3, 23.1, 26.3, 32.1, 36.3, 35.9, 36.0, 35.5, 32.9, 31.8, 29.0, 24.1],
    humidity: [45, 44, 28, 21, 26, 31, 35, 47, 48, 33, 29, 49],
    rainfall: [0, 0, 0, 0, 0, 3.2, 3.6, 17.2, 1.2, 2.2, 0, 0],
  },
  {
    governorateCode: 'DHH', station: 'Ibri Station',
    temperature: [19.3, 23.2, 26.1, 32.9, 35.8, 37.6, 38.4, 37.6, 36.1, 34.7, 31.3, 25.5],
    humidity: [45, 33, 24, 13, 18, 21, 23, 35, 35, 29, 33, 54],
    rainfall: [0, 0, 0, 0, 0, 1.8, 31.8, 0.4, 0, 0, 0, 14.4],
  },
  {
    governorateCode: 'WUS', station: 'Duqm Airport',
    temperature: [20.8, 22.6, 25.0, 28.9, 30.7, 29.7, 27.3, 26.0, 26.8, 24.3, 26.6, 22.4],
    humidity: [55, 69, 66, 63, 67, 75, 78, 81, 84, 69, 66, 65],
    rainfall: [0, 2.0, 1.2, 0.8, 0.4, 0, 6.4, 0, 0.2, 0, 0, 0],
  },
];

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
