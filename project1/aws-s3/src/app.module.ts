import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from "@nestjs/config";
import { AwsService } from "./aws.service";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [AwsService],
})
export class AppModule {}
