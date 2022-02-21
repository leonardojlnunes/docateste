import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/shared/http-exception.filter';
import { User } from './schema/user.schema';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  async findOne(@Param('id') id: string): Promise<Exclude<User, 'password'>> {
    return this.userService.findOne({ _id: id });
  }

  @Delete(':id')
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return this.userService.remove(id);
  }

  @Patch(':id')
  @UseFilters(new HttpExceptionFilter())
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.update(id, updateUserDto);
  }
}
