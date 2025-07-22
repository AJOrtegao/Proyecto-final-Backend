// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module'; // Importa el módulo de usuarios

@Module({
  imports: [
    UsersModule, // Importa el módulo de usuarios para usar el UserService
    PassportModule, // Necesario para estrategias basadas en Passport (JWT)
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret', // Usa variable de entorno o clave por defecto
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' }, // Tiempo de expiración configurable
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Exporta AuthService para usarlo en otros módulos
})
export class AuthModule {}
