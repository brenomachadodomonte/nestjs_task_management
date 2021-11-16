import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredencialDto } from './dto/auth-credencial.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredencialDto: AuthCredencialDto): Promise<void>{
        return this.usersRepository.createUser(authCredencialDto);
    }

    async signIn(authCredencialDto: AuthCredencialDto): Promise<{ accessToken: string}>{
        const { username, password } = authCredencialDto;
        const user = await this.usersRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credencials');
        } 
        
    }
}
