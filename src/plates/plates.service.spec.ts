import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PlatesService } from './plates.service';

describe('PlatesService', () => {
  let service: PlatesService;

  beforeEach(async () => {
    function mockPlateModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatesService,
        {
          provide: getModelToken('Plate'),
          useValue: mockPlateModel,
        },
      ],
    }).compile();

    service = module.get<PlatesService>(PlatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
