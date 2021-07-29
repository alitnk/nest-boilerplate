import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
