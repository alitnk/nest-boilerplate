import { RegisterUserInput } from './dto/register-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { Query, Mutation, Args, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserWithToken } from './dto/user-with-token-object';
import { CurrentUser, JwtAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserWithToken)
  registerUser(@Args('data') registerUserInput: RegisterUserInput) {
    return this.authService.register(registerUserInput);
  }

  @Mutation(() => UserWithToken)
  loginUser(@Args('data') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
