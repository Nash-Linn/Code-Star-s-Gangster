import { PartialType } from '@nestjs/mapped-types';
import { CreateTagManageDto } from './create-tag-manage.dto';

export class UpdateTagManageDto extends PartialType(CreateTagManageDto) {}
