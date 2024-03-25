import { Module } from '@nestjs/common';
import { St_GuardianController } from './st_guardian.controller';
import { St_GuardianService } from './st_guardian.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { St_GuardianEntity } from './st_guardian.entity';
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { AuthService } from './auth/auth.service';
import { StudentEntity } from './student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([St_GuardianEntity, StudentEntity]),
    JwtModule.register({
      global: true,
      secret: "3NP_Backend_Guardian",
      signOptions: { expiresIn: '30m' },
    }),
],
    controllers: [St_GuardianController],
    providers: [St_GuardianService, AuthService],
    exports: [St_GuardianService],
  })
  
  export class St_GuardianModule {}