import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
) {}

// InputType 和 ArgsType 的区别：前者必须声明一个名称，比如 input；后者参数必须为空
@InputType()
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @Field(() => Number)
  id: number;

  @Field(() => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
