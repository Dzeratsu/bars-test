import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../schemas/group.schema';
import { TsgroupService } from './tsgroup.service';
import { TsgroupController } from './tsgroup.controller';

@Module({
  providers: [TsgroupService],
  controllers: [TsgroupController],
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
})
export class TsgroupModule {}
