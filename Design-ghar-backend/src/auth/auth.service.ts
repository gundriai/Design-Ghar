import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      // Exclude password from returned user
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // Use user.id for sub, not user._id (TypeORM uses id)
    const payload = { sub: user.id, name: user.name, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async registerUser(registerDto: CreateUserDto) {
    // Use the injected UserService to create the user
    return this.userService.create(registerDto);
  }
}
