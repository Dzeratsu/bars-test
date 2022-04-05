import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transport, TransportSchema } from '../schemas/transport.schema';
import { TsgroupService } from '../tsgroup/tsgroup.service';
import { TsgroupModule } from '../tsgroup/tsgroup.module';

@Module({
  providers: [TransportService],
  controllers: [TransportController],
  exports: [TransportService],
  imports: [
    TsgroupModule,
    MongooseModule.forFeature([
      { name: Transport.name, schema: TransportSchema },
    ]),
  ],
})
export class TransportModule {}
