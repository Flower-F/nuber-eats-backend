import { Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}

  sign(userId: number) {
    return sign({ id: userId }, this.options.privateKey);
  }
}
