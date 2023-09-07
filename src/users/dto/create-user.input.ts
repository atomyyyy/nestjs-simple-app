import { InputType, Field } from '@nestjs/graphql';
import { SelectProductInput } from '../../products/dto/select-product.input';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;

  @Field(() => [SelectProductInput], { defaultValue: [] })
  order: SelectProductInput[];
}