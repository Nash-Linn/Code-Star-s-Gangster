import { Test, TestingModule } from '@nestjs/testing';
import { TagManageService } from './tag-manage.service';

describe('TagManageService', () => {
  let service: TagManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagManageService],
    }).compile();

    service = module.get<TagManageService>(TagManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
