import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserWithToken } from './dto/user-with-token-object';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserWithToken)
  async registerUser(@Args('data') registerUserInput: RegisterUserInput) {
    return await this.authService.register(registerUserInput);
  }

  @Mutation(() => UserWithToken)
  loginUser(@Args('data') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
