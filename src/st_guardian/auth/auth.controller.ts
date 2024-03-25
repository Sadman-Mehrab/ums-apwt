import { Body, Controller, Post,Get, Request,
  UseGuards, UploadedFile, UsePipes, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { St_GuardianDTO, loginDTO } from 'src/st_guardian/st_guardian.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}

  @UseGuards()
  @Post('login')

  login(@Body() logindata: loginDTO) {
    return this.authService.login(logindata);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))

  @UsePipes(new ValidationPipe)
  async addUser(@Body() myobj: St_GuardianDTO, @UploadedFile() myfile: Express.Multer.File): Promise<St_GuardianDTO> {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(myobj.password, salt); 
    myobj.password= hashedpassword;
    myobj.filename = myfile.filename;
      return this.authService.signUp(myobj);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Request() req) {
      // Invalidate the token by setting a short expiration time (e.g., 1 second)
      const token = this.jwtService.sign({}, { expiresIn: '1s' });

      return { message: 'Logout successful', token };
  }
 
}