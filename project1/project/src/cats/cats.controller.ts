import { Body, Controller, Get, Post, UploadedFiles, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from "../common/interceptors/success.interceptor";
import { HttpExceptionFilter } from "../common/exceptions/http-exception.filter";
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from "../auth/auth.service";
import { LoginRequestDto } from "../auth/dto/login.request.dto";
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from "../common/decorators/user.decorator";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Multer } from "multer";
import { multerOptions } from "../common/utils/multer.options";
import { Cat } from "./cats.schema";

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService: CatsService, private readonly authService: AuthService) {}

    @ApiOperation({ summary: '고양이 목록' })
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentCat(@CurrentUser() cat) {
        return cat.readOnlyData;
    }

    @ApiResponse({
        status: 500,
        description: 'Server Error...',
    })
    @ApiResponse({
        status: 201,
        description: 'Success!',
        type: ReadOnlyCatDto,
    })
    @ApiOperation({ summary: '회원가입' })
    @Post()
    async signUp(@Body() catRequestDto: CatRequestDto): Promise<{id: string, email: string, name: string, imgUrl: string}> {
        return await this.catsService.signUp(catRequestDto);
    }

    @ApiOperation({ summary: '로그인' })
    @Post('login')
    logIn(@Body() loginRequestDto: LoginRequestDto) {
        return this.authService.jwtLogIn(loginRequestDto);
    }

    @ApiOperation({ summary: '고양이 이미지 업로드' })
    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
    uploadCatImg(@UploadedFiles() files: Express.Multer.File[], @CurrentUser() cat: Cat) {
        console.log(files);
        // return { image: `http://localhost:8000/media/cats/${files[0].filename}`};
        return this.catsService.uploadImg(cat, files);
    }

    @ApiOperation({ summary: '모든 고양이 목록' })
    @Get('all')
    getAllCat() {
        return this.catsService.getAllCat();
    }
}
