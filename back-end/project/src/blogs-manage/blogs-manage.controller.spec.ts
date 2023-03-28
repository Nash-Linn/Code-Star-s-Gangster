import { Test, TestingModule } from '@nestjs/testing';
import { BlogsManageController } from './blogs-manage.controller';
import { BlogsManageService } from './blogs-manage.service';

describe('BlogsManageController', () => {
  let controller: BlogsManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsManageController],
      providers: [BlogsManageService],
    }).compile();

    controller = module.get<BlogsManageController>(BlogsManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
