import { Test, TestingModule } from '@nestjs/testing';
import { BlogsManageService } from './blogs-manage.service';

describe('BlogsManageService', () => {
  let service: BlogsManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogsManageService],
    }).compile();

    service = module.get<BlogsManageService>(BlogsManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
