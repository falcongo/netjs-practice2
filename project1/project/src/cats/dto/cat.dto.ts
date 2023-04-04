import { ApiProperty, PickType } from "@nestjs/swagger";
import { Cat } from "../cats.schema";

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
    @ApiProperty({
        example: '642b3fe757dcabed3148f867',
        description: 'id',
        required: true
    })
    id: string;

}