import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class UserWithToken extends User {
  @Field()
  token: string;
}
