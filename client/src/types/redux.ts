export type CoreReduxType = {
  id: string;
  name: string;
  imageUrl: string;
  nexus: NexusReduxType[];
};

export type NexusReduxType = {
  id: string;
  name: string;
  category: string;
};
