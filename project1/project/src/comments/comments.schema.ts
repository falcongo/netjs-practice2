import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const options: SchemaOptions = {
    timestamps: true,
    collection: 'comments'
};

@Schema(options)
export class Comments extends Document {
    @ApiProperty({
        description: '고양이 id',
        required: true
    })
    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'cats'
    })
    @IsNotEmpty()
    author: Types.ObjectId;

    @ApiProperty({
        description: '댓글 컨텐츠',
        required: true
    })
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    contents: string;

    @ApiProperty({
        description: '좋아요 수',
    })
    @Prop({
        default: 0
    })
    @IsPositive()
    likeCount: number;

    @ApiProperty({
        description: '작성 대상 (게시물, 정보글)',
        required: true
    })
    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'cats'
    })
    @IsNotEmpty()
    info: Types.ObjectId;
}
export const CommentsSchema = SchemaFactory.createForClass(Comments);
