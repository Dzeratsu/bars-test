import { HttpCode, Injectable, UnauthorizedException } from '@nestjs/common';
import { userDto } from './dto/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { TransportService } from '../transport/transport.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private transportService: TransportService,
  ) {}

  async regUser(userDto: userDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    const lastId = await this.userModel.find().limit(1).sort({ id: -1 });
    if (lastId[0] == undefined) {
      newUser.id = 1;
    } else {
      newUser.id = +lastId[0].id + 1;
    }
    newUser.password = await bcrypt.hash(userDto.password, 10);
    return newUser.save();
  }

  async AuthUser(payload): Promise<any> {
    const user = await this.userModel.findOne({ name: payload.name });
    if (user) {
      if (user.deletedAt) {
        throw new UnauthorizedException('Пользователь удален');
      }
      const checkPassword = await bcrypt.compare(
        payload.password,
        user.password,
      );
      if (user && checkPassword) {
        return user;
      } else {
        throw new UnauthorizedException('Не правильный пароль');
      }
    } else {
      console.log('произошел else');
      throw new UnauthorizedException('Такого пользователя не существует');
    }
  }

  async delUser(request) {
    const user = await this.userModel.findOneAndUpdate(
      { id: request.user.userId },
      { deletedAt: new Date() },
    );
    const delTransport = await this.transportService.deleteAllTransortuser(
      request.user.userId,
    );
  }
}
