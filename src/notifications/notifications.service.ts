import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Notification } from 'src/models/notification.schema';

@Injectable()
export class NotificationsService {

    constructor( @InjectModel(Notification.name) private readonly notificationModel: Model<Notification> ) {}

    public async create(): Promise<string> {
        const newNotification = await new this.notificationModel().save()
        return newNotification._id
    }

    public async addNewNotification( id: string, messageId: string ): Promise<void> {
        await this.notificationModel.findByIdAndUpdate(id, { $push: {messages: messageId} } )
    }
}
