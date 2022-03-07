import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document, Types } from 'mongoose'
import { Message } from "./message.schema";
import { Notification } from "./notification.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    fullname: string;

    @Prop()
    age: number;

    @Prop()
    nickname: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    @Exclude()
    password: string;

    @Prop({default: true})
    available: boolean;

    @Prop({type: [Types.ObjectId], ref: Message.name, default: []})
    messages: Message[];

    @Prop({type: Types.ObjectId, ref: Notification.name})
    notifications: Notification;
}

export const UserSchema = SchemaFactory.createForClass(User);