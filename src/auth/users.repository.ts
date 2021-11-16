import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredencialDto } from "./dto/auth-credencial.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(authCredencialDto: AuthCredencialDto): Promise<void> {
        const { username, password } = authCredencialDto;

        //Generate hashed password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt); 

        const user = this.create({ username, password: hashedPassword });
        try {
            await this.save(user);
        } catch(error){
            if(error.code === '23505'){ //duplicate usernames
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }
}