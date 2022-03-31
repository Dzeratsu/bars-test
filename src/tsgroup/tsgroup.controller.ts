import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Put,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TsgroupService } from './tsgroup.service';
import { groupDto } from './dto/groupDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tsgroup')
export class TsgroupController {
  constructor(private readonly TsgroupService: TsgroupService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  allGroup(@Req() req) {
    return this.TsgroupService.getAllGroup(req);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  add(@Req() req, @Body() groupDto: groupDto) {
    return this.TsgroupService.addGroup(req, groupDto);
  }
  @UseGuards(JwtAuthGuard)
  @Put('/edit/:id')
  edit(@Param() params, @Body() groupDto: groupDto) {
    return this.TsgroupService.editGroup(params.id, groupDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/del/:id')
  delGroup(@Param() params) {
    return this.TsgroupService.deleteGroup(params.id);
  }
}
