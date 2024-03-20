import { Module } from "@nestjs/common";
import { StudentModule } from "../student.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { StudentAuthService } from "./studentAuth.service";
import { StudentAuthController } from "./studentAuth.controller";

@Module({
    imports:[
        StudentModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30m'}
        })
    ],
    providers: [StudentAuthService],
    controllers: [StudentAuthController],
    exports: [StudentAuthService]
})
export class StudentAuthModule{}