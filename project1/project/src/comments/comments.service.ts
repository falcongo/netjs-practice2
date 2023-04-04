import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsCreateDto } from "./dto/comments.create.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Comments } from "./comments.schema";
import { Model } from "mongoose";
import { CatsRepository } from "../cats/cats.repository";

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
        private readonly catsRepository: CatsRepository
    ) {}

    async getAllComments() {
        try {
            const comments = await this.commentsModel.find();
            return comments;
        } catch (error: unknown) {
            throw new BadRequestException((error as Error).message);
        }
    }

    async createComment(id: string, commentsCreateDto: CommentsCreateDto) {
        try {
            const targetCat = await this.catsRepository.findCatByIdWithoutPassword(id);
            const { contents, author } = commentsCreateDto;
            const validatedAuthor = await this.catsRepository.findCatByIdWithoutPassword(author);
            const newComment = new this.commentsModel({
                author: validatedAuthor._id,
                contents,
                info: targetCat._id
            });
            return await newComment.save();
        } catch (error: unknown) {
            throw new BadRequestException((error as Error).message);
        }
    }

    async plusLike(id: string) {
        try {
            const comment = await this.commentsModel.findById(id);
            comment.likeCount += 1;
            return await comment.save();
        } catch (error: unknown) {
            
        }
    }
}
