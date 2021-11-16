import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredencialDto } from './dto/auth-credencial.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() authCredencialDto: AuthCredencialDto): Promise<void> {
        return this.authService.signUp(authCredencialDto);
    }

    @Post('/signin')
    signIn(@Body() authCredencialDto: AuthCredencialDto): Promise<{ accessToken: string}> {
        return this.authService.signIn(authCredencialDto);
    }
}
