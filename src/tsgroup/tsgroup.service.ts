import { BadRequestException, Injectable } from '@nestjs/common';
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
      newID = 0;
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
    newGroup.save();
    return { id: newGroup.id };
  }

  async editGroup(params: number, groupDto) {
    const group = await this.groupModel.findOneAndUpdate(
      { id: params },
      { name: groupDto.name, description: groupDto.description },
      { new: true },
    );
    return group;
  }

  async deleteGroup(params: number) {
    const del = await this.groupModel.findOneAndUpdate(
      { id: params },
      { deletedAt: new Date() },
      { new: true },
    );
    if (!del) {
      throw new BadRequestException();
    } else {
      return del;
    }
  }

  async editUnitIDGroup(idGroup: number, idTs: number) {
    const editUnitID = await this.groupModel.find({ id: idGroup });
    const newArr = editUnitID[0].unitID.includes(idTs);
    if (!newArr) {
      const edit = await this.groupModel.findOneAndUpdate(
        { id: idGroup },
        { $push: { unitID: idTs } },
        { new: true },
      );
    }
  }

  async delID(idTS: number, groupID) {
    const group = await this.groupModel.find({ id: groupID });
    if (group[0].unitID.length > 1) {
      const index = group[0].unitID.indexOf(idTS);
      const edit = await this.groupModel.findOneAndUpdate(
        { id: groupID },
        { unitID: group[0].unitID.splice(index, 1) },
        { new: true },
      );
    } else {
      const edit = await this.groupModel.findOneAndUpdate(
        { id: groupID },
        { unitID: [] },
        { new: true },
      );
    }
  }
}
