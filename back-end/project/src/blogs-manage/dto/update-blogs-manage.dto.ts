import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogsManageDto } from './create-blogs-manage.dto';

export class UpdateBlogsManageDto extends PartialType(CreateBlogsManageDto) {}
