import { Types } from "mongoose";

export type TUserRole = "super_admin" | "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  addresses: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
};
