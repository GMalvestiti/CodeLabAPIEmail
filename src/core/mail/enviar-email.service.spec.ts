import { Test, TestingModule } from '@nestjs/testing';
import { EnviarEmailService } from './enviar-email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EnviarEmailDto } from './dto/enviar-email.dto';

describe('EnviarEmailService', () => {
  let service: EnviarEmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<EnviarEmailService>(EnviarEmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(' enviarWithtemplate', () => {
    it('enviarEmail', () => {
      const spy = jest
        .spyOn(mailerService, 'sendMail')
        .mockImplementation(async () => true);

      const enviarEmailDto: EnviarEmailDto = {
        to: 'teste@teste.com',
        subject: 'Recuperação de Senha',
        template: 'recuperacao-senha',
        context: {},
      };

      service.enviarWithtemplate(enviarEmailDto);

      expect(spy).toHaveBeenCalled();
    });

    it('enviarEmail com erros', () => {
      const spy = jest
        .spyOn(mailerService, 'sendMail')
        .mockRejectedValue(new Error('Erro ao enviar email'));

      const enviarEmailDto: EnviarEmailDto = {
        to: 'teste@teste.com',
        subject: 'Recuperação de Senha',
        template: 'recuperacao-senha',
        context: {},
      };

      try {
        service.enviarWithtemplate(enviarEmailDto);
      } catch (error) {
        expect(spy).toHaveBeenCalled();
        expect(error.message).toContain('Erro ao enviar email');
      }
    });
  });
});
