import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop()
    text: string;

    @Prop({ required: true })
    sendOn: Date;

    @Prop()
    from: string;

    @Prop()
    to: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);