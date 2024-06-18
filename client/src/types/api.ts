export type UserType = {
  id: string;
  fullName: string;
  email?: string;
  userType: "NORMAL" | "PSEUDOADMIN" | "ADMIN";
  createdAt?: Date;
};

export type CoreType = {
  id: string;
  name: string;
  imageUrl: string;
  creator?: UserType;
  nexus: NexusType[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type NexusType = {
  id: string;
  name: string;
  category: string;
  creator?: UserType[];
  users?: UserType[];
  files?: File[];
  announcements?: Announcement[];
  createdAt?: Date;
  updatedAt?: Date;
};

type File = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  sentBy: UserType;
  timeStamp: Date;
};

type Announcement = {
  id: string;
  title: string;
  message: string;
  sentBy: UserType;
  timeStamp: Date;
};
