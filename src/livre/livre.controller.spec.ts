import { Test, TestingModule } from '@nestjs/testing';
import { LivreController } from './livre.controller';

describe('LivreController', () => {
  let controller: LivreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivreController],
    }).compile();

    controller = module.get<LivreController>(LivreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
