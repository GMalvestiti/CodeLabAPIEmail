import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { IEmailAttachment } from 'src/shared/interfaces/email-attachment.interface';
import { EnviarEmailDto } from './dto/enviar-email.dto';

@Injectable()
export class EnviarEmailService {
  private readonly logger = new Logger(EnviarEmailService.name);

  constructor(private mailerService: MailerService) { }

  async enviarWithTemplate(enviarEmailDto: EnviarEmailDto): Promise<void> {
    try {
      this.logger.log(
        `enviar-email: ${enviarEmailDto.template} - ${enviarEmailDto.to}`,
      );

      const attachments: Mail.Attachment[] = [];

      enviarEmailDto.attachments.forEach((item: IEmailAttachment) => {
        attachments.push({
          filename: item.filename,
          content: item.base64,
          encoding: 'base64',
        });
      });

      enviarEmailDto.attachments = attachments;

      await this.mailerService.sendMail(enviarEmailDto);

      this.logger.log(
        `enviar-email [OK]: ${enviarEmailDto.template} - ${enviarEmailDto.to}`,
      );
    } catch (error) {
      this.logger.error(`enviar-email [ERROR]: ${error.message}`);
    }
  }
}
