import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private notificationService: NotificationsService
    ) {}

    @Get('/:email')
    @UseGuards(AuthGuard('jwt'))
    public async getUserByEmail(
        @Res() res,
        @Param('email') email: string
    ) {
        const user = await this.usersService.findByEmail(email)
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async getAllActiveUsers(
        @Res() res
    ) {
        const users = await this.usersService.findAllAvailableUsers()
        return res.status(HttpStatus.OK).json(users); 
    }

    @Post()
    public async createUser(
        @Res() res,
        @Body() createUserDto: CreateUserDto,
    ) {
        try {
            const existingUser = await this.usersService.findByEmail(createUserDto.email)  
            
            if(existingUser) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Error: This email is already register',
                    status: 400,
                });

            } else {
                const notificationId = await this.notificationService.create()
                createUserDto.notifications = notificationId
                const user = await this.usersService.create(createUserDto);
                return res.status(HttpStatus.OK).json({
                    message: 'User has been created successfully',
                    user,
                });
            }
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: User not created!',
                status: 400,
            });
        }
    }
    
    @Put('/:email')
    @UseGuards(AuthGuard('jwt'))
    public async updateUser(
        @Res() res,
        @Param('email') email: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        try {
            const user = await this.usersService.update(
                email,
                updateUserDto,
            );
            if (!user) {
                throw new NotFoundException('User does not exist!');
            } else {
                return res.status(HttpStatus.OK).json({
                    message: 'User has been successfully updated',
                    user,
                });
            }
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: User not updated!',
                status: 400,
            });
        }
    }

    @Patch('/:email')
    @UseGuards(AuthGuard('jwt'))
    public async updateAviability(
        @Res() res,
        @Param('email') email: string,
    ) {
        try {
            const user = await this.usersService.updateAvailability(email)

            return res.status(HttpStatus.OK).json({
                message: user.available 
                            ? 'Now you are active' 
                            : 'Now you are not active'
            });

        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: User not updated!',
                status: 400,
            });
        }
    }
}
