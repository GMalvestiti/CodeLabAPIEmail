import { Test, TestingModule } from '@nestjs/testing';
import { EnviarEmailController } from './enviar-email.controller';
import { EnviarEmailService } from './enviar-email.service';
import { RmqContext } from '@nestjs/microservices';
import { EnviarEmailDto } from './dto/enviar-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

describe('EnviarEmailController', () => {
  let controller: EnviarEmailController;
  let service: EnviarEmailService;
  let context: RmqContext;

  const channel = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ack: (e: any) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nack: (e: any, y: boolean, x: boolean) => true,
  };

  const args = [{ test: true }, channel, 'pattern'];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnviarEmailController],
      providers: [
        EnviarEmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EnviarEmailController>(EnviarEmailController);
    service = module.get<EnviarEmailService>(EnviarEmailService);
    context = new RmqContext(args as [Record<string, any>, any, string]);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('enviarEmail', () => {
    it('enviarEmail', async () => {
      const originalMessage = context.getMessage();

      jest.spyOn(channel, 'ack').mockImplementation(() => true);
      jest.spyOn(service, 'enviarWithtemplate').mockImplementation();

      const data: EnviarEmailDto = {
        to: 'teste@teste.com',
        subject: 'Recuperação de Senha',
        template: 'recuperacao-senha',
        context: {},
      };

      await controller.enviarEmail(data, context);

      expect(channel.ack(originalMessage)).toBe(true);
    });

    it('enviarEmail com erros', async () => {
      jest.spyOn(channel, 'ack').mockImplementation(() => true);
      jest
        .spyOn(service, 'enviarWithtemplate')
        .mockRejectedValue(new Error('Erro ao enviar email'));

      try {
        const data: EnviarEmailDto = {
          to: 'teste@teste.com',
          subject: 'Recuperação de Senha',
          template: 'recuperacao-senha',
          context: {},
        };

        await controller.enviarEmail(data, context);
      } catch (error) {
        expect(error.message).toContain('Erro ao enviar email');
      }
    });
  });
});
