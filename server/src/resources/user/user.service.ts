import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'> & { message: string }> {
    const createdUser = await this.userModel
      .create(createUserDto)
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
    return { ...createdUser, message: 'Usuário criado com sucesso' };
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.userModel.find().exec();
  }

  async findOne(
    user: Partial<Pick<User, 'username' | 'email'> & { _id: string }>,
    fields?: string[],
  ): Promise<User> {
    const findOneUser = this.userModel.findOne(user);
    if (fields) findOneUser.select(fields);
    return await findOneUser.exec();
  }

  async update(
    _id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'> & { message: string }> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id },
      updateUserDto,
    );
    return { ...updatedUser, message: 'Usuário alterado com sucesso' };
  }

  async remove(
    _id: string,
  ): Promise<Omit<User, 'password'> & { message: string }> {
    const deletedUser = await this.userModel.findByIdAndRemove({ _id }).exec();
    return { ...deletedUser, message: 'Usuário removido com sucesso' };
  }
}
