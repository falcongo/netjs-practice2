import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Cat } from "./cats.schema";
import { CatRequestDto } from "./dto/cats.request.dto";
import { Comments } from "../comments/comments.schema";

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>,
                @InjectModel(Comments.name) private readonly commentModel: Model<Comments>
    ) {}

    async findByIdAndUpdateImg(id: string, fileName: string) {
        const cat = await this.catModel.findById(id);
        cat.imgUrl = fileName;
        const newCat = await cat.save();
        console.log(newCat);
        return newCat.readOnlyData;
    }

    async findCatByEmail(email: string): Promise<Cat | null> {
        const cat = await this.catModel.findOne({ email });
        return cat;
    }

    async findCatByIdWithoutPassword(catId: string | Types.ObjectId): Promise<Cat | null> {
        const cat = await this.catModel.findById(catId).select('-password');
        return cat;
    }

    async existsByEmail(email: string): Promise<{_id: any}> {
        try {
            const result = await this.catModel.exists({ email });
            return result;
        } catch (error: unknown) {
            throw new HttpException('db error', 400);
        }
    }

    async create(cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }

    async findAll() {
        const result = await this.catModel
            .find()
            .populate({ path: 'comments', model: this.commentModel });

        return result;
    }
}