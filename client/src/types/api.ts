import { ProfileType } from "@/generated/graphql";

export type TUser = {
  id: string;
  fullName: string;
  email: string;
};

type SharedType = {
  id: string;
  name: string;
  userRole: ProfileType;
  members: (TUser & { role: ProfileType })[];
  createdAt: string;
  updatedAt: string;
};

export type TCore = {
  imageUrl: string;
} & SharedType;

export type TNexus = {
  category: string;
} & SharedType;

type TBareCores = Omit<
  TCore,
  "members" | "createdAt" | "updatedAt" | "userRole"
>;

type TBareNexus = Omit<
  TNexus,
  "members" | "createdAt" | "updatedAt" | "userRole"
>;

export type TUserTree = TBareCores & { nexus: TBareNexus[] };
