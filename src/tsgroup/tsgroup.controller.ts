import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TsgroupService } from './tsgroup.service';
import { groupDto } from './dto/groupDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tsgroup')
export class TsgroupController {
  constructor(private readonly TsgroupService: TsgroupService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  add(@Req() req, @Body() groupDto: groupDto) {
    return this.TsgroupService.addGroup(req, groupDto);
  }
}
