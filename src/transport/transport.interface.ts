export interface TransportInterface {
  id: number;
  creatorId: number;
  name: string;
  description: string;
  unitID?: number[];
  createdAt: Date;
}
