import { Types } from 'mongoose';

export type TOperatingSystem =
  | 'windows'
  | 'macos'
  | 'android'
  | 'linux'
  | 'ios';

export type TConnectivity = 'bluetooth' | 'wifi';

export type TChargingPort = 'usb-c' | 'lightning' | 'micro-usb';

export type TPowerSource = 'battery' | 'plug-in';

export type TCompatibility =
  | TOperatingSystem
  | 'iphone'
  | 'android-phone'
  | 'laptop'
  | 'macbook';

export type TProduct = {
  name: string;
  slug: string;
  model: string;
  quantity: number;
  salePrice: number;
  regularPrice: number;
  shippingCost: number;
  badgeText?: string;
  images: Types.ObjectId[];
  shortDescription: string;
  description: string;
  specifications: string;
  brand: Types.ObjectId;
  categories: Types.ObjectId[];
  operatingSystem?: TOperatingSystem;
  connectivity?: TConnectivity[];
  chargingPort?: TChargingPort;
  weight?: number;
  powerSource?: TPowerSource;
  camera?: number;
  displaySize?: number;
  compatibility?: TCompatibility[];

  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: Types.ObjectId;
};
