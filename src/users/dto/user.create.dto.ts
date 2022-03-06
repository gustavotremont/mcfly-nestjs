import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly fullname: string;

    @IsNumber()
    @IsNotEmpty()
    readonly age: number;

    @IsString()
    @IsNotEmpty()
    readonly nickname: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly available: boolean;
}