import {
  Injectable,
  UploadedFile,
  StreamableFile,
  Inject,
} from '@nestjs/common';
import { CreateBlogsManageDto } from './dto/create-blogs-manage.dto';
import { UpdateBlogsManageDto } from './dto/update-blogs-manage.dto';
import { createReadStream } from 'fs';
@Injectable()
export class BlogsManageService {
  constructor(@Inject('fileDir') private readonly fileDir: string) {}

  // getImage(res, params): StreamableFile {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.setHeader(
  //     'Content-Disposition',
  //     `attachment;filename = ${encodeURIComponent(params.url)}`,
  //   );
  //   const url = this.fileDir + params.url;
  //   const file = createReadStream(url);
  //   const steamFile = new StreamableFile(file);
  //   return steamFile;
  // }

  getImage(res, params) {
    console.log('this.fileDir', this.fileDir);

    const url = this.fileDir + params.url;
    console.log('url', url);
    res.download(url);
    return {
      code: 200,
      msg: '成功',
      url,
    };
  }
}
