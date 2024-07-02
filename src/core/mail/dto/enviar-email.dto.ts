import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EnviarEmailDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  to: string | string[];

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  subject: string;

  @IsNotEmpty()
  @IsDefined()
  context: any;

  @IsNotEmpty()
  @IsDefined()
  template: string;
}
