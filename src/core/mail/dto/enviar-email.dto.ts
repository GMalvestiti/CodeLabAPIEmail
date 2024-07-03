import {
  IsArray,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import Mail from 'nodemailer/lib/mailer';
import { IEmailAttachment } from 'src/shared/interfaces/email-attachment.interface';

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

  @IsOptional()
  @IsArray()
  attachments: IEmailAttachment[] | Mail.Attachment[];
}
