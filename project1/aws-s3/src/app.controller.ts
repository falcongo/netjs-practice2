import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { AwsService } from "./aws.service";

@Controller()
export class AppController {
  constructor(private readonly awsService: AwsService) {}

  @Get()
  getHello(): string {
    return 'hello, aws s3';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.awsService.uploadFileToS3('cats', file);
  }
}
