export enum UserRole {
  NORMAL,
  ADMIN,
}

export type TUser = {
  id: string;
  fullName: string;
};

type SharedType = {
  id: string;
  name: string;
  userRole: UserRole;
  members: (TUser & { role: UserRole })[];
  createdAt: Date;
  updatedAt: Date;
};

export type TCore = {
  imageUrl: string;
} & SharedType;

export type TNexus = {
  category: string;
} & SharedType;

type TBareCores = Omit<
  TCore,
  "imageUrl" | "members" | "createdAt" | "updatedAt"
>;

type TBareNexus = Omit<
  TNexus,
  "category" | "members" | "createdAt" | "updatedAt"
>;

export type TGroups = TBareCores & { nexus: TBareNexus[] };
