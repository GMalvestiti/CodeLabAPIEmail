import { Test, TestingModule } from '@nestjs/testing';
import { EnviarEmailController } from './enviar-email.controller';

describe('EnviarEmailController', () => {
  let controller: EnviarEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnviarEmailController],
    }).compile();

    controller = module.get<EnviarEmailController>(EnviarEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
