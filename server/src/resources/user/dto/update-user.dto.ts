import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumberString()
  cpf: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}
