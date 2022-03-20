import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transport, TransportDocument } from '../schemas/transport.schema';

@Injectable()
export class TransportService {
  constructor(
    @InjectModel(Transport.name)
    private TransportModel: Model<TransportDocument>,
  ) {}
}
