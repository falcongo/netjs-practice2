import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "../comments/comments.schema";

const options: SchemaOptions = {
    timestamps: true,
};

@Schema(options)
export class Cat extends Document {
    @ApiProperty({
        example: 'abc@gmail.com',
        description: 'email',
        required: true
    })
    @Prop({
        required: true,
        unique: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'user1',
        description: 'name',
        required: true
    })
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '1234',
        description: 'password',
        required: true
    })
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Prop({
        default:
            'https://github.com/amamov/NestJS-solid-restapi-boilerplate/raw/main/docs/images/1.jpeg'
    })
    @IsString()
    imgUrl: string;

    readonly readOnlyData: {
        id: string;
        email: string;
        name: string;
        imgUrl: string;
    };

    readonly comments: Comments[];
}

// export const CatSchema = SchemaFactory.createForClass(Cat);
const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
    return {
        id: this.id,
        email: this.email,
        name: this.name,
        imgUrl: `s3 url/${this.imgUrl}`,
        comments: this.comments
    };
});

_CatSchema.virtual('comments', {
    ref: 'comments',
    localField: '_id',
    foreignField: 'info'
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;