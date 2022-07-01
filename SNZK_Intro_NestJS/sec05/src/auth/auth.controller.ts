import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() createUserDto): Promise<User> {
    return this.authService.signup(createUserDto);
  }

}
