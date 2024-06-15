import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class EnviarEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  destinatario: string | string[];

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  remetente: string;

  @IsNotEmpty()
  @IsDefined()
  locals: any;

  @IsNotEmpty()
  @IsDefined()
  template: string;

  @IsNotEmpty()
  @IsDefined()
  conteudo: string;
}
