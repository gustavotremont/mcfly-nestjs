import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'src/models/message.schema';
import { CreateMessageDto } from './dto/message.create.dto';

@Injectable()
export class MessagesService {

    constructor( @InjectModel(Message.name) private readonly messageModel: Model<Message> ) {}

    public async create( createMessageDto: CreateMessageDto ): Promise<Message> {
        const newMessage = new this.messageModel(createMessageDto)
        return await newMessage.save()
    }
}
