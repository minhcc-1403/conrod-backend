import { Category } from 'categories/entities/category.entity';
import { ArrayNotEmpty, IsCurrency, IsString } from 'class-validator';
import { IsEntity } from 'common/decorators/validators/is-entity.decorator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsCurrency()
  readonly price: number;

  @ArrayNotEmpty()
  @IsEntity()
  readonly categories: Category[];
}
