import { Test, TestingModule } from '@nestjs/testing';
import { SearchBtcController } from './search-btc.controller';

describe('SearchBtcController', () => {
  let controller: SearchBtcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchBtcController],
    }).compile();

    controller = module.get<SearchBtcController>(SearchBtcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
