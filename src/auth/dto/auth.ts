import {IsNotEmpty, Length} from 'class-validator';

export class authDto {
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @Length(6,20, {message:'Парольне может быть меньше 6 символов и больше 20'})
  password: string;
}
