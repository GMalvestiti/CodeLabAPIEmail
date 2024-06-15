import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Email from 'email-templates';
import { createTransport } from 'nodemailer';
import { EnviarEmailDto } from './dto/enviar-email.dto';

@Injectable()
export class EnviarEmailService {
  private service: string;
  private user: string;
  private password: string;
  private debug: boolean;

  constructor(private readonly configService: ConfigService) {
    this.service = this.configService.get<string>('MAIL_SERVICE');
    this.user = this.configService.get<string>('MAIL_USER');
    this.password = this.configService.get<string>('MAIL_PASSWORD');
    this.debug = Boolean(this.configService.get<string>('MAIL_DEBUG'));
  }

  async enviarWithtemplate(enviarEmailDto: EnviarEmailDto): Promise<void> {
    const transporter = createTransport({
      service: this.service,
      auth: {
        user: this.user,
        pass: this.password,
      },
      debug: this.debug,
      logger: this.debug,
    });

    const email = new Email({
      message: {
        from: `"CodeLab" <${enviarEmailDto.remetente}>`,
      },
      send: true,
      transport: transporter,
    });

    email
      .send({
        template: enviarEmailDto.template,
        message: {
          to: enviarEmailDto.destinatario,
        },
        locals: enviarEmailDto.locals,
      })
      .then(console.log)
      .catch(console.error);
  }
}
