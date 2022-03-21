export interface TransportInterface {
  id: number;
  creatorId: number;
  name: string;
  description: string;
  unitID?: string;
  createdAt: Date;
}
