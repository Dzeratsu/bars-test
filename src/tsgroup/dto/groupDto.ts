import { IsNotEmpty } from 'class-validator';

export class groupDto {
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  description: string;

  unitID?: number[];
}
