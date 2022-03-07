import { Controller, Get, HttpStatus, NotFoundException, Param, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private usersService: UsersService
    ) {}

    
    @Get('/:email')
    public async getUserByEmail(
        @Res() res,
        @Param('email') email: string
    ) {
        const user = await this.usersService.findNotificationsByEmail(email)
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }

        const notifications = user.notifications.messages.map(element => { return {message: element.text, from: element.from, send: element.sendOn} })
        return res.status(HttpStatus.OK).json(notifications);
    }
}
