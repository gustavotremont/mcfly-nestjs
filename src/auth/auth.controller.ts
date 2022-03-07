import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    test(@Res() res: Response) {
        res.status(200).json({msg: 'You Are Auth!'})
    }

    @Post('/login')
    public async login(
        @Res() res: Response,
        @Body() loginDto: LoginDto,
    ) {
        try{
            const existingUser = await this.usersService.findByEmail(loginDto.email)
    
            if(existingUser) {
                const passwordsMatch = await bcrypt.compare(loginDto.password, existingUser.password)
    
                if(passwordsMatch) {
                    const payload = { email: existingUser.email }
                    const token = this.jwtService.sign(payload)

                    res.cookie( 'access_token', token, {
                        secure: false,
                        httpOnly: true,
                        expires: new Date(Date.now() + 18000000)
                    })
                    .status(HttpStatus.OK)
                    .json({ status: 'success', msg: 'Login Success'})
    
                } else {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        message: 'Error: The email or password are incorrect',
                        status: 400,
                    });
    
                }
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Error: The email or password are incorrect',
                    status: 400,
                });
    
            }

        }
        catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: err,
                status: 400,
            });
        }
    }

    @Post('/logout')
    @UseGuards(AuthGuard('jwt'))
    public async logout(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if (req.cookies['access_token']) {
            res
            .clearCookie('access_token')
            .status(200)
            .json({ status: 'success', msg: 'logout success' })
        } else {
            res.status(401).json({ status: 'error', msg: 'something go wrong' })
        }
    }


}
