import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop()
    _id: Types.ObjectId;

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