import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredencialDto } from './dto/auth-credencial.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ){}

    async signUp(authCredencialDto: AuthCredencialDto): Promise<void>{
        return this.usersRepository.createUser(authCredencialDto);
    }

    async signIn(authCredencialDto: AuthCredencialDto): Promise<string>{
        const { username, password } = authCredencialDto;
        const user = await this.usersRepository.findOne({ username });

        if(user && (await bcrypt.compare(password, user.password))){
            return 'success';
        } else {
            throw new UnauthorizedException('Please check your login credencials');
        } 
        
    }
}
