import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validación de usuario en login
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  
  async login(user: any) {
    const payload = {
      sub: user.id || user._id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  
  async register(createUserDto: CreateUserDto) {
    
    const existingUsers = await this.usersService.findAll();

    
    const isAdmin = existingUsers.length === 0 || createUserDto.email === 'admin@farmathony.com';

    
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
      role: isAdmin ? 'admin' : 'user', 
    });

    return newUser;
  }
}
