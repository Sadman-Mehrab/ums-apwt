import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { St_GuardianService } from '../st_guardian.service';
import { St_GuardianDTO, loginDTO } from 'src/st_guardian/st_guardian.dto';
import * as bcrypt from 'bcrypt';
import { St_GuardianEntity } from '../st_guardian.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly st_guardianService: St_GuardianService, 
    private jwtService: JwtService
  ) {}

  async signUp(myobj: St_GuardianDTO):Promise<St_GuardianDTO>{
    return await this.st_guardianService.addGuardian(myobj);
    //return await this.st_guardianService.addGuardian(myobj as St_GuardianEntity);
  }

  async login(logindata:loginDTO): Promise<{access_token:string}>{
    const user = await this.st_guardianService.findOne(logindata);
    if (!user)
    throw new UnauthorizedException("User not found");

  const isMatch = await bcrypt.compare(logindata.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = logindata;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
 
  }

  /*
  async getUserProfile(id:number):Promise<St_GuardianEntity>{
    const userProfile = await this.st_guardianService.findOne({id});
    return this.st_guardianService.getUserById(id);
  }
  */

}

