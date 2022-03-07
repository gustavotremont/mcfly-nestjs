import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { Request } from 'express';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor( 
        private usersService: UsersService 
    ) {
        super({
            jwtFromRequest: AuthStrategy.extractJWT,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    private static extractJWT(req: Request) {
        if ( req && req.cookies) {
            return req.cookies['access_token'];
        }
        return null;
    }

    async validate(payload: any) : Promise<any> {
        const user = await this.usersService.findByEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}