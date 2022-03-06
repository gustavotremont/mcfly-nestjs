import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document, Types } from 'mongoose'
import { Message } from "./message.schema";
import { Notification } from "./notification.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    fullname: string;

    @Prop()
    age: string;

    @Prop()
    nickname: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    @Exclude()
    password: string;

    @Prop()
    available: boolean;

    @Prop({type: [Types.ObjectId], ref: Message.name})
    messages: Message[];

    @Prop({type: Types.ObjectId, ref: Notification.name})
    notifications: Notification;
}

export const UserSchema = SchemaFactory.createForClass(User);