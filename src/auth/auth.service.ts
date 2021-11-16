import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredencialDto } from './dto/auth-credencial.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ){}

    async signUp(authCredencialDto: AuthCredencialDto): Promise<void>{
        return this.usersRepository.createUser(authCredencialDto);
    }
}
