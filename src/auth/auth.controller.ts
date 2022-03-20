import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authDto: authDto) {
    console.log('произошел логин');
    return this.authService.validateUser(authDto);
  }
}
