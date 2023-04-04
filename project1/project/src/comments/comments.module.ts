import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Comments, CommentsSchema } from "./comments.schema";
import { CatsModule } from "../cats/cats.module";

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: Comments.name, schema: CommentsSchema }
      ]),
      CatsModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
