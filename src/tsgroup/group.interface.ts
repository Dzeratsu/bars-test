export interface GroupInterface {
  id: number;
  creatorId: number;
  name: string;
  description: string;
  unitId?: number[];
  createdAt: Date;
  updatedAt?: Date;
}
