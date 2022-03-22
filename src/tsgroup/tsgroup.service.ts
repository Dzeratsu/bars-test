import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';
import { GroupInterface } from './group.interface';

@Injectable()
export class TsgroupService {
  constructor(
    @InjectModel(Group.name)
    private groupModel: Model<GroupDocument>,
  ) {}
  async assignID(): Promise<number> {
    let newID: number;
    const lastId = await this.groupModel.find().limit(1).sort({ id: -1 });
    if (lastId[0] == undefined) {
      newID = 1;
    } else {
      newID = +lastId[0].id + 1;
    }
    return newID;
  }
  async getAllGroup(req) {
    const proj = { id: 1, name: 1, description: 1, unitID: 1, _id: 0 };
    const allGroup = await this.groupModel.find(
      {
        creatorId: req.user.userId,
        deletedAt: { $exists: false },
      },
      proj,
    );
    return allGroup;
  }
  async addGroup(req, groupDto) {
    const object: GroupInterface = {
      id: await this.assignID(),
      creatorId: req.user.userId,
      name: groupDto.name,
      description: groupDto.description,
      unitId: groupDto.unitID,
      createdAt: new Date(),
    };
    const newGroup = new this.groupModel(object);
    return newGroup.save();
  }
  async deleteGroup(params) {
    const del = await this.groupModel.findOneAndUpdate(
      { id: params.id },
      { deletedAt: new Date() },
    );
    return del;
  }
}
