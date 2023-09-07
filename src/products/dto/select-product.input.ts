import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SelectProductInput {
  @Field(() => Int)
  id: number;
}
