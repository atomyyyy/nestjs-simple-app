import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ description: 'Price corrects to 2 decimal places' })
  price: number;
}
