import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { hash } from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

// 权限管理，商家、买家、外卖员
enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
