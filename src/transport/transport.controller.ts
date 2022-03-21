import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { transportDto } from './dto/transport';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transpotService: TransportService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addTransport(@Req() req, @Body() transportDto: transportDto) {
    return this.transpotService.addTransport(req, transportDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/del/:id')
  delTransport(@Param() params, @Req() req) {
    return this.transpotService.deleteTransport(params, req);
  }
}
