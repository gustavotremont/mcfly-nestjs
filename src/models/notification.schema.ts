import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Message } from "./message.schema";

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
    @Prop({type: [Types.ObjectId], ref: Message.name})
    messages: Message[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);