import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models/user.schema';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';

@Injectable()
export class UsersService {

    constructor( @InjectModel(User.name) private readonly userModel: Model<User> ) {}

    public async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    public async findAllAvailableUsers(): Promise<User[]> {
        return await this.userModel.find({ 'available': true }).exec();
    }

    public async create( createUserDto: CreateUserDto ): Promise<User> {
        const newUser = new this.userModel(createUserDto)
        return await newUser.save()
    }

    public async update( email: string, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userModel.findOneAndUpdate({email}, updateUserDto).exec()

        if(existingUser) {
            return existingUser
        } else {
            throw new NotFoundException(`user not found with this email: ${email}`);
        }
    }

    public async updateAvailability( email: string ): Promise<User> {
        const existingUser = await this.userModel.findOne({email}).exec()

        if(existingUser) {
            existingUser.available = existingUser.available ? false : true
            return await existingUser.save()
        } else {
            throw new NotFoundException(`user not found with this email: ${email}`);
        }
    }

    public async addNewMessage( email: string, messageId: string ): Promise<void> {
        const existingUser = await this.userModel.findByIdAndUpdate(email, { $push: {messages: messageId} } )

        if(!existingUser) {
            throw new NotFoundException(`user not found with this email: ${email}`);
        }
    }
}
