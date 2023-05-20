import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: Array<User>;

  constructor() {
    this.users = [];
  }

  create(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.filter((x) => x.id == id);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((item, arr) => {
      if (item.id === id) {
        updateUserDto.id = id;
        return (item = updateUserDto);
      }
      return item;
    });
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.users = this.users.filter((item) => item.id != id);
    return `This action removes a #${id} user`;
  }
}
