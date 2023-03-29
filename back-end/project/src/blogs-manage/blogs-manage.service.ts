import {
  Injectable,
  UploadedFile,
  StreamableFile,
  Inject,
} from '@nestjs/common';
import { CreateBlogsManageDto } from './dto/create-blogs-manage.dto';
import { UpdateBlogsManageDto } from './dto/update-blogs-manage.dto';

@Injectable()
export class BlogsManageService {
  constructor(@Inject('fileDir') private readonly fileDir: string) {}

  getImage(res, params) {
    const url = this.fileDir + params.url;
    console.log('url--------------', url);
    res.download(url);
    return {
      code: 200,
      msg: '成功',
      url,
    };
  }
}
