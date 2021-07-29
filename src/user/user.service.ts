import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash as bcHash, compare as bcCompare } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcHash(createUserInput.password, 10);
    try {
      return this.usersRepository.save({
        email: createUserInput.email,
        name: createUserInput.name,
        password: hashedPassword,
      });
    } catch (exception) {
      console.log(exception);
      throw new Error('The email is already taken.'); // Does not work atm
    }
  }

  async register(registerUserInput: RegisterUserInput) {
    return this.create(registerUserInput);
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersRepository.findOne({
      where: { email: loginUserInput.email },
    });

    const passwordCheck = await bcCompare(
      loginUserInput.password,
      user.password,
    );

    if (!user || passwordCheck) {
      return null;
    }

    return user;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return this.usersRepository.update({ id }, updateUserInput);
  }

  async remove(id: number) {
    return this.usersRepository.softRemove({ id });
  }
}
