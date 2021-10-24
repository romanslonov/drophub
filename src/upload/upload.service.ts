import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadService {
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('BUCKET_ACCESS_KEY'),
      secretAccessKey: this.configService.get('BUCKET_SECRET_KEY'),
      endpoint: this.configService.get('BUCKET_ENDPOINT'),
      region: this.configService.get('BUCKET_REGION'),
    });
  }

  upload(file: Express.Multer.File) {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Body: file.buffer,
      Key: `${Date.now()}-${file.originalname}`,
      ACL: 'public-read',
      CacheControl: 'max-age=604800',
      ContentType: file.mimetype,
    };

    return this.s3.upload(params).promise();
  }
}
