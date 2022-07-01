import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }
}
