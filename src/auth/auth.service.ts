import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare as bcCompare, hash as bcHash } from 'bcrypt';
import { RegisterUserInput } from 'src/auth/dto/register-user.input';
import { JwtService } from '@nestjs/jwt';
import { UserWithToken } from './dto/user-with-token-object';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerUserInput: RegisterUserInput) {
    const hashedPassword = await bcHash(registerUserInput.password, 10);

    const user = await this.userService.create({
      ...registerUserInput,
      password: hashedPassword,
    });

    return {
      ...user,
      token: this.jwtService.sign({ id: user.id, username: user.username }),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({ where: { username } });
    // this.jwtService.verify(password, user.password);

    if (!user) {
      throw Error('No user found.');
    }

    if (!bcCompare(password, user.password)) {
      throw Error('Wrong password.');
    }

    return {
      ...user,
    };
  }

  async login({ username, password }): Promise<UserWithToken> {
    const user = await this.userService.findOne({ where: { username } });

    if (!user) throw Error('User not found.');

    if (!bcCompare(password, user.password)) {
      throw Error('Wrong password.');
    }

    return {
      ...user,
      token: this.jwtService.sign({ id: user.id, username: user.username }),
    };
  }
}
