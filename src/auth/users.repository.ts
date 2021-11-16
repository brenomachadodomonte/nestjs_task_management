import { EntityRepository, Repository } from "typeorm";
import { AuthCredencialDto } from "./dto/auth-credencial.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(authCredencialDto: AuthCredencialDto): Promise<void> {
        const { username, password } = authCredencialDto;

        const user = this.create({ username, password});
        await this.save(user);
    }
}