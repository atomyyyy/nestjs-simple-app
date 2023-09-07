import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['order']
    })
    return users;
  }

  async findOne(id: User['id']): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['order']
    })
  }

  async update(user: UpdateUserInput): Promise<User> {
    await this.userRepository.save(user);
    return this.findOne(user.id);
  }

  async create(userInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(userInput);

    return this.userRepository.save(newUser);
  }

  async remove(id: User['id']): Promise<User> {
    const user = this.findOne(id);
    await this.userRepository.delete(id);

    return user;
  }
}
