import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UsersService } from 'src/users/users.service';
import { CreateMessageDto } from './dto/message.create.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(
        private messageService: MessagesService,
        private usersService: UsersService,
        private notificationService: NotificationsService
    ) {}

    @Post()
    public async addCustomer(
        @Res() res,
        @Body() createMessageDto: CreateMessageDto,
    ) {
        try {
            const userToSend = await this.usersService.findByEmail(createMessageDto.to) 
            if(!userToSend.available) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Error: The user is not active to send messages',
                    status: 400,
                });
            } else {
                const newMessage = await this.messageService.create(createMessageDto);
                
                await this.notificationService.addNewNotification(userToSend.notifications.toString(), newMessage._id);
                await this.usersService.addNewMessage(newMessage.from, newMessage._id)

                return res.status(HttpStatus.OK).json({
                    message: 'Message has been sended successfully',
                    newMessage,
                });
            }
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Message not send!',
                status: 400,
            });
        }
    }

    @Get('/:email')
    public async getMessagesByUser(
        @Res() res,
        @Param('email') email: string
    ) {
        const user = await this.usersService.findMessagesByEmail(email)
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        const messages = user.messages.map(element => { return {message: element.text, to: element.to, send: element.sendOn} })
        return res.status(HttpStatus.OK).json(messages);
    }
}
