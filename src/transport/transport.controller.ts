import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Delete,
  Param,
  Put,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { transportDto } from './dto/transport';
import { TransportService } from './transport.service';

@Controller('transport')
export class TransportController {
  constructor(private readonly transpotService: TransportService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addTransport(@Req() req, @Body() transportDto: transportDto) {
    return this.transpotService.addTransport(req, transportDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/edit/:id')
  editTs(@Param() param, @Body() transportDto: transportDto) {
    return this.transpotService.editTransport(param.id, transportDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/del/:id')
  delTransport(@Param() params, @Req() req) {
    return this.transpotService.deleteTransport(params, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  allTransport(@Req() req) {
    return this.transpotService.transport(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  oneTS(@Param() params) {
    return this.transpotService.getOneTransport(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delGroup/:id')
  delGroupTs(@Param() params, @Body() id) {
    return this.transpotService.delGroup(params.id, id);
  }
}
