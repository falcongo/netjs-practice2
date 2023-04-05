import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Cat, CatSchema } from "./cats.schema";
import { CatsRepository } from "./cats.repository";
import { AuthModule } from "../auth/auth.module";
import { Comments, CommentsSchema } from "../comments/comments.schema";
import { MulterModule } from '@nestjs/platform-express';
import { MulterExtendedModule } from "nestjs-multer-extended";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            { name: Comments.name, schema: CommentsSchema },
            { name: Cat.name, schema: CatSchema }
        ]),
        MulterModule.register({
            dest: './upload'
        }),
        MulterExtendedModule.register({
            awsConfig: {
                accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
                secretAccessKey: 'YOUR_AWS_ACCESS_KEY_ID',
                region: 'AWS_REGION_NEAR_TO_YOU',
                // ... any options you want to pass to the AWS instance
            },
            bucket: 'YOUR_S3_BUCKET_NAME',
            basePath: 'ROOT_DIR_OF_ASSETS',
            fileSize: 1 * 1024 * 1024,
        }),
        forwardRef(() => AuthModule),
    ],
    controllers: [CatsController],
    providers: [CatsService, CatsRepository],
    exports: [CatsService, CatsRepository]
})
export class CatsModule {}
