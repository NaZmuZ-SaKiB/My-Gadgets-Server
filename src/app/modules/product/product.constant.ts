import {
  TChargingPort,
  TCompatibility,
  TConnectivity,
  TOperatingSystem,
  TPowerSource,
} from './product.type';

export const productSearchableFields: string[] = [
  'name',
  'model',
  'description',
  'shortDescription',
];

export const operatingSystems: TOperatingSystem[] = [
  'android',
  'ios',
  'linux',
  'macos',
  'windows',
];

export const chargingPorts: TChargingPort[] = [
  'usb-c',
  'lightning',
  'micro-usb',
];

export const connectivities: TConnectivity[] = ['bluetooth', 'wifi'];

export const powerSources: TPowerSource[] = ['battery', 'plug-in'];

export const compatibilities: TCompatibility[] = [
  ...operatingSystems,
  'iphone',
  'android-phone',
  'laptop',
  'macbook',
];
