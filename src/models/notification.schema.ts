import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document, Types } from 'mongoose'
import { Message } from "./message.schema";

export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop({type: [Types.ObjectId], ref: Message.name, default: []})
    messages: Message[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);