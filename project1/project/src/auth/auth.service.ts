import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from "../cats/cats.repository";
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly catsRepository: CatsRepository, private readonly jwtService: JwtService) {}

    async jwtLogIn(loginRequestDto: LoginRequestDto) {
        const { email, password } = loginRequestDto;

        const cat = await this.catsRepository.findCatByEmail(email);
        if (!cat) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        const isPasswordValidated: boolean = await bcrypt.compare(password, cat.password);
        if (!isPasswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        const payload = { email, sub: cat.id };

        return { token: this.jwtService.sign(payload) };
    }
}
