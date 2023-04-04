import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from "./comments.service";
import { ApiOperation } from "@nestjs/swagger";
import { CommentsCreateDto } from './dto/comments.create.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiOperation({ summary: '모든 고양이 프로필 댓글 목록' })
    @Get()
    async getAllComments() {
        return this.commentsService.getAllComments();
    }

    @ApiOperation({ summary: '특정 고양이 프로필에 댓글 추가' })
    @Post(':id')
    async createComment(@Param('id') id: string, @Body() commentsCreateDto: CommentsCreateDto) {
        return this.commentsService.createComment(id, commentsCreateDto);
    }

    @ApiOperation({ summary: '좋아요 수 증가' })
    @Patch(':id')
    async plusLike(@Param('id') id: string) {
        return this.commentsService.plusLike(id);
    }
}
