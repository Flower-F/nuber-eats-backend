import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

@InputType({ isAbstract: true }) // InputType 是 ObjectType 的基类
@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  @Length(5, 10)
  name: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  isVegan: boolean;

  @Field(() => String)
  @Column()
  @IsString()
  address: string;

  // @Field(() => String)
  // @Column()
  // @IsString()
  // ownersName: string;

  // @Field(() => String)
  // @Column()
  // @IsString()
  // categoryName: string;
}
