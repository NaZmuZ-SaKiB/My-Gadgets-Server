import { TUserRole } from "./user.type";

export const userRoles: TUserRole[] = ["super_admin", "admin", "user"];

export const USER_ROLE: {
  [key: string]: TUserRole;
} = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
} as const;
