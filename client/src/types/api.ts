import { ProfileType } from "@/generated/graphql";

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
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
  files: TFile[];
  announcements: TAnnouncement[];
} & SharedType;

export type TFile = {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  sentBy: TUser;
  timestamp: string;
};

export type TAnnouncement = {
  id: string;
  title: string;
  message: string;
  sentBy: TUser;
  timestamp: string;
};

type TBareCores = Omit<
  TCore,
  "members" | "createdAt" | "updatedAt" | "userRole"
>;

type TBareNexus = Omit<
  TNexus,
  "members" | "createdAt" | "updatedAt" | "userRole" | "files" | "announcements"
>;

export type TUserTree = TBareCores & { nexus: TBareNexus[] };
