import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(data.toString(), salt);
  }

  public async comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string | Buffer
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword.toString(), hashedPassword.toString());
  }
}
