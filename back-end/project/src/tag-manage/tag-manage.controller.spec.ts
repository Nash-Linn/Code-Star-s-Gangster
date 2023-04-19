import { Test, TestingModule } from '@nestjs/testing';
import { TagManageController } from './tag-manage.controller';
import { TagManageService } from './tag-manage.service';

describe('TagManageController', () => {
  let controller: TagManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagManageController],
      providers: [TagManageService],
    }).compile();

    controller = module.get<TagManageController>(TagManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
