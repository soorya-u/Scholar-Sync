export type UserType = {
  id: string;
  userType: "NORMAL" | "PSEUDOADMIN" | "ADMIN";
  fullName: string;
};

export type CoreType = {
  id: string;
  imageUrl: string;
  name: string;
};

export type CoreReduxType = {
  allCores: CoreType[];
  activeCore: CoreType;
};
