import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { authDto } from './dto/auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authDto: authDto): Promise<any> {
    console.log('произошел validateUser');
    const valid = await this.userService.AuthUser(authDto);
    if (valid) {
      return this.login(valid);
    } else {
      return null;
    }
  }
  async login(valid) {
    const payload = { username: valid.name, sub: valid.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
