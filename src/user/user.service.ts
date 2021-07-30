import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    return await this.usersRepository.save(createUserInput);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(...args) {
    return this.usersRepository.findOne(...args);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return this.usersRepository.update({ id }, updateUserInput);
  }

  async remove(users: User[]) {
    return this.usersRepository.softRemove(users);
  }
}
