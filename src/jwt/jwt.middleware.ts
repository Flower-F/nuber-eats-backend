import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      const token = req.headers['authorization'].split(' ')[1];
      try {
        const decodedToken = this.jwtService.verify(token.toString());
        if (
          typeof decodedToken === 'object' &&
          decodedToken.hasOwnProperty('id')
        ) {
          const user = await this.userService.findById(decodedToken['id']);
          req['user'] = user;
        }
      } catch (error) {
        // console.log(error);
      }
    }
    next();
  }
}
