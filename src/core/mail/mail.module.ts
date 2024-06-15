import { Module } from '@nestjs/common';
import { EnviarEmailService } from './enviar-email.service';
import { EnviarEmailController } from './enviar-email.controller';

@Module({
  providers: [EnviarEmailService],
  controllers: [EnviarEmailController],
})
export class MailModule {}
