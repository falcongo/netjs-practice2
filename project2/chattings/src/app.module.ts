import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatsModule } from './chats/chats.module';
import * as mongoose from "mongoose";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),
      MongooseModule.forRoot(process.env.MONGODB_URI),
      ChatsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer): any {
    mongoose.set('debug', this.isDev);
  }
}
