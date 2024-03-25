import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from "./entities/admin.entity";
import { AdminDTO,AdminLoginDTO,AdminUpdateDTO } from "./dto/create-admin.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";


import { AdminProfile } from "./entities/adminprofile.entity";
import { CreateStudentDto } from 'src/student/student.dto';
import { Student } from 'src/student/student.entity';
import { Faculty } from "src/faculty/faculty.entity";
import { Guardian } from "src/guardian/guardian.entity";
@Injectable()
export class AdminService {
 
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        
        @InjectRepository(AdminProfile)
        private adminprofileRepo:Repository<AdminProfile>,
        @InjectRepository(Student)
        private studentRepo: Repository<Student>,
        @InjectRepository(Faculty)
        private facultyRepo: Repository<Faculty>,
        @InjectRepository(Guardian)
        private guardianRepo: Repository<Guardian>,
        private mailerService: MailerService
      
        ) {}

        async getIndex(): Promise<AdminEntity[]> {
            return this.adminRepo.find();
        }
        
    
    

async getAdminByEmail(email: string): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ email: email });
}
async getAdminByID(id) {
    const data=await this.adminRepo.findOneBy({ id });
    console.log(data);
    if(data!==null) {
        return data;
    }
   else 
   {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
   }

}

async getAdminbyIDAndName(id, name): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ id: id, fullname: name });
}



    async addAdmin(mydto) {
     const salt = await bcrypt.genSalt();
     const hassedpassed = await bcrypt.hash(mydto.password, salt);
     mydto.password= hassedpassed;
      return this.adminRepo.save(mydto);
     }

     async createAdmin(user: AdminEntity, userProfile: AdminProfile): Promise<AdminEntity> {
        userProfile.AdminEntity = user;
        await this.adminprofileRepo.save(userProfile);
        return this.adminprofileRepo.save(user);
        }

     async updateAdmin(email: string, data: AdminUpdateDTO): Promise<AdminEntity> {
        await this.adminRepo.update({ email: email }, data);
        return this.adminRepo.findOneBy({ id: data.id });
    }

     async updateAdminById(id: number, data: AdminUpdateDTO): Promise<AdminEntity> {
        await this.adminRepo.update(id, data);
        return this.adminRepo.findOneBy({ id });  
    }

    
    deleteAdminByID(id):any {
    
        return this.adminRepo.delete(id);
    }

    
    async deleteAdmin(id: number): Promise<AdminEntity[]> {
        await this.adminRepo.delete(id);
        return this.adminRepo.find();
    }

    
    
    
    async signup(data: AdminDTO): Promise<AdminEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.adminRepo.save(data);
    }

    async getimagebyadminid(adminid: number): Promise<string> {
        const mydata: AdminDTO = await this.adminRepo.findOneBy({ id: adminid });
        console.log(mydata);
        return mydata.filenames;
    }


async signin(mydto:AdminLoginDTO):Promise<boolean>{
   
    if (mydto.email != null && mydto.password != null) {
        const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
        const isMatch = await bcrypt.compare(mydto.password, mydata.password);
        if (isMatch) {
            return true;
        }
        else {
            return false;
        }
    } else {
        return false;
    }
   
}

sendMail() : void {
      this.mailerService.sendMail({
        to: 'claude.mta@gmail.com', 
        from: 'nafismschy@gmail.com', 
        subject: 'Testing mailer',
        text: 'welcome', 
        html: '<b>welcome user</b>', 
      })
    }

async addstudent(user: Student): Promise<Student> {
    return this.studentRepo.save(user);
    }
    async getAllStudents(): Promise<Student[]> {
        return this.studentRepo.find();
      }
      async updateStudent(id: number, updatedStudent: Student): Promise<Student> {
        await this.studentRepo.update(id, updatedStudent);
        return this.studentRepo.findOneBy({id:id}); }
 async deleteStudent(id: number): Promise<string> {
    await this.studentRepo.delete(id);
    return `Student with ID ${id} deleted successfully`; 
}
async addfaculty(user: Faculty): Promise<Faculty> {
    return this.facultyRepo.save(user);
    }
    async getAllFaculty(): Promise<Faculty[]> {
        return this.facultyRepo.find();
      }
      async updateFaculty(id: number, updatedFaculty: Faculty): Promise<Faculty> {
        await this.facultyRepo.update(id, updatedFaculty);
        return this.facultyRepo.findOneBy({id:id}); }
 async deleteFaculty(id: number): Promise<string> {
    await this.facultyRepo.delete(id);
    return `Faculty with ID ${id} deleted successfully`; 
}
async addguardian(user: Guardian): Promise<Guardian> {
    return this.guardianRepo.save(user);
    }
    async getAllGuardian(): Promise<Guardian[]> {
        return this.guardianRepo.find();
      }
      async updateGuardian(id: number, updatedGuardian: Guardian): Promise<Guardian> {
        await this.guardianRepo.update(id, updatedGuardian);
        return this.guardianRepo.findOneBy({id:id}); }
 async deleteGuardian(id: number): Promise<string> {
    await this.guardianRepo.delete(id);
    return `Guardian with ID ${id} deleted successfully`; 
}

}
