import { IsNotEmpty } from 'class-validator';

export class userDto {
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  password: string;
}
