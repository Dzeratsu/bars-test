import { Controller, Req, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { userDto } from './dto/user';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Post('/registration')
  regUser(
    @Body()
    userDto: userDto,
  ) {
    return this.UserService.regUser(userDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/del')
  delUser(@Req() req) {
    return this.UserService.delUser(req);
  }
}
