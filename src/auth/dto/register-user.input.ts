import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  password: string;
}
