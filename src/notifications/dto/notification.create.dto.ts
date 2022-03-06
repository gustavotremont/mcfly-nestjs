import { IsArray } from "class-validator";

export class NotificationDto {
    @IsArray()
    readonly messages: [];
}