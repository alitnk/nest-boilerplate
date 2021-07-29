import { InputType, PartialType } from '@nestjs/graphql';
import { RegisterUserInput } from './register-user.input';

@InputType()
export class CreateUserInput extends PartialType(RegisterUserInput) {}
