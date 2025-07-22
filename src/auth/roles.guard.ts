import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './jwt-auth.guard'; // Asegúrate de que tienes un guard de JWT
import { ROLES_KEY } from './roles.decorator'; // Decorador de roles

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Aquí estamos accediendo al usuario que fue validado con el JWT
    return requiredRoles.includes(user.role); // Comprobamos si el rol del usuario está en los roles permitidos
  }
}
