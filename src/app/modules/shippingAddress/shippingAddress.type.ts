import { Types } from "mongoose";

export type TShippingAddress = {
  user: Types.ObjectId;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  division: string;
  zipCode: string;
  phone: string;
  selected: boolean;
};
