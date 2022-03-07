import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document, Types } from 'mongoose'

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop()
    text: string;

    @Prop({ default: Date })
    sendOn: Date;

    @Prop()
    from: string;

    @Prop()
    to: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);