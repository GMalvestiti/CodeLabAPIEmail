import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
import { EnviarEmailDto } from './dto/enviar-email.dto';
import { EnviarEmailService } from './enviar-email.service';

@Controller('enviar-email')
export class EnviarEmailController {
  constructor(private readonly enviarEmailService: EnviarEmailService) {}

  @MessagePattern('enviar-email', Transport.RMQ)
  async enviarEmail(
    @Payload() data: EnviarEmailDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef(); // as ChannelRef;
    const originalMessage = context.getMessage() as unknown;

    try {
      this.enviarEmailService.enviarWithtemplate(data);
    } catch (error) {
    } finally {
      channel.ack(originalMessage);
    }
  }
}
