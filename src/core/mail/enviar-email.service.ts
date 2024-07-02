import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
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

      await this.mailerService.sendMail(enviarEmailDto);

      this.logger.log(
        `enviar-email [OK]: ${enviarEmailDto.template} - ${enviarEmailDto.to}`,
      );
    } catch (error) {
      this.logger.error(`enviar-email [ERROR]: ${error.message}`);
    }
  }
}
