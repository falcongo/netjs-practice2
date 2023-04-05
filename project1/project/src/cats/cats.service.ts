import { ConflictException, Injectable } from '@nestjs/common';
import { CatRequestDto } from "./dto/cats.request.dto";
import * as bcrypt from 'bcrypt';
import { CatsRepository } from "./cats.repository";
import { Cat } from "./cats.schema";

@Injectable()
export class CatsService {
    constructor(private readonly catsRepository: CatsRepository) {}

    async signUp(catRequestDto: CatRequestDto): Promise<{id: string, email: string, name: string, imgUrl: string}> {
        const { email, name, password } = catRequestDto;
        const isCatExist = await this.catsRepository.existsByEmail(email);

        if (isCatExist) {
            throw new ConflictException('This cat already exists.');
        }

        const saltOrRounds:number = 10;
        const hashedPassword: string = await bcrypt.hash(password, saltOrRounds);

        const cat: Cat = await this.catsRepository.create({
            email,
            name,
            password: hashedPassword,
        });

        return cat.readOnlyData;
    }

    async uploadImg(cat: Cat, file: any): Promise<{id: string, email: string, name: string, imgUrl: string}> {
        const fileName = file.key;

        console.log(fileName);
        const newCat = await this.catsRepository.findByIdAndUpdateImg(
            cat.id,
            fileName
        );
        console.log(newCat);
        return newCat;
    }

    async getAllCat() {
        const cats = await this.catsRepository.findAll();
        const readOnlyCats = cats.map((cat) => cat.readOnlyData);
        return readOnlyCats;
    }
}
