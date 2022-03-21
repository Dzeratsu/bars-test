import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transport, TransportDocument } from '../schemas/transport.schema';
import { TransportInterface } from './transport.interface';

@Injectable()
export class TransportService {
  constructor(
    @InjectModel(Transport.name)
    private transportModel: Model<TransportDocument>,
  ) {}
  async assignID(): Promise<number> {
    let newID: number;
    const lastId = await this.transportModel.find().limit(1).sort({ id: -1 });
    if (lastId[0] == undefined) {
      newID = 1;
    } else {
      newID = +lastId[0].id + 1;
    }
    return newID;
  }
  async addTransport(req, transportDto) {
    const object: TransportInterface = {
      id: await this.assignID(),
      creatorId: req.user.userId,
      name: transportDto.name,
      description: transportDto.description,
      unitID: transportDto.unitId,
      createdAt: new Date(),
    };
    const transportObject = new this.transportModel(object);
    const sav = await transportObject.save();
    try {
      return 'sucsses';
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  async deleteTransport(param, req) {
    const transp = await this.transportModel.findOneAndUpdate(
      { id: param.id, creatorId: req.user.userId },
      { deletedAt: new Date() },
    );
    if (transp == undefined) {
      throw new BadRequestException('Транспортное средство не найдено');
    } else {
      return transp;
    }
  }
  async deleteAllTransortuser(userID: number) {
    const allUserTransp = await this.transportModel.updateMany(
      { creatorId: userID },
      { deletedAt: new Date() },
    );
    return;
  }
}
