import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transport, TransportDocument } from '../schemas/transport.schema';
import { TransportInterface } from './transport.interface';
import { TsgroupService } from '../tsgroup/tsgroup.service';

@Injectable()
export class TransportService {
  constructor(
    @InjectModel(Transport.name)
    private transportModel: Model<TransportDocument>,
    private groupService: TsgroupService,
  ) {}

  async assignID(): Promise<number> {
    let newID: number;
    const lastId = await this.transportModel.find().limit(1).sort({ id: -1 });
    if (lastId[0] == undefined) {
      newID = 0;
    } else {
      newID = +lastId[0].id + 1;
    }
    return newID;
  }

  async transport(req) {
    const proj = {
      id: 1,
      name: 1,
      description: 1,
      unitID: 1,
      createdAt: 1,
      _id: 0,
    };
    const transport = await this.transportModel.find(
      {
        creatorId: req.user.userId,
        deletedAt: { $exists: false },
      },
      proj,
    );
    return transport;
  }

  async addTransport(req, transportDto) {
    const object: TransportInterface = {
      id: await this.assignID(),
      creatorId: req.user.userId,
      name: transportDto.name,
      description: transportDto.description,
      unitID: transportDto.unitID,
      createdAt: new Date(),
    };
    const transportObject = new this.transportModel(object);
    const sav = await transportObject.save();
    try {
      if (transportDto.unitID !== []) {
        for (let i = 0; i < sav.unitID.length; i++) {
          const addId = await this.groupService.editUnitIDGroup(
            transportDto.unitID[i],
            sav.id,
          );
        }
      }
      return sav;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async editTransport(idTS: number, transportDto) {
    const delArr: number[] = [];
    const ts = await this.transportModel.find({ id: idTS });
    if (ts[0].unitID) {
      for (let i = 0; i < transportDto.unitID.length; i++) {
        if (!transportDto.unitID.includes(ts[0].unitID[i])) {
          delArr.push(ts[0].unitID[i]);
        }
      }
    }
    const transport = await this.transportModel.findOneAndUpdate(
      { id: idTS },
      {
        name: transportDto.name,
        description: transportDto.description,
        unitID: transportDto.unitID,
      },
      { new: true },
    );
    this.groupService.delID(transport.id, delArr);
    try {
      if (transportDto.unitID !== []) {
        for (let i = 0; i < transport.unitID.length; i++) {
          const addId = await this.groupService.editUnitIDGroup(
            transportDto.unitID[i],
            transport.id,
          );
        }
      }
      return transport;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteTransport(param, req) {
    const transp = await this.transportModel.findOneAndUpdate(
      { id: param.id, creatorId: req.user.userId },
      { deletedAt: new Date() },
      { new: true },
    );
    if (transp == undefined) {
      throw new BadRequestException('Транспортное средство не найдено');
    } else {
      return transp;
    }
  }

  async deleteAllTransortuser(userID: number): Promise<string> {
    const allUserTransp = await this.transportModel.updateMany(
      { creatorId: userID },
      { deletedAt: new Date() },
    );
    return 'succses';
  }

  async getOneTransport(params: number) {
    const proj = {
      id: 1,
      name: 1,
      description: 1,
      unitID: 1,
      createdAt: 1,
      _id: 0,
    };
    const transport = await this.transportModel.findOne({ id: params }, proj);
    return transport;
  }

  async delGroup(params: number, id: number[]) {
    console.log(id);
    if (id.length == 0) {
      throw new BadRequestException('Прислан пустой массив');
    }
    for (let i = 0; i < id.length; i++) {
      const ts = await this.transportModel.find({ id: id[i] });
      const index = ts[0].unitID.indexOf(params);
      const updateTs = await this.transportModel.findOneAndUpdate(
        { id: id[i] },
        { unitID: ts[0].unitID.splice(index, 1) },
        { new: true },
      );
    }
  }
}
