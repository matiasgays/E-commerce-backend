import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  id: Number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
}
