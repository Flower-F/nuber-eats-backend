import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

// 权限管理，商家、买家、外卖员
type UserRole = 'client' | 'owner' | 'delivery';

@Entity()
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
