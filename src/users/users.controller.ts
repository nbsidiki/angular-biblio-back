import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get()
  async Find(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async Create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async Update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deletePage(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
